import Joi from 'joi';
import InvalidArgumentError from './InvalidArgumentError';

/**
 * Validates an array of values. If schema doesn't match, error will be thrown.
 * Schema validation is done with Joi, documentation here: https://github.com/hapijs/joi
 *
 * rules - array of values to validate:
 *    value - value that we are validating
 *    condition - Joi condition
 *    name - Name of the value that will be used in the error message if validation fails
 *
 * Examples:
 * validate(arguments, { username: Joi.string.required() });
 * validate(arguments, Joi.array());
 */
export const validate = (
  rules: Array<{
    name: string,
    value: any,
    condition: Object,
  }>
) => {
  const errors = [];

  rules.forEach((arg, i) => {
    const name = arg.name || `Argument ${i + 1}`;
    const result = Joi.validate(
      { [name]: arg.value },
      { [name]: arg.condition }
    );

    if (result.error) {
      errors.push(result.error.details.map(x => x.message).join(', '));
    }
  });

  if (errors.length > 0) {
    throw new InvalidArgumentError(
      `Invalid argument${
        errors.length > 1 ? 's' : ''
      } passed to command: \n${errors.join('; \n')}`
    );
  }
};

// Re-exporting for convenience so we don't have to import from two different places in other files
export { Joi };
