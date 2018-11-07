const fs = require('fs');
const Yaml = require('yamljs');
const { camelsToKebabs, parseCommands } = require('./utils');

function generateFunctionBlock(commandName, functionData) {
  const functionId = `${camelsToKebabs(commandName)}-${camelsToKebabs(
    functionData.name
  )}`;

  const functionArguments = functionData.properties.map(
    property => property.name
  );

  const functionArgumentDescriptions = functionData.properties
    .map(property => property.description)
    .join(', ');

  const titleBlock = `<h3 id="${functionId}">${functionData.name}()</h3>`;

  const snippetBlock = `{% capture code %}
HMKit.commands.${commandName}.${functionData.name}(${functionArguments.join(
    ', '
  )})
{% endcapture %}`;

  const parametersAttrs =
    functionArguments.length > 0
      ? `\n  parameters-name="${functionArguments.join(
          ', '
        )}"\n  parameters-description="${functionArgumentDescriptions}"`
      : '';

  const propertiesBlock = `{%
  include code-reference-snippet.html
  reference-id="${functionId}"${parametersAttrs}
%}`;

  const exampleBlock =
    functionData.examples.length > 0
      ? `<h4>Example</h4>
{% capture code %}
${functionData.examples[0].description}
{% endcapture %}
{% include code-snippet.html code-language="javascript" snippet-code-id="snippet-code" %}\n\n`
      : '';

  if (exampleBlock.length > 0) {
    return `${titleBlock}\n\n${snippetBlock}\n\n<div class="split-design-wrapper"><div class="col-left">\n\n${propertiesBlock}\n</div><div class="col-right">\n${exampleBlock}\n</div></div>`;
  }

  return `${titleBlock}\n\n${snippetBlock}\n\n${propertiesBlock}\n\n${exampleBlock}`;
}

function generateCommandBlock(command) {
  const commandTitle = `<h2 id="${camelsToKebabs(command.name)}">${
    command.name
  }</h2>`;

  const generatedFunctions = command.functions
    .map(functionData => generateFunctionBlock(command.name, functionData))
    .join('');

  return `${commandTitle}\n\n${generatedFunctions}`;
}

function generateCommandsDocumentation() {
  const parsedCommands = parseCommands();

  const metaData = {
    layout: 'resources/documentation/cloud-sdks/node-js',
    header: 'Node.js Auto API',
    permalink: '/documentation/cloud-sdks/node-js/commands/',
    'search-title': 'Node.js Auto API',
    category: 'cloud',
    // 'toc-options': parsedCommands.map(command => ({
    //   text: command.name,
    //   href: `#${camelsToKebabs(command.name)}`,
    //   options: command.functions.map(func => ({
    //     text: `${func.name}()`,
    //     href: `#${camelsToKebabs(command.name)}-${camelsToKebabs(func.name)}`,
    //   })),
    // })),
  };

  const parsedMetadataString = `---\n${Yaml.stringify(metaData, 10, 2)}---`;
  const parsedCommandsString = parsedCommands
    .map(parsedCommand => generateCommandBlock(parsedCommand))
    .join('');

  const descriptionString = `<p class="introductory-text">See the Node.js <a href="/learn/documentation/auto-api/api-structure/tutorial/">Auto API</a> page for more information.</p>`;

  fs.writeFile(
    './commands.html',
    `${parsedMetadataString}\n\n${descriptionString}\n\n${parsedCommandsString}`,
    err => {
      if (err) {
        return console.log(err);
      }

      return console.log('Documentation saved to commands.html');
    }
  );
}

generateCommandsDocumentation();
