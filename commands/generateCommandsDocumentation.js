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
 *  commandParser.js
 * 
 *  Created by Mikk Õun on 20/01/2020.
 */

const fs = require('fs');
const Yaml = require('yamljs');
const prettier = require('prettier');
const Capabilities = require('../src/Configuration/capabilities.json');
const { parsePropertyData } = require('../lib/Utils/ResponseUtils');
const { hexToUint8Array } = require('../lib/Utils/EncodingUtils');

const COMMANDS_DESTINATION_FILE = `${__dirname}/../docs/commands.html`;

const PRETTIER_CONF = {
  printWidth: 80,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: true,
  parser: 'babel',
};

const METADATA = {
  layout: 'resources/documentation/cloud-sdks/node-js',
  header: 'Node.js Auto API',
  permalink: '/documentation/cloud-sdks/node-js/commands/',
  'search-title': 'Node.js Auto API',
  category: 'cloud',
};

const DISABLED_FOR_CATEGORIES = ['universal'];
const WEB_CONNECTION_TYPE = 'web';

buildCommandDocumentation();

function buildCommandDocumentation() {
  const parsedMetadataString = `---\n${Yaml.stringify(METADATA, 10, 2)}---`;
  const descriptionString = `<p class="introductory-text">See the Node.js <a href="/learn/documentation/auto-api/api-structure/tutorial/">Auto API</a> page for more information.</p>`;

  fs.writeFile(
    COMMANDS_DESTINATION_FILE,
    `${parsedMetadataString}\n\n${descriptionString}\n\n${parseCommands()}`,
    err => {
      if (err) {
        return console.log(err);
      }

      return console.log('Documentation saved to commands.html');
    }
  );
}

function parseCommands() {
  return Object.values(Capabilities)
    .filter(
      capabilityConf =>
        !(capabilityConf.disabled_in || []).includes(WEB_CONNECTION_TYPE) &&
        !DISABLED_FOR_CATEGORIES.includes(capabilityConf.category)
    )
    .map(capability => {
      const { getters, setters = [] } = capability;
      const title = `<h2 id="${capability.name}">${
        capability.pretty_name
      }</h2>`;
      const builtGetter = getters
        ? buildFunctionBlock(
            getters.name || 'get_state',
            undefined,
            undefined,
            capability
          )
        : null;
      const builtSetters = setters.map(({ name, mandatory, optional }) =>
        buildFunctionBlock(name, mandatory, optional, capability)
      );
      // .join('\n')

      const parsedCommand = [title];
      if (builtGetter) parsedCommand.push(builtGetter);
      if (builtSetters.length > 0) parsedCommand.push(...builtSetters);
      return parsedCommand.join('\n');
    })
    .join('\n');
}

function buildFunctionBlock(
  name,
  mandatory = [],
  optional = [],
  capabilityConf
) {
  const capabilityName = capitalizeSnake(capabilityConf.name);
  const functionName = buildFunctionName(name);

  const properties = mandatory
    .concat(optional)
    .map(propId => capabilityConf.properties.find(prop => prop.id === propId));

  const propNames = properties.map(prop => prop.name_cased);

  const propDescriptions = properties
    .map(prop => prop.description || '')
    .join(',');

  const hasProps = properties.length > 0;

  const commandArgs = hasProps ? `{ ${propNames.join(', ')} }` : '';

  const example = buildExample(
    capabilityConf,
    capabilityName,
    functionName,
    name
  );

  return `
    <h3 id="${capabilityConf.name}_${name}">${functionName}(${commandArgs})</h3>
    
    <div class="split-design-wrapper">
        <div class="col-left">
            {% capture code %}HMKit.commands.${capabilityName}.${functionName}(${commandArgs}){% endcapture %}
            {%
              include code-reference-snippet.html
              reference-id="${capabilityName}_${name}"
              ${hasProps ? `parameters-name="${propNames.join(',')}"` : ''}
              ${hasProps ? `parameters-description="${propDescriptions}"` : ''}
            %}
        </div>
        ${example}
    </div>

    `;
}

function buildExample(
  capabilityConf,
  capabilityName,
  functionName,
  functionSnakeCase
) {
  const exampleArguments = findSetterArguments(
    capabilityConf.identifier,
    functionSnakeCase
  );

  const codeExample = `hmkit.telematics.sendCommand(hmkit.commands.${capabilityName}.${functionName}(${JSON.stringify(
    exampleArguments
  )}), accessCertificate);`;

  return `
<div class="col-right">
    ${
      exampleArguments
        ? `<h4>Example</h4>

    {% capture code %}${prettier.format(
      codeExample,
      PRETTIER_CONF
    )}{% endcapture %}
    
    {% include code-snippet.html code-language="javascript" snippet-code-id="snippet-code" %}`
        : ''
    }
</div>
`;
}

function capitalizeSnake(string) {
  return string
    .split('_')
    .map(token => token.charAt(0).toUpperCase() + token.slice(1))
    .join('');
}

function buildFunctionName(name) {
  const capitalized = capitalizeSnake(name);
  return capitalized.charAt(0).toLowerCase() + capitalized.slice(1);
}
function getCapabilityConfiguration({ msb: msbToFind, lsb: lsbToFind }) {
  return Object.values(Capabilities).find(capabilityConf => {
    const { msb, lsb } = capabilityConf.identifier || {};
    return msb === msbToFind && lsb === lsbToFind;
  });
}

function findSetterArguments(identifier, name) {
  const capabilityConfiguration = getCapabilityConfiguration(identifier);

  if (!capabilityConfiguration || !capabilityConfiguration.setters) {
    return null;
  }

  const setter = capabilityConfiguration.setters.find(set => set.name === name);

  if (!setter) {
    return null;
  }

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
