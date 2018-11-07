const fs = require('fs');
const commentParser = require('comment-parser');
const Commands = require('../lib/Commands').default;
const Response = require('../lib/Responses/Response').default;

function camelsToKebabs(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
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

  const examples = parsedFunction.tags
    .filter(tag => tag.tag === 'example')
    .map(({ name, description }) => ({
      name: name.trim(),
      description: description.trim(),
    }));

  return {
    name: functionTag.name.trim(),
    properties,
    examples,
  };
}

module.exports = {
  camelsToKebabs,
  parseResponses,
  parseCommands,
  mapParsedFunction,
};
