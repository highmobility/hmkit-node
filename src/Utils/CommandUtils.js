/*
 *  The MIT License
 *
 *  Copyright (c) 2014- High-Mobility GmbH (https://high-mobility.com)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 *  CommandUtils.js
 *
 *  Created by Mikk Õun on 16/01/2020.
 */

import Command from '../Core/Command';
import PropertyType from '../Configuration/PropertyType';
import {
  decimalToHexArray,
  base10ToIeee754,
  base10ToIeee754Double,
  dateToBytes,
  stringToBytes,
} from './EncodingUtils';
import { isArray, capitalizeSnake, buildFunctionName, capitalize } from './Helpers';
import capabilitiesConfiguration from '../Configuration/capabilities.json';
import InvalidArgumentError from '../Errors/InvalidArgumentError';
import { validate, Joi } from './ValidationUtils';

const DISABLED_FOR_CATEGORIES = ['universal'];

export const PROPERTY_DATA_ID = 0x01;
export const GET_STATE_TYPE = 0x00;
export const SET_STATE_TYPE = 0x01;
export const GET_AVAILABILITY_TYPE = 0x02;
export const AUTO_API_LEVEL = 12;
export const CommandType = {
  Getter: 'GET',
  Setter: 'SET',
};

const WEB_CONNECTION_TYPE = 'web';
const commands = buildCommands();

function buildAvailabilityGetter(capabilityConf) {
  const { msb, lsb } = capabilityConf.identifier;

  return {
    getAvailability(propertyNames = []) {
      return new Command([
        AUTO_API_LEVEL,
        msb,
        lsb,
        GET_AVAILABILITY_TYPE,
        ...propertyNames.map(propertyName => {
          const property = capabilityConf.properties.find(
            x => x.name_cased === propertyName
          );

          if (!property) {
            throw new InvalidArgumentError(
              `Invalid property name ${propertyName} passed to getAvailability`
            );
          }

          return property.id;
        }),
      ]);
    },
  };
}

function buildCapabilityGetter(capabilityConf) {
  const { getters } = capabilityConf;

  if (getters !== null && getters !== undefined) {
    const stateFuncName = buildFunctionName(getters.name || 'get_state');

    const { msb, lsb } = capabilityConf.identifier;

    return {
      [stateFuncName]: applyCallbackMetadata(
        (propertyNames = []) => {
          validate({
            name: 'Property IDs',
            value: propertyNames,
            condition: Joi.array().items(
              Joi.string().valid(
                ...capabilityConf.properties.map(prop => prop.name_cased)
              )
            ),
          });

          return new Command([
            AUTO_API_LEVEL,
            msb,
            lsb,
            GET_STATE_TYPE,
            ...propertyNames.map(propertyName => {
              const property = capabilityConf.properties.find(
                x => x.name_cased === propertyName
              );

              if (!property) {
                throw new InvalidArgumentError(
                  `Invalid property name ${propertyName} passed to getAvailability`
                );
              }

              return property.id;
            }),
          ]);
        },
        stateFuncName,
        getters.name || 'get_state',
        CommandType.Getter
      ),
    };
  }

  return {};
}

function applyCallbackMetadata(func, name, nameSnake, type) {
  Object.defineProperty(func, 'name', { value: name });
  Object.defineProperty(func, 'nameSnake', { value: nameSnake });
  Object.defineProperty(func, 'type', { value: type });
  return func;
}

function buildCapabilitySetters(capabilityConf) {
  const { setters, properties, identifier } = capabilityConf;

  if (setters !== undefined && setters !== null) {
    return setters.reduce(
      (mappedSetters, setter) => ({
        ...mappedSetters,
        ...buildSetter(setter, properties, identifier),
      }),
      {}
    );
  }

  return {};
}

function buildSetter(setter, properties, identifier) {
  const setterName = buildFunctionName(setter.name);
  const setterFunction = buildSetterFunction(setter, properties, identifier);

  return {
    [setterName]: applyCallbackMetadata(
      setterFunction,
      setterName,
      setter.name,
      CommandType.Setter
    ),
  };
}

function buildSetterFunction(setter, properties, identifier) {
  const { msb, lsb } = identifier;
  const { mandatory = [], optional = [], constants = [] } = setter;

  const allowedPropIDs = mandatory
    .concat(optional)
    .reduce(
      (allAllowedPropIDs, id) =>
        !allAllowedPropIDs.includes(id)
          ? [...allAllowedPropIDs, id]
          : allAllowedPropIDs,
      []
    );

  const allowedProps = properties.filter(prop =>
    allowedPropIDs.includes(prop.id)
  );

  const mandatoryProps = mandatory.map(propertyId =>
    properties.find(x => x.id === propertyId)
  );

  return (request = {}) => {
    validate({
      name: 'Request',
      value: request,
      condition: Joi.object(),
    });

    mandatoryProps.forEach(mandatoryProp => {
      if (!request.hasOwnProperty(mandatoryProp.name_cased)) {
        throw new Error(
          `Missing mandatory property "${mandatoryProp.name_cased}"`
        );
      }
    });

    const requestBytes = Object.entries(request).reduce(
      (mappedBytes, [key, value]) => {
        const propertyToEncode = allowedProps.find(
          allowedProp => allowedProp.name_cased === key
        );

        if (!propertyToEncode) {
          throw new Error(`Invalid property "${key}" provided.`);
        }

        const valueToEncode = propertyToEncode.name === 'multi_commands' ? encodeMultiCommands(value) : value;
        const encodedPropertyData = encodeProperty(propertyToEncode, valueToEncode);

        return mappedBytes.concat(encodedPropertyData);
      },
      []
    );

    const constantsBytes = constants.reduce(
      (encodedConstants, constant) => [
        ...encodedConstants,
        ...buildProperty(constant.property_id, constant.value),
      ],
      []
    );

    return new Command([
      AUTO_API_LEVEL,
      msb,
      lsb,
      SET_STATE_TYPE,
      ...requestBytes,
      ...constantsBytes,
    ]);
  };
}

function encodeMultiCommands(value) {
  return Object.entries(value).reduce((encodedProperties, [capabilityName, capabilitySetters]) => {
    const encodedCapabilityProperties = Object.entries(capabilitySetters).reduce((result, [commandName, commandArguments]) => {
      const command = commands?.[capitalize(capabilityName)]?.[commandName];

      if (!command) {
        throw new Error(`Could not find command '${commandName}'. Correct usage:
          {
            multiCommand: {
              capabilityName: {
                commandName: commandArguments
              }
            }
          }
        `);
      }

      return [
        ...result,
        command(commandArguments),
      ];
    }, []);

    return [
      ...encodedProperties,
      ...encodedCapabilityProperties,
    ];
  }, []);
}

function sanitizeArgumentValue(property, value) {
  const { type } = property;

  switch (type) {
    case PropertyType.ENUM: {
      const matchingEnum = property.enum_values.find(
        ({ name }) => name === value
      );

      return matchingEnum.id;
    }

    default: {
      return value;
    }
  }
}

function encodeProperty(property, value) {
  if (property.multiple) {
    if (!Array.isArray(value)) {
      throw new InvalidArgumentError(
        `Invalid argument passed to command: ${property.name_cased} should be Array.`
      );
    }

    return value.reduce(
      (encodedValues, itemValue) => [
        ...encodedValues,
        ...buildProperty(property.id, encodePropertyData(property, itemValue)),
      ],
      []
    );
  }

  return buildProperty(property.id, encodePropertyData(property, value));
}

function validatePropertyValue(value, name, condition) {
  return validate({ value, name, condition });
}

function encodePropertyData(property, value) {
  const { type, customType, size } = property;

  switch (customType) {
    case 'capability_state': {
      return value.command;
    }
  }

  /**
   * The types that start with 'unit.' are all objects that contain a single property, which is a double.
   */
  if (type.startsWith('unit.')) {
    validatePropertyValue(
      value,
      property.name_cased,
      Joi.object().pattern(/^/, Joi.number().min(-1022).max(1023)).length(1)
    );

    const [dataUnitType, dataValue] = Object.entries(value)[0];

    return [
      property.unit.id,
      property.unit.unit_types.find(x => x.name === dataUnitType).id,
      ...encodePropertyValue(
        sanitizeArgumentValue(property, dataValue),
        base10ToIeee754Double
      ),
    ];
  }

  switch (type) {
    case PropertyType.STRING: {
      validatePropertyValue(value, property.name_cased, Joi.string());
      return encodePropertyValue(
        sanitizeArgumentValue(property, value),
        stringToBytes
      );
    }

    case PropertyType.UINTEGER: {
      validatePropertyValue(
        value,
        property.name_cased,
        Joi.number()
          .integer()
          .min(0)
          .max(Math.pow(2, size * 8))
      );
      return encodePropertyValue(
        sanitizeArgumentValue(property, value),
        decimalToHexArrayEncoder(size)
      );
    }

    case PropertyType.DOUBLE: {
      validatePropertyValue(
        value,
        property.name_cased,
        Joi.number().min(-1022).max(1023)
      );
      return encodePropertyValue(
        sanitizeArgumentValue(property, value),
        base10ToIeee754Double
      );
    }

    case PropertyType.FLOAT: {
      validatePropertyValue(
        value,
        property.name_cased,
        Joi.number().min(-126).max(127)
      );
      return encodePropertyValue(
        sanitizeArgumentValue(property, value),
        base10ToIeee754
      );
    }

    case PropertyType.ENUM: {
      validatePropertyValue(
        value,
        property.name_cased,
        Joi.string().valid(...property.enum_values.map(e => e.name))
      );
      return [sanitizeArgumentValue(property, value)];
    }

    case PropertyType.TIMESTAMP: {
      validatePropertyValue(value, property.name_cased, Joi.date().iso());
      return encodePropertyValue(
        sanitizeArgumentValue(property, value),
        dateToBytes
      );
    }

    case PropertyType.INTEGER: {
      validatePropertyValue(
        value,
        property.name_cased,
        Joi.number()
          .integer()
          .min(-(Math.pow(2, size * 8) / 2 - 1))
          .max(Math.pow(2, size * 8) / 2)
      );
      return encodePropertyValue(
        sanitizeArgumentValue(property, value),
        decimalToHexArrayEncoder(size)
      );
    }

    case PropertyType.CUSTOM: {
      return property.items.reduce((encodedItems, propertyItem) => {
        const itemValue = value[propertyItem.name_cased];

        if (itemValue === undefined) {
          return encodedItems;
        }

        // Strings in custom types always have their size in 2 bytes in front of the encoded string bytes.
        if (
          [PropertyType.STRING, PropertyType.BYTES].includes(propertyItem.type)
        ) {
          validatePropertyValue(
            value[propertyItem.name_cased],
            property.name_cased,
            Joi.string()
          );
          const encodedString = encodePropertyData(
            propertyItem,
            value[propertyItem.name_cased]
          );
          const encodedStringLength = decimalToHexArray(
            encodedString.length,
            2
          );

          return [...encodedItems, ...encodedStringLength, ...encodedString];
        }

        return [
          ...encodedItems,
          ...encodePropertyData(propertyItem, value[propertyItem.name_cased]),
        ];
      }, []);
    }

    default: {
      console.error(`Failed to encode ${type} property`, property, value);
      return [];
    }
  }
}

// ENCODING FUNCTIONS

function decimalToHexArrayEncoder(size) {
  return value => decimalToHexArray(value, size);
}

// UTIL FUNCTIONS

function buildProperty(identifier, encodedValue) {
  const dataComponent = [
    PROPERTY_DATA_ID,
    ...decimalToHexArray(encodedValue.length, 2),
    ...encodedValue,
  ];

  return [
    identifier,
    ...decimalToHexArray(dataComponent.length, 2),
    ...dataComponent,
  ];
}

function encodePropertyValue(value, encodingFunc) {
  if (!!encodingFunc) {
    const encodedValue = encodingFunc(value);
    return isArray(encodedValue) ? encodedValue : [encodedValue];
  }

  return isArray(value) ? value : [value];
}

export function buildCommands() {
  return Object.values(capabilitiesConfiguration)
    .filter(
      capabilityConf =>
        !(capabilityConf.disabled_in || []).includes(WEB_CONNECTION_TYPE) &&
        !DISABLED_FOR_CATEGORIES.includes(capabilityConf.category)
    )
    .reduce((allConf, capabilityConf) => {
      const commands = {
        ...buildCapabilityGetter(capabilityConf),
        ...buildCapabilitySetters(capabilityConf),
        ...buildAvailabilityGetter(capabilityConf),
      };

      Object.defineProperty(commands, 'identifier', {
        value: capabilityConf.identifier,
      });

      Object.defineProperty(commands, 'nameSnake', {
        value: capabilityConf.name,
      });

      return {
        ...allConf,
        [capitalizeSnake(capabilityConf.name)]: commands,
      };
    }, {});
}
