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
import {
  CommandType,
  AUTO_API_LEVEL,
  SET_STATE_TYPE,
  PROPERTY_DATA_ID,
} from '../../src/Utils/CommandUtils';
import { parsePropertyData } from '../../src/Utils/ResponseUtils';
import { hexToUint8Array } from '../../src/Utils/EncodingUtils';
import describeIf from './describeIf';

const hmkit = getHmkit();

export function describeTest(capabilityName, capability) {
  describeOfflineTests(capabilityName, capability);
  describeEmulatorTests(capabilityName, capability);
}

/**
 * These tests run against the documentation, so they don't require an emulator to be set up
 */
function describeOfflineTests(capabilityName, capability) {
  describe(`${capabilityName} offline tests`, () => {
    const { identifier } = capability;
    const capabilityConfiguration = getCapabilityConfiguration(identifier);

    /**
     * Test parsing getters from hex to JSON
     */
    capabilityConfiguration.properties.forEach(property => {
      (property.examples || []).forEach((example, i) => {
        it(`Should parse the response for ${capabilityName}.${property.name} according to the example #${i}`, () => {
          const parsedResponse = parsePropertyData(
            hexToUint8Array(example.data_component),
            property
          );

          expect(parsedResponse).toEqual(getExampleValue(example, property));
        });
      });
    });

    /**
     * Test parsing JSON from examples into an Uint8Array
     */
    Object.values(capability)
      .filter(({ type }) => type === CommandType.Setter)
      .forEach(setterCommand => {
        const setterArguments = findSetterArguments(
          identifier,
          setterCommand.nameSnake
        );

        it(`Should convert the ${capabilityName}.${setterCommand.name} command into the a Uint8Array according to the example`, () => {
          const actualCommandData = setterCommand(setterArguments).command;

          const expectedCommandData = [
            AUTO_API_LEVEL,
            capabilityConfiguration.identifier.msb,
            capabilityConfiguration.identifier.lsb,
            SET_STATE_TYPE,
            ...getSetterExampleData(identifier, setterCommand.nameSnake),
          ];

          expect(actualCommandData).toEqual(expectedCommandData);
        });
      });
  });
}

/**
 * These tests run against an emulator, so you need an online emulator to be configured.
 * Therefore, these tests are disabled by default.
 */
function describeEmulatorTests(capabilityName, capability) {
  describeIf(
    process.env.TEST_ONLINE,
    `${capabilityName} emulator tests`,
    () => {
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
        it(`Should handle getter ${capabilityName}.${getterCommand.name}() command`, async () => {
          const parsedResponse = await sendGetterQueryCommand(getterCommand);
          expect(respClass).toBeDefined();
          expect(parsedResponse).toBeInstanceOf(respClass);
        });

        // Test correct getter response state
        it(`Should map ${capabilityName}.${getterCommand.name}() response correctly`, async () => {
          const parsedResponse = await sendGetterQueryCommand(getterCommand);
          expect(parsedResponse).toEqual(responseValidator);
        });

        // Test getter response properties
        (capabilityConfiguration.state || []).forEach(propertyId => {
          const property = capabilityConfiguration.properties.find(
            prop => prop.id === propertyId
          );

          const { name_cased: nameCased } = property;

          it(`Should include ${capabilityName}.${property.name_cased} property in getter`, async () => {
            const parsedResponse = await sendGetterQueryCommand(getterCommand);
            expect(parsedResponse).toHaveProperty(nameCased);
          });

          it(`Should map ${capabilityName}.${property.name_cased} property structure correctly`, async () => {
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

        it(`Should handle setter ${capabilityName}.${setterCommand.name}() command`, async () => {
          const parsedResponse = await sendSetterQueryCommand(
            setterCommand,
            setterArguments
          );

          expect(respClass).toBeDefined();
          expect(parsedResponse).toBeInstanceOf(respClass);
        });

        if (getterCommand) {
          it(`Setter ${capabilityName}.${setterCommand.name}() should keep default values`, async () => {
            const parsedSetterResponse = await sendSetterQueryCommand(
              setterCommand,
              setterArguments
            );
            const parsedGetterResponse = await sendGetterQueryCommand(
              getterCommand
            );

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
    }
  );
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
        parsePropertyData(hexToUint8Array(example.data_component), property)
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
  if (type && type.startsWith('unit.')) {
    return expect.any(Number);
  }

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

const snakeCaseMap = Object.values(capabilitiesConfiguration).reduce(
  (map, cap) => {
    return {
      ...map,
      ...cap.properties.reduce((propertyMap, property) => {
        return {
          ...propertyMap,
          [property.name]: property.name_cased,
        };
      }, {}),
    };
  },
  {}
);
/**
 * Takes the value from the docs example and parses some data types to match
 * with what the SDK returns (such as ISO strings being converted to strings)
 */
function getExampleValue(example, property) {
  // https://stackoverflow.com/a/3143231
  const isValidDate = x => {
    const DATE_REGEX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
    return DATE_REGEX.test(x);
  };

  const parseValue = value => {
    // SDSK returns dates as Date instances
    if (isValidDate(value)) {
      return new Date(value);
    }
    return value;
  };

  if (example.value != null) {
    return parseValue(example.value);
  }

  if (example.values != null) {
    /**
     * The example uses snake_case for property keys, but the SDK uses camelCase, so this converts the examples to camelCase
     */
    const normalizeExampleValues = obj => {
      const output = { ...obj };

      Object.keys(output).forEach(key => {
        const value = output[key];
        delete output[key];

        const propertyMetaData = (property.items || []).find(
          x => x.name === key
        );
        const properlyCasedKey = propertyMetaData
          ? propertyMetaData.name_cased
          : snakeCaseMap[key] || key;

        if (Array.isArray(value)) {
          output[properlyCasedKey] = value;
        } else if (typeof value === 'object') {
          output[properlyCasedKey] = normalizeExampleValues(value);
        } else if (!Array.isArray(value)) {
          output[properlyCasedKey] = parseValue(value);
        } else {
          output[properlyCasedKey] = parseValue(value);
        }
      });

      return output;
    };

    let values = example.values;
    // SDK returns sub-capabilities for capability_state as Response instances, which have the shape `{ value: ... }`
    if (property.customType === 'capability_state') {
      values = Object.entries(values).reduce((acc, cur) => {
        const [capabilityKey, capabilityValue] = cur;

        return {
          ...acc,
          [capabilityKey]: Object.entries(capabilityValue).reduce(
            (properties, propertyEntry) => {
              const [propertyKey, propertyValue] = propertyEntry;
              const newProperty = Array.isArray(propertyValue)
                ? propertyValue.map(value => ({ value }))
                : { value: propertyValue };

              return { ...properties, [propertyKey]: newProperty };
            },
            {}
          ),
        };
      }, {});
    }

    return { ...normalizeExampleValues(values) };
  }

  return null;
}

/**
 * Returns an integer array containing the setter data from the example docs.
 */
function getSetterExampleData(identifier, name) {
  const capabilityConfiguration = getCapabilityConfiguration(identifier);

  if (!capabilityConfiguration)
    throw new Error('Missing capability configuration');
  const setter = capabilityConfiguration.setters.find(set => set.name === name);

  const { mandatory = [], optional = [], constants = [] } = setter;

  const intArray = [...mandatory, ...optional]
    .reduce((value, propertyID) => {
      const property = findPropertyByID(propertyID, capabilityConfiguration);

      return [...value, ...getPropertyData(property)];
    }, [])
    .concat(
      ...constants.map(constant => {
        const property = findPropertyByID(
          constant.property_id,
          capabilityConfiguration
        );
        const dataComponent = [
          PROPERTY_DATA_ID,
          ...hexToUint8Array(
            constant.value.length.toString(16).padStart(4, '0')
          ),
          ...constant.value,
        ];
        const propertySize = hexToUint8Array(
          dataComponent.length.toString(16).padStart(4, '0')
        );
        return [property.id, ...propertySize, ...dataComponent];
      })
    );

  return intArray;
}

/**
 * Returns an Uint8Array containing the data for the given property from the example docs.
 */
function getPropertyData(property) {
  const hexValues = (property.multiple
    ? property.examples
    : [property.examples[0]]
  ).map(x => x.data_component);

  return hexValues.reduce((acc, hex) => {
    const dataComponent = [
      PROPERTY_DATA_ID,
      ...hexToUint8Array(
        hexToUint8Array(hex).length.toString(16).padStart(4, '0')
      ),
      ...hexToUint8Array(hex),
    ];
    const propertySize = hexToUint8Array(
      dataComponent.length.toString(16).padStart(4, '0')
    );

    return [...acc, property.id, ...propertySize, ...dataComponent];
  }, []);
}
