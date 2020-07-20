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
 *  responseParser.js
 *
 *  Created by Mikk Õun on 20/01/2020.
 */

const fs = require('fs');
const Yaml = require('yamljs');
const Capabilities = require('../src/Configuration/capabilities.json');
const ResponseClass = require('../lib/Configuration/ResponseClass').default;
const { parsePropertyData } = require('../lib/Utils/ResponseUtils');
const { hexToUint8Array } = require('../lib/Utils/EncodingUtils');

const RESPONSES_DESTINATION_FILE = `${__dirname}/../docs/responses.html`;

const PROPERTY_TYPES = {
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
};

buildResponsesDocumentation();

function buildResponsesDocumentation() {
  const responses = Object.values(ResponseClass).filter(
    res => res.lsb !== undefined
  );

  const content = buildResponsesContent(responses);

  const metaData = {
    layout: 'resources/documentation/cloud-sdks/node-js',
    header: 'Node.js Responses',
    permalink: '/documentation/cloud-sdks/node-js/responses/',
    'search-title': 'Node.js Responses',
    category: 'cloud',
    'toc-options': responses.map(response => ({
      text: response.name,
      href: `#${response.name}_response`,
    })),
  };

  const parsedMetadataString = `---\n${Yaml.stringify(metaData, 10, 2)}---`;
  const tocHeaderString = `{% include toc-header.html expand=true %}`;
  const descriptionString = `<p class="introductory-text">More info at <a href="/learn/documentation/auto-api/api-structure/tutorial/">Auto API</a>.</p>`;

  fs.writeFile(
    RESPONSES_DESTINATION_FILE,
    `${parsedMetadataString}\n${descriptionString}\n${tocHeaderString}\n${content}`,
    err => {
      if (err) {
        return console.log(err);
      }

      return console.log('Documentation saved to responses.html');
    }
  );
}

function buildResponsesContent(responses) {
  return responses
    .map(response => {
      const capabilityConfiguration = getCapabilityConfiguration(
        response.msb,
        response.lsb
      );

      const stateProperties = getStateProperties(capabilityConfiguration);

      const mappedResponse = JSON.stringify(
        generateResponse(stateProperties),
        null,
        '  '
      );

      const propertyNames = stateProperties
        .map(prop => prop.name_cased)
        .join(',');

      const propertyDescriptions = stateProperties.map(getPropertyDescription);

      const leftCol = buildLeftCol(propertyNames, propertyDescriptions);

      const rightCol = buildRightCol(mappedResponse, response.name);

      return `
<h2 id="${capabilityConfiguration.name}_response">${response.name}</h2>
<div class="split-design-wrapper">
  ${leftCol}
  ${rightCol}
</div>
`;
    })
    .join('\n');
}

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

function getPropertyType(property) {
  const { multiple } = property;
  const type = property.type.replace(/^unit\./, '');
  const generalType = property.type.startsWith('unit.')
    ? 'Number'
    : PROPERTY_TYPES[type];

  if (multiple) {
    return `Array&lt;${generalType}&gt;`;
  }

  return generalType;
}

function getCapabilityConfiguration(msbToFind, lsbToFind) {
  return Object.values(Capabilities).find(capabilityConf => {
    const { msb, lsb } = capabilityConf.identifier || {};
    return msb === msbToFind && lsb === lsbToFind;
  });
}

function getStateProperties(capabilityConfiguration) {
  return capabilityConfiguration.state.map(propertyID =>
    capabilityConfiguration.properties.find(prop => prop.id === propertyID)
  );
}

function generateResponse(stateProperties) {
  return stateProperties.reduce(
    (mappedResp, property) => ({
      ...mappedResp,
      ...generatePropertyValue(property),
    }),
    {}
  );
}

function generatePropertyValue(property) {
  if (!property.examples) return { [property.name_cased]: {} };

  if (property.multiple) {
    return {
      [property.name_cased]: property.examples.map(example => {
        return {
          value: parsePropertyData(
            hexToUint8Array(example.data_component),
            property
          ),
        };
      }),
    };
  }

  return {
    [property.name_cased]: {
      value: property.examples[0].value || property.examples[0].values,
    },
  };
}

function buildLeftCol(names, descriptions) {
  return `
<div class="col-left">
  <h3>General response</h3>
  {%
  include code-node-sdk-response.html
  parameters-name="${names}"
  parameters-description="${descriptions}"
  %}
</div>
`;
}

function buildRightCol(exampleState, responseName) {
  return `
<div class="col-right">
  <h4>Example</h4>
  {% capture code %}<${responseName}> ${exampleState}{% endcapture %}
  {% include code-snippet.html code-language="javascript" snippet-code-id="snippet-code" %}
</div>
`;
}
