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
 *  ValidationUtils.js
 * 
 *  Created by Mikk Õun on 14/01/2020.
 */

import Joi from 'joi';
import InvalidArgumentError from '../Errors/InvalidArgumentError';

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
export const validate = (validationRule: {
  name: string,
  value: any,
  condition: Object,
}) => {
  const { name, value, condition } = validationRule;

  const result = Joi.validate({ [name]: value }, { [name]: condition });

  if (result.error) {
    throw new InvalidArgumentError(
      `Invalid argument passed to command: \n${result.error.details
        .map(x => x.message)
        .join(', ')}`
    );
  }
};

// Re-exporting for convenience so we don't have to import from two different places in other files
export { Joi };
