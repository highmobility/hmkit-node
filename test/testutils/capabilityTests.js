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
import customTypes from '../../src/Configuration/customTypes.json';

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
      const failureRespClass = ResponseClass['FailureMessage'];

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
          await sleep(1500);
          const parsedResponse = await sendGetterQueryCommand(getterCommand);
          if (parsedResponse instanceof failureRespClass) {
            handleSkipTest(parsedResponse, `${capabilityName}.${getterCommand.name}`);
          } else {
            expect(respClass).toBeDefined();
            expect(parsedResponse).toBeInstanceOf(respClass);
          }
        });

        // Test correct getter response state
        it(`Should map ${capabilityName}.${getterCommand.name}() response correctly`, async () => {
          await sleep(1500);
          const parsedResponse = await sendGetterQueryCommand(getterCommand);
          if (parsedResponse instanceof failureRespClass) {
            handleSkipTest(parsedResponse, `${capabilityName}.${getterCommand.name}`);
          } else {
            expect(responseValidator).toMatchObject(parsedResponse);
          }
        });
      }

      setterCommands.forEach(setterCommand => {
        const setterArguments = findSetterArguments(
          identifier,
          setterCommand.nameSnake
        );

        it(`Should handle setter ${capabilityName}.${setterCommand.name}() command`, async () => {
          await sleep(1500);
          const parsedResponse = await sendSetterQueryCommand(
            setterCommand,
            setterArguments
          );

          if (parsedResponse instanceof failureRespClass) {
            handleSkipTest(parsedResponse, `${capabilityName}.${setterCommand.name}`);
          } else {
            expect(respClass).toBeDefined();
            expect(parsedResponse).toBeInstanceOf(respClass);
          }
        });

        if (getterCommand) {
          it(`Setter ${capabilityName}.${setterCommand.name}() should keep default values`, async () => {
            await sleep(1500);
            const parsedSetterResponse = await sendSetterQueryCommand(
              setterCommand,
              setterArguments
            );
            await sleep(1500);
            const parsedGetterResponse = await sendGetterQueryCommand(
              getterCommand
            );

            if (parsedSetterResponse instanceof failureRespClass) {
              handleSkipTest(parsedSetterResponse, `${capabilityName}.${setterCommand.name}`);
            } else if (parsedGetterResponse instanceof failureRespClass) {
              handleSkipTest(parsedGetterResponse, `${capabilityName}.${getterCommand.name}`);
            } else {
              expect(parsedSetterResponse).toBeInstanceOf(respClass);
              expect(parsedGetterResponse).toBeInstanceOf(respClass);

              const responseValidatorWithValues = replaceConstants(
                replaceTimestampsWithValidators(parsedGetterResponse),
                setterCommand.nameSnake,
                capabilityConfiguration
              );

              expect(parsedSetterResponse).toEqual(responseValidatorWithValues);
            }
          });
        }
      });

      it(`Availability getter for all properties should have correct response`, async () => {
        await sleep(1500);
        const response = await sendCommand(hmkit, capability.getAvailability(), accessToken);
        const parsedResponse = response.parse();

        const rateLimitUnitTypes = Object.values(customTypes).reduce((result, customType) => {
          if (result.length > 0) {
            return result;
          }

          if (customType.name_cased === 'availability') {
            const rateLimitProperty = customType.items.find(item => item.name_cased === 'rateLimit');
            return rateLimitProperty.unit.unit_types;
          }

          return result;
        }, []);

        const validateProp = (propValue) => {
          if (Array.isArray(propValue)) {
            propValue.forEach(propInArray => {
              validateProp(propInArray);
            });

            return;
          } else if (!propValue instanceof Object) {
            return;
          }

          if (propValue.data && propValue.data.value) {
            if (propValue.data.value === 'unsupported_capability' || propValue.data.value === 'invalid_command') {
              return;
            }

            Object.values(propValue.data.value).forEach(capabilityData => {
              Object.values(capabilityData).forEach(propertyValue => {
                validateProp(propertyValue);
              });
            });

            return;
          }

          expect(propValue).toHaveProperty('availability');
          expect(propValue.availability).toEqual({
            updateRate: { value: expect.any(String) },
            rateLimit: expect.unitWithValue(rateLimitUnitTypes),
            appliesPer: { value: expect.any(String) },
          });
        };

        Object.values(parsedResponse).forEach(propValue => {
          validateProp(propValue);
        });
      });

      it(`Availability getter for specific properties should have correct response`, async () => {
        await sleep(1500);

        const propertiesToRequest = capabilityConfiguration.properties.slice(0, 2).map(property => property.name_cased);
        const response = await sendCommand(hmkit, capability.getAvailability(propertiesToRequest), accessToken);
        const parsedResponse = response.parse();

        // Disabled for now because there's no way to check which properties are disabled in emulator_type
        propertiesToRequest.forEach(requestedPropertyName => {
          if (parsedResponse && parsedResponse.failureReason && parsedResponse.failureReason.data && parsedResponse.failureReason.data.value === 'unsupported_capability') {
            console.warn(`Skipping test for ${capabilityName}.${requestedPropertyName} because the capability is unsupported`);
            return;
          }
          expect(parsedResponse).toHaveProperty(requestedPropertyName);
        });

        capabilityConfiguration.properties.slice(2).forEach(notRequestedProperty => {
          expect(parsedResponse).not.toHaveProperty(notRequestedProperty.name);
        });
      });
    }
  );
}

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      resolve();
    }, ms);
  })
}

function handleSkipTest(parsedResponse, functionName) {
  console.log(`Skipping test for ${functionName}(), it might be disabled for this vehicle`, parsedResponse);
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
      [property.name_cased]: property.examples.map(example => {
        const exampleInCamelCase = Object.entries(example.values || example.value).reduce((acc, cur) => {
          const [propertyName, propertyValue] = cur;
          return { ...acc, [getProperlyCasedKey(propertyName, property)]: propertyValue };
        }, {});

        return exampleInCamelCase;
      })
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

function buildWrapper(data, capabilityConfiguration, hasTimestamp = true) {
  const result = {
    data,
  };

  if (hasTimestamp) {
    result.timestamp = buildTypeValidator(PropertyType.TIMESTAMP);
  }

  return result;
}

function buildPropertyValidator(
  property,
  shouldWrap = false,
  capabilityConfiguration
) {
  const hasTimestamp = !['supported_capability', 'webhook'].includes(property.customType);

  if (property.items) {
    const [identifierChild, ...otherChildren] = property.items;
    if (property.multiple && identifierChild.enum_values) {
      return {
        [property.name_cased]: identifierChild.enum_values.map(identifier => {
          return buildWrapper(
            {
              [identifierChild.name_cased]: { value: identifier.name },
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
            capabilityConfiguration,
            hasTimestamp,
          );
        }),
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
      ? buildWrapper(mappedProps, capabilityConfiguration, hasTimestamp)
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

  const typeValidator = buildTypeValidator(property.type, property.unit && property.unit.unit_types);

  if (property.multiple) {
    return {
      [property.name_cased]: expect.arrayContaining([
        expect.objectContaining({ data: typeValidator }),
      ]),
    };
  }

  return {
    [property.name_cased]: shouldWrap
      ? buildWrapper(typeValidator, capabilityConfiguration, hasTimestamp)
      : typeValidator,
  };
}

function buildTypeValidator(type, unitTypes) {
  if (type && type.startsWith('unit.')) {
    return expect.unitWithValue(unitTypes);
  }

  switch (type) {
    case PropertyType.STRING: {
      return expect.objectContaining({ value: expect.any(String) });
    }

    case PropertyType.UINTEGER: {
      return expect.objectContaining({ value: expect.any(Number) });
    }

    case PropertyType.DOUBLE: {
      return expect.objectContaining({ value: expect.any(Number) });
    }

    case PropertyType.FLOAT: {
      return expect.objectContaining({ value: expect.any(Number) });
    }

    case PropertyType.ENUM: {
      return expect.objectContaining({ value: expect.any(String) });
    }

    case PropertyType.TIMESTAMP: {
      return expect.timestampValue();
    }

    case PropertyType.INTEGER: {
      return expect.objectContaining({ value: expect.any(Number) });
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
    if (state.data !== undefined && state.timestamp !== undefined) {
      return {
        data: { ...state.data },
        timestamp: expect.any(Date),
      };
    }

    if (Array.isArray(state)) {
      return state.map(item => {
        return replaceTimestampsWithValidators(item);
      });
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

    const newData = parsePropertyData(constant.value, prop);
    const existingValue = state[prop.name_cased];

    return {
      ...constantsToChange,
      [prop.name_cased]: {
        data: newData,
        ...existingValue
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

function getProperlyCasedKey(key, property) {
  const propertyMetaData = (property.items || []).find(
    x => x.name === key
  );

  return propertyMetaData ? propertyMetaData.name_cased : snakeCaseMap[key] || key;
}

// The example uses snake_case for property keys, but the SDK uses camelCase, so this converts the examples to camelCase
function normalizeExampleValues(obj, property) {
  const output = { ...obj };

  Object.keys(output).forEach(key => {
    const value = output[key];
    delete output[key];

    const properlyCasedKey = getProperlyCasedKey(key, property);

    if (Array.isArray(value)) {
      output[properlyCasedKey] = value;
    } else if (typeof value === 'object') {
      const objectValues = Object.values(value);
      if (objectValues.length === 1 && typeof objectValues[0] !== 'object') {
        // Is "unit: value" object
        output[properlyCasedKey] = parseValue(value);
      } else {
        output[properlyCasedKey] = normalizeExampleValues(value, property);
      }
    } else if (!Array.isArray(value)) {
      output[properlyCasedKey] = parseValue(value);
    } else {
      output[properlyCasedKey] = parseValue(value);
    }
  });

  return output;
}

function parseValue(value) {
  // SDSK returns dates as Date instances
  if (isValidDate(value)) {
    return { value: new Date(value) };
  }

  if (typeof value === 'object') {
    const [ unit, realValue ] = Object.entries(value)[0];
    return {
      value: realValue,
      unit,
    };
  }

  return { value };
}

// https://stackoverflow.com/a/3143231
function isValidDate(x) {
  const DATE_REGEX = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;
  return DATE_REGEX.test(x);
};

/**
 * Takes the value from the docs example and parses some data types to match
 * with what the SDK returns (such as ISO strings being converted to strings)
 */
function getExampleValue(example, property) {
  if (property.type === PropertyType.BYTES) {
    const exampleValue = example.values || example.value;

    switch (property.customType) {
      case 'capability_state': {
       return Object.entries(exampleValue).reduce((acc, cur) => {
          const [capabilityKey, capabilityValue] = cur;

          return {
            ...acc,
            [capabilityKey]: Object.entries(capabilityValue).reduce(
              (properties, propertyEntry) => {
                const [propertyKey, propertyValue] = propertyEntry;

                if (Array.isArray(propertyValue)) {
                  return {
                    ...properties,
                    [propertyKey] : propertyValue.map(value => {
                      return {
                        data: Object.entries(value).reduce((childProperties, childPropertyEntry) => {
                          const [childPropertyKey, childPropertyValue] = childPropertyEntry;
                          return {
                            ...childProperties,
                            [childPropertyKey]: {
                              value: childPropertyValue
                            }
                          }
                        }, {})
                      }
                    }),
                  }
                }

                const normalizedValues = normalizeExampleValues({ [propertyKey]: propertyValue }, property);
                const normalizedValuesWithData = Object.entries(normalizedValues).reduce((acc, cur) => {
                  const [propertyName, propertyValue] = cur;
                  return {
                    ...acc,
                    [propertyName]: {
                      data: propertyValue,
                    }
                  }
                }, {});
                return { ...properties, ...normalizedValuesWithData };
              },
              {}
            ),
          };
        }, {});
      }

      default: {
        return exampleValue;
      }
    }
  }

  if (example.value != null) {
    return parseValue(example.value);
  }

  if (example.values != null) {
    let values = example.values;
    // SDK returns sub-capabilities for capability_state as Response instances, which have the shape `{ value: ... }`

    return { ...normalizeExampleValues(values, property) };
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
