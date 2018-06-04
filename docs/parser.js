const fs = require('fs');
const commentParser = require('comment-parser');
const Commands = require('../lib/Commands').default;
const Response = require('../lib/Responses/Response').default;
const Yaml = require('yamljs');

/* eslint-disable camelcase */

function camelsToKebabs(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function mapParsedFunction(parsedFunction) {
  const functionTag = parsedFunction.tags.find(tag => tag.tag === 'function');

  if (!functionTag) throw new Error('No function tag configured');

  const properties = parsedFunction.tags
    .filter(tag => tag.tag === 'property')
    .map(({ name, description, type }) => ({
      name: name.trim(),
      description: description
        .trim()
        .split(',')
        .join('&comma;'),
      type,
    }));

    const examples = parsedFunction.tags.filter(tag => tag.tag === 'example').map(({ name, description }) => ({
      name: name.trim(),
      description: description.trim(),
    }));

  return {
    name: functionTag.name.trim(),
    properties,
    examples
  };
}

function parseCommands() {
  const commands = new Commands();

  return Object.keys(commands).reduce((parsedCommands, command) => {
    if (commands.hasOwnProperty(command)) {
      const commandContents = fs.readFileSync(
        `../lib/Commands/${command}.js`,
        'utf8'
      );

      const mappedCommand = {
        name: command,
        functions: commentParser(commandContents, {
          trim: false,
          dotted_names: true,
        }).map(mapParsedFunction),
      };

      if (mappedCommand && mappedCommand.functions.length > 0) {
        return parsedCommands.concat(mappedCommand);
      }

      return parsedCommands;
    }

    return parsedCommands;
  }, []);
}

function parseResponses() {
  const responses = new Response([]);

  return responses.parsers.reduce((parsedResponses, response) => {
    const responseContents = fs.readFileSync(
      `../lib/Responses/${response.name}.js`,
      'utf8'
    );

    const parsedContents = commentParser(responseContents, {
      trim: false,
      dotted_names: true,
    });

    const parsedProperties = parsedContents.reduce(
      (properties, parsedBlock) =>
        properties.concat(
          parsedBlock.tags
            .filter(tag => tag.tag === 'property')
            .map(({ name, description, type }) => ({
              name: name.trim(),
              description: description
                .trim()
                .split(',')
                .join('&comma;'),
              type,
            }))
        ),
      []
    );

    const parsedExamples = parsedContents.reduce(
      (examples, parsedBlock) =>
        examples.concat(
          parsedBlock.tags
            .filter(tag => tag.tag === 'example')
            .map(({ name, description }) => ({
              name: name.trim(),
              description: description.trim(),
            }))
        ),
      []
    );

    const mappedResponse = {
      name: response.name,
      properties: parsedProperties,
      examples: parsedExamples,
    };

    return parsedResponses.concat(mappedResponse);
  }, []);
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

  const exampleBlock = (functionData.examples.length > 0) ? `<h4>Example</h4>
{% capture code %}
${functionData.examples[0].description}
{% endcapture %}
{% include code-snippet.html code-language="javascript" snippet-code-id="snippet-code" %}\n\n` : '';

  return `${titleBlock}\n\n${snippetBlock}\n\n${propertiesBlock}\n\n${exampleBlock}`;
}

function generateCommandsDocumentation() {
  const parsedCommands = parseCommands();

  const metaData = {
    layout: 'resources/documentation/cloud-sdks/node-js',
    header: 'Node.js Auto API',
    permalink: '/documentation/cloud-sdks/node-js/commands/',
    'search-title': 'Node.js Auto API',
    category: 'cloud',
    'toc-options': parsedCommands.map(command => ({
      text: command.name,
      href: `#${camelsToKebabs(command.name)}`,
      options: command.functions.map(func => ({
        text: `${func.name}()`,
        href: `#${camelsToKebabs(command.name)}-${camelsToKebabs(func.name)}`,
      })),
    })),
  };

  const parsedMetadataString = `---\n${Yaml.stringify(metaData, 10, 2)}---`;
  const parsedCommandsString = parsedCommands
    .map(parsedCommand => generateCommandBlock(parsedCommand))
    .join('');

  const descriptionString = `<p>More info at <a href="/resources/documentation/auto-api/api-structure/tutorial/">Auto API</a>.</p>`;

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

function generateExample(example) {
  return `<h4>Example</h4>
{% capture code %}
<${example.name}> ${example.description}
{% endcapture %}
{% include code-snippet.html code-language="javascript" snippet-code-id="snippet-code" %}\n\n`;
}

function generateResponseBlock(response) {
  const mainBlock = `<h2 id="${camelsToKebabs(response.name)}">${
    response.name
  }</h2>
<h3>General response</h3>\n
{%
include code-node-sdk-response.html
parameters-name="${response.properties.map(prop => prop.name).join(', ')}"
parameters-description="${response.properties
    .map(prop => prop.description)
    .join(', ')}"
%}\n\n`;

  if (response.examples.length > 0) {
    return `${mainBlock}${generateExample(response.examples[0])}`;
  }

  return mainBlock;
}

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

  const descriptionString = `<p>More info at <a href="/resources/documentation/auto-api/api-structure/tutorial/">Auto API</a>.</p>`;

  const parsedResponsesString = parsedResponses
    .map(generateResponseBlock)
    .join('');

  fs.writeFile(
    './responses.html',
    `${parsedMetadataString}\n\n${descriptionString}\n\n${parsedResponsesString}`,
    err => {
      if (err) {
        return console.log(err);
      }

      return console.log('Documentation saved to responses.html');
    }
  );
}

function generateDocumentation() {
  generateCommandsDocumentation();
  // generateResponsesDocumentation();
}

generateDocumentation();
