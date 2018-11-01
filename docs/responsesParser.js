const fs = require('fs');
const Yaml = require('yamljs');
const { camelsToKebabs, parseResponses } = require('./utils');

function generateResponsesDocumentation() {
  const parsedResponses = parseResponses();

  const metaData = {
    layout: 'resources/documentation/cloud-sdks/node-js',
    header: 'Node.js Responses',
    permalink: '/documentation/cloud-sdks/node-js/responses/',
    'search-title': 'Node.js Responses',
    category: 'cloud',
    'toc-options': parsedResponses.map(response => ({
      text: response.name,
      href: `#${camelsToKebabs(response.name)}`,
    })),
  };

  const parsedMetadataString = `---\n${Yaml.stringify(metaData, 10, 2)}---`;

  const descriptionString = `<p class="introductory-text">More info at <a href="/learn/documentation/auto-api/api-structure/tutorial/">Auto API</a>.</p>`;
  const tocHeaderString = `{% include toc-header.html expand=true %}`;

  const parsedResponsesString = parsedResponses
    .map(generateResponseBlock)
    .join('');

  fs.writeFile(
    './responses.html',
    `${parsedMetadataString}\n\n${descriptionString}\n\n${tocHeaderString}\n\n${parsedResponsesString}`,
    err => {
      if (err) {
        return console.log(err);
      }

      return console.log('Documentation saved to responses.html');
    }
  );
}

function generateResponseBlock(response) {
  const titleBlock = `<h2 id="${camelsToKebabs(response.name)}">${response.name}</h2>`;

  const mainBlock = `<h3>General response</h3>\n
{%
include code-node-sdk-response.html
parameters-name="${response.properties.map(prop => prop.name).join(', ')}"
parameters-description="${response.properties
    .map(prop => prop.description)
    .join(', ')}"
%}\n\n`;

  const exampleBlock = (response.examples.length > 0) ? generateExample(response.examples[0]) : '';

  return `${titleBlock}\n<div class="split-design-wrapper"><div class="col-left">\n${mainBlock}\n</div><div class="col-right">\n${exampleBlock}\n</div></div>\n\n`;
}

function generateExample(example) {
  return `<h4>Example</h4>
{% capture code %}
<${example.name}> ${example.description}
{% endcapture %}
{% include code-snippet.html code-language="javascript" snippet-code-id="snippet-code" %}`;
}

generateResponsesDocumentation();
