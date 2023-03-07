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
 *  generateDocumentation.js
 *
 *  Created by Matis Lepik on 2021-01-20.
 */

const fs = require('fs');
const YAML = require('yamljs');
const Capabilities = require('../src/Configuration/capabilities.json');
const { parsePropertyData } = require('../lib/Utils/ResponseUtils');
const { hexToUint8Array } = require('../lib/Utils/EncodingUtils');
const path = require('path');
const util = require('util');
const stripIndent = require('strip-indent');
const writeFile = util.promisify(fs.writeFile);

const DOCUMENTATION_DIRECTORY = path.resolve(__dirname, '../docs/yml');

/**
 * Creates the capabilities documentation and writes it to disc as YML files (one file for each capability).
 */
async function buildDocumentation() {
  const supportedCapabilities = Object.values(Capabilities).filter(
    capabilityConf => !['failure_message'].includes(capabilityConf.name)
  );

  await Promise.all(
    supportedCapabilities.map(capability => {
      const outputData = {
        title: capability.name_pretty,
        content: [
          buildStateGetter(capability),
          buildAvailabilityGetter(capability),
          ...buildSetters(capability),
        ].filter(x => x != null),
      };
      return writeFile(
        path.resolve(DOCUMENTATION_DIRECTORY, capability.name + '.yml'),
        YAML.stringify(outputData, 10)
      );
    })
  );

  await writeFile(
    path.resolve(DOCUMENTATION_DIRECTORY, 'capabilityManifest.yml'),
    YAML.stringify(
      supportedCapabilities.map(capability => ({
        name: capability.name,
        name_cased: capability.name_cased,
        name_pretty: capability.name_pretty,
        src: `/docs/yml/${capability.name}.yml`,
      })),
      10
    )
  );
}

/**
 * Creates the documentation object for the main capability getter
 */
function buildStateGetter(capability) {
  const capabilityName = snakeCaseToCapitalCase(capability.name);
  const { getters } = capability;

  if (!getters) return null;

  const functionName = snakeCaseToCamelCase(getters.name || 'get_state');
  const responseClassName = capitalize(capability.name_cased) + 'Response';

  const responseProperties = {};

  getStateProperties(capability)
    .sort((a, b) => a.name_cased.localeCompare(b.name_cased))
    .forEach(prop => {
      responseProperties[prop.name_cased] = {
        'data.value': getPropertyDescription(prop),
        timestamp: '(Date)',
      };
    });

  return {
    title: `${functionName}([, propertyNames])`,
    id: functionName,
    children: [
      {
        declaration: code(`hmkit.commands.${capabilityName}.${functionName}()`),
        parameters: {
          propertyNames:
            '(optional) Array of names of the properties you want returned.',
        },
        returns: responseClassName,
        example: code(`
          hmkit.telematics.sendCommand(
            hmkit.commands.${capabilityName}.${functionName}(),
            accessCertificate
          );
        `),
      },
      {
        id: responseClassName,
        title: responseClassName,
        parameters: responseProperties,
        example: code(
          JSON.stringify(getExampleResponse(capability), null, '  '),
          'json'
        ),
      },
    ],
  };
}

/**
 * Creates the documentation object for the capability's availability getter
 */
function buildAvailabilityGetter(capability) {
  const capabilityName = snakeCaseToCapitalCase(capability.name);
  const stateProperties = getStateProperties(capability);

  return {
    title: 'getAvailability([, propertyNames])',
    id: 'get-availability',
    children: [
      {
        declaration: code(`hmkit.commands.${capabilityName}.getAvailability()`),
        parameters: {
          propertyNames:
            '(optional) Array of names of the properties you want returned.',
        },
        example: code(`
          // Get availability for all properties
          hmkit.telematics.sendCommand(
            hmkit.commands.${capabilityName}.getAvailability(),
            accessCertificate
          );
          // Get availability for specific properties
          hmkit.telematics.sendCommand(
            hmkit.commands.${capabilityName}.getAvailability(['${snakeCaseToCamelCase(
          (stateProperties && stateProperties[0]?.name) || 'status'
        )}']),
            accessCertificate
          );
        `),
      },
      {
        id: 'availability-response',
        title: 'Response',
        parameters: {
          availability: {
            'updateRate.value': '(String) enum',
            'rateLimit.value': '(Number)',
            'rateLimit.unit': '(String)',
            'appliesPer.value': '(String)',
          },
        },
        discussion:
          'The response contains an availability object for each property, as shown in the example',
        example: code(
          JSON.stringify(
            {
              [snakeCaseToCamelCase(
                (stateProperties && stateProperties[0]?.name) || 'status'
              )]: {
                availability: {
                  updateRate: {
                    value: 'trip_high',
                  },
                  rateLimit: {
                    value: 64,
                    unit: 'hertz',
                  },
                  appliesPer: {
                    value: 'vehicle',
                  },
                },
              },
            },
            null,
            2
          ),
          'json'
        ),
      },
    ],
  };
}

/**
 * Creates an array of documentation objects for each of the capability's setters
 */
function buildSetters(capability) {
  const { setters } = capability;

  if (!setters) return [];

  return setters
    .map(setter => {
      const functionName = snakeCaseToCamelCase(setter.name);

      const properties = [
        ...(setter.mandatory || []),
        ...(setter.optional || []),
      ]
        .map(propId => capability.properties.find(prop => prop.id === propId))
        .sort((a, b) => a.name_cased.localeCompare(b.name_cased));

      const responseProperties = {};

      properties.forEach(prop => {
        responseProperties[prop.name_cased] = getPropertyDescription(prop);
      });

      return {
        id: functionName,
        title: `${functionName}(${
          properties.length > 0
            ? `{ ${properties.map(prop => prop.name_cased).join(', ')} }`
            : ''
        })`,
        parameters: responseProperties,
        // prettier-ignore
        example: code(`
          hmkit.telematics.sendCommand(
            hmkit.commands.${snakeCaseToCapitalCase(capability.name)}.${functionName}(${
              // Get the function arguments object and add indentation so it formats properly
              JSON.stringify(getExampleSetterArgument(setter, capability), null, 2)
                .split('\n')
                .map((x, i) => i === 0 ? x : ' '.repeat(12) + x)
                .join('\n')
            }),
            accessCertificate
          );
        `),
      };
    })
    .filter(Boolean);
}

/**
 * Returns an example object containing the data that will be passed to a setter function.
 */
function getExampleSetterArgument(setter, capability) {
  const { mandatory = [], optional = [] } = setter;

  return [...mandatory, ...optional].reduce((args, propertyID) => {
    const property = capability.properties.find(prop => prop.id === propertyID);
    if (property.name === 'multi_commands') {
      return {
        ...args,
        [property.name_cased]: buildMultiCommandsArgument(),
      };
    }

    return {
      ...args,
      [property.name_cased]: property.multiple
        ? property.examples.map(example =>
            parsePropertyData(hexToUint8Array(example.data_component), property)
          )
        : property.examples[0].value || property.examples[0].values,
    };
  }, {});
}

/**
 * Builds example command for multiCommand from first 2 found capabilities with setters.
 */
function buildMultiCommandsArgument() {
  const exampleCapabilities = Object.values(Capabilities)
    .filter(capability => capability.setters)
    .slice(0, 2);
  return exampleCapabilities.reduce((result, exampleCapability) => {
    const setterArguments = exampleCapability.setters
      .slice(0, 2)
      .reduce((result, setter) => {
        const setterArgument = getExampleSetterArgument(
          setter,
          exampleCapability
        );
        const setterName = snakeCaseToCamelCase(setter.name);
        return {
          ...result,
          [setterName]: setterArgument,
        };
      }, {});

    return {
      ...result,
      [exampleCapability.name_cased]: setterArguments,
    };
  }, {});
}

/**
 * Generates a sample response JSON from the properties' examples
 */
function getExampleResponse(capability) {
  const stateProperties = getStateProperties(capability);
  return stateProperties.reduce((mappedResp, property) => {
    if (property.customType === 'supported_capability') {
      return {
        [property.name_cased]: property.examples.map(example => {
          // eslint-disable-next-line camelcase
          const { capability_id, supported_property_ids } = example.values;
          // eslint-disable-next-line no-shadow
          const exampleCapability = Object.values(Capabilities).find(
            capability => capability.identifier.lsb === capability_id
          );
          const supportedProperties = exampleCapability.properties
            .filter(prop => supported_property_ids.includes(prop.id))
            .map(prop => prop.name_cased);

          return {
            data: {
              capability: exampleCapability.name_cased,
              supportedProperties,
            },
          };
        }),
      };
    }

    return {
      ...mappedResp,
      [property.name_cased]: property.multiple
        ? property.examples.map(example => ({
            timestamp: new Date('2021-06-01T15:48:04.887Z'),
            data: parsePropertyData(
              hexToUint8Array(example.data_component),
              property
            ),
          }))
        : {
            timestamp: new Date('2021-06-01T15:48:04.887Z'),
            data: parsePropertyData(
              hexToUint8Array(property.examples[0].data_component),
              property
            ),
          },
    };
  }, {});
}

/**
 * Returns an array of properties that are in this capability's state
 */
function getStateProperties(capabilityConfiguration) {
  if (!capabilityConfiguration.state) return [];

  return capabilityConfiguration.state
    .map(propertyID =>
      capabilityConfiguration.properties.find(prop => prop.id === propertyID)
    )
    .filter(prop => prop != null && !prop.deprecated);
}

/**
 * Returns a string describing this property (its type and custom description if present)
 */
function getPropertyDescription(property) {
  const propertyType = property.type.replace(/^unit\./, '');
  const generalType = getPropertyType(property);
  let baseDescription = `${property.description || ''}`
    .split(',')
    .join('&comma;');

  // Add the auto-api type in parens if it adds extra info (if it's just the same as the general type,
  // or "custom" which doesn't really mean anything, then there's no point in adding it)
  if (generalType.toLowerCase() !== propertyType && propertyType !== 'custom') {
    baseDescription = `(${propertyType}) ` + baseDescription;
  }

  if (property.enum_types) {
    const possibleEnums = property.enum_types
      .map(enumObj => enumObj.name)
      .join('&comma; ');

    return `(String: [${possibleEnums}]) ${baseDescription}`;
  }

  return `(${generalType}) ${baseDescription}`;
}

/**
 * Returns a string representing this property's type
 */
function getPropertyType(property) {
  const { multiple } = property;
  const type = property.type.replace(/^unit\./, '');
  const generalType = property.type.startsWith('unit.')
    ? 'Number'
    : {
        string: 'String',
        custom: 'Object',
        uinteger: 'Number',
        list_uinteger: 'Number',
        double: 'Number',
        float: 'Number',
        enum: 'String',
        timestamp: 'Date',
        integer: 'Number',
        bytes: 'Array<Number>',
      }[type];

  if (multiple) {
    return `Array<${generalType}>`;
  }

  return generalType;
}

/**
 * Formats the code into a markdown code block
 */
function code(src, lang = 'javascript') {
  return (
    '```' +
    lang +
    '\n' +
    stripIndent(src)
      .replace(/^\n/, '')
      .replace(/\n\s*$/, '') +
    '\n```'
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function snakeCaseToCapitalCase(string) {
  return string
    .split('_')
    .map(token => token.charAt(0).toUpperCase() + token.slice(1))
    .join('');
}

function snakeCaseToCamelCase(name) {
  const capitalized = snakeCaseToCapitalCase(name);
  return capitalized.charAt(0).toLowerCase() + capitalized.slice(1);
}

buildDocumentation().then(() =>
  console.log(`Documentation written to ${DOCUMENTATION_DIRECTORY}`)
);
