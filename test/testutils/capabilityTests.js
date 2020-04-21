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
 *  capabilityTests.js
 *
 *  Created by Mikk Õun on 20/01/2020.
 */

import getHmkit, { accessToken, sendCommand } from './getHmkit';
import capabilitiesConfiguration from '../../src/Configuration/capabilities.json';
import ResponseClass from '../../src/Configuration/ResponseClass';
import EmptyResponse from '../../src/Responses/EmptyResponse';
import PropertyType from '../../src/Configuration/PropertyType';
import { CommandType } from '../../src/Utils/CommandUtils';
import { parsePropertyData } from '../../src/Utils/ResponseUtils';
import { hexToUint8Array } from '../../src/Utils/EncodingUtils';

const hmkit = getHmkit();

export function describeTest(capabilityName, capability) {
  describe(capabilityName, async () => {
    const { identifier } = capability;
    const capabilityConfiguration = getCapabilityConfiguration(identifier);

    const commands = Object.values(capability);
    const respClass = ResponseClass[capabilityName];

    const responseValidator = buildResponseValidator(capabilityConfiguration);

    const getterCommand = commands.find(
      ({ type }) => type === CommandType.Getter
    );

    const setterCommands = commands.filter(
      ({ type }) => type === CommandType.Setter
    );

    if (getterCommand) {
      // Test correct getter response
      it(`Should handle getter ${capabilityName}.${
        getterCommand.name
      }() command`, async () => {
        const parsedResponse = await sendGetterQueryCommand(getterCommand);
        expect(respClass).toBeDefined();
        expect(parsedResponse).toBeInstanceOf(respClass);
      });

      // Test correct getter response state
      it(`Should map ${capabilityName}.${
        getterCommand.name
      }() response correctly`, async () => {
        const parsedResponse = await sendGetterQueryCommand(getterCommand);
        expect(parsedResponse).toEqual(responseValidator);
      });

      // Test getter response properties
      (capabilityConfiguration.state || []).forEach(propertyId => {
        const property = capabilityConfiguration.properties.find(
          prop => prop.id === propertyId
        );

        const { name_cased: nameCased } = property;

        it(`Should include ${capabilityName}.${
          property.name_cased
        } property in getter`, async () => {
          const parsedResponse = await sendGetterQueryCommand(getterCommand);
          expect(parsedResponse).toHaveProperty(nameCased);
        });

        it(`Should map ${capabilityName}.${
          property.name_cased
        } property structure correctly`, async () => {
          const parsedResponse = await sendGetterQueryCommand(getterCommand);
          expect(parsedResponse).toMatchObject({
            [nameCased]: responseValidator[nameCased],
          });
        });
      });
    }

    setterCommands.forEach(setterCommand => {
      const setterArguments = findSetterArguments(
        identifier,
        setterCommand.nameSnake
      );

      it(`Should handle setter ${capabilityName}.${
        setterCommand.name
      }() command`, async () => {
        const parsedResponse = await sendSetterQueryCommand(setterCommand, setterArguments);

        expect(respClass).toBeDefined();
        expect(parsedResponse).toBeInstanceOf(respClass);
      });

      if (getterCommand) {
        it(`Setter ${capabilityName}.${
          setterCommand.name
        }() should keep default values`, async () => {
          const parsedSetterResponse = await sendSetterQueryCommand(setterCommand, setterArguments);
          const parsedGetterResponse = await sendGetterQueryCommand(getterCommand);

          expect(parsedSetterResponse).toBeInstanceOf(respClass);
          expect(parsedGetterResponse).toBeInstanceOf(respClass);

          const responseValidatorWithValues = replaceConstants(
            replaceTimestampsWithValidators(parsedGetterResponse),
            setterCommand.nameSnake,
            capabilityConfiguration
          );

          expect(parsedSetterResponse).toEqual(responseValidatorWithValues);
        });
      }
    });
  });
}

function getCapabilityConfiguration({ msb: msbToFind, lsb: lsbToFind }) {
  return Object.values(capabilitiesConfiguration).find(capabilityConf => {
    const { msb, lsb } = capabilityConf.identifier || {};
    return msb === msbToFind && lsb === lsbToFind;
  });
}

function findSetterArguments(identifier, name) {
  const capabilityConfiguration = getCapabilityConfiguration(identifier);

  if (!capabilityConfiguration)
    throw new Error('Missing capability configuration');
  const setter = capabilityConfiguration.setters.find(set => set.name === name);

  const { mandatory = [], optional = [] } = setter;

  return [...mandatory, ...optional].reduce(
    (args, propertyID) => ({
      ...args,
      ...generatePropertyValue(propertyID, capabilityConfiguration),
    }),
    {}
  );
}

function generatePropertyValue(propertyID, capabilityConfiguration) {
  const property = findPropertyByID(propertyID, capabilityConfiguration);

  if (property.multiple) {
    return {
      [property.name_cased]: property.examples.map(example =>
        parsePropertyData(hexToUint8Array(example.hex), property)
      ),
    };
  }

  return {
    [property.name_cased]:
      property.examples[0].value || property.examples[0].values,
  };
}

function findPropertyByID(propertyID, capabilityConfiguration) {
  return capabilityConfiguration.properties.find(
    prop => prop.id === propertyID
  );
}

function buildResponseValidator(capabilityConfiguration) {
  if (!capabilityConfiguration)
    throw new Error('Missing capability configuration');

  if (!capabilityConfiguration.state) {
    return new EmptyResponse();
  }

  return capabilityConfiguration.properties
    .filter(prop => capabilityConfiguration.state.includes(prop.id))
    .reduce(
      (responseValidator, property) => ({
        ...responseValidator,
        ...buildPropertyValidator(property, true, capabilityConfiguration),
      }),
      {}
    );
}

function buildWrapper(value, capabilityConfiguration) {
  if (['api_structure'].includes(capabilityConfiguration.category)) {
    return {
      value,
    };
  }

  return {
    value,
    timestamp: buildTypeValidator(PropertyType.TIMESTAMP),
  };
}

function buildPropertyValidator(
  property,
  shouldWrap = false,
  capabilityConfiguration
) {
  if (property.items) {
    const [identifierChild, ...otherChildren] = property.items;
    if (property.multiple && identifierChild.enum_values) {
      return {
        [property.name_cased]: identifierChild.enum_values.map(identifier =>
          buildWrapper(
            {
              [identifierChild.name_cased]: identifier.name,
              ...otherChildren.reduce(
                (mappedChildren, childToMap) => ({
                  ...mappedChildren,
                  ...buildPropertyValidator(
                    childToMap,
                    false,
                    capabilityConfiguration
                  ),
                }),
                {}
              ),
            },
            capabilityConfiguration
          )
        ),
      };
    }

    const mappedProps = property.items.reduce(
      (mappedItems, child) => ({
        ...mappedItems,
        ...buildPropertyValidator(child, false, capabilityConfiguration),
      }),
      {}
    );

    const wrappedProps = shouldWrap
      ? buildWrapper(mappedProps, capabilityConfiguration)
      : mappedProps;

    if (property.multiple) {
      return {
        [property.name_cased]: expect.arrayContaining([wrappedProps]),
      };
    }

    return {
      [property.name_cased]: wrappedProps,
    };
  }

  const typeValidator = buildTypeValidator(property.type);

  if (property.multiple) {
    return {
      [property.name_cased]: expect.arrayContaining([
        expect.objectContaining({ value: typeValidator }),
      ]),
    };
  }

  return {
    [property.name_cased]: shouldWrap
      ? buildWrapper(typeValidator, capabilityConfiguration)
      : typeValidator,
  };
}

function buildTypeValidator(type) {
  switch (type) {
    case PropertyType.STRING: {
      return expect.any(String);
    }

    case PropertyType.UINTEGER: {
      return expect.any(Number);
    }

    case PropertyType.DOUBLE: {
      return expect.any(Number);
    }

    case PropertyType.FLOAT: {
      return expect.any(Number);
    }

    case PropertyType.ENUM: {
      return expect.any(String);
    }

    case PropertyType.TIMESTAMP: {
      return expect.any(Date);
    }

    case PropertyType.INTEGER: {
      return expect.any(Number);
    }

    case PropertyType.BYTES: {
      return expect.any(Object);
    }

    default:
      console.log(`Missing type validator for type: ${type}`);
      throw new Error(`Missing type validator for type: ${type}`);
  }
}

function replaceTimestampsWithValidators(state) {
  if (state instanceof Object) {
    if (state.value !== undefined && state.timestamp !== undefined) {
      return {
        value: state.value,
        timestamp: expect.any(Date),
      };
    }

    if (Array.isArray(state)) {
      return state.map(item => replaceTimestampsWithValidators(item));
    }

    return Object.entries(state).reduce(
      (mappedState, [key, value]) => ({
        ...mappedState,
        [key]: replaceTimestampsWithValidators(value),
      }),
      {}
    );
  }

  return state;
}

function replaceConstants(state, setterName, capabilityConf) {
  const { setters = [], properties } = capabilityConf;
  const setter = setters.find(s => s.name === setterName);

  if (!setter || !setter.constants) return state;

  const newState = setter.constants.reduce((constantsToChange, constant) => {
    const prop = properties.find(
      property => property.id === constant.property_id
    );

    const newValue = parsePropertyData(constant.value, prop);
    const existingValue = state[prop.name_cased];

    return {
      ...constantsToChange,
      [prop.name_cased]: {
        ...existingValue,
        value: newValue,
      },
    };
  }, state);

  return newState;
}

async function sendGetterQueryCommand(getterCommand) {
  const getterQuery = getterCommand
    ? sendCommand(hmkit, getterCommand(), accessToken)
    : null;

  const response = await getterQuery;
  return response.parse();
}

async function sendSetterQueryCommand(setterCommand, setterArguments) {
  const setterQuery = sendCommand(
    hmkit,
    setterCommand(setterArguments),
    accessToken
  );

  const response = await setterQuery;
  return response.parse();
}
