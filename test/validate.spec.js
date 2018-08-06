import { validate, Joi } from '../src/validate';
import InvalidArgumentError from '../src/InvalidArgumentError';

describe(`validate`, () => {
  it(`should do nothing if there are no errors`, () => {
    expect(
      validate([
        {
          value: 15,
          name: 'Speed',
          condition: Joi.number()
            .min(10)
            .required(),
        },
      ])
    ).toBeUndefined();
  });

  it(`should throw exception on failed validation`, () => {
    expect(() => {
      validate([
        {
          value: 15,
          name: 'Speed',
          condition: Joi.number()
            .min(20)
            .required(),
        },
      ]);
    }).toThrow();
  });

  it(`should handle missing argument names`, () => {
    expect(() => {
      validate([
        {
          value: 15,
          condition: Joi.number()
            .min(20)
            .required(),
        },
        {
          value: 20,
          condition: Joi.number()
            .min(25)
            .required(),
        },
        {
          value: 20,
          condition: Joi.number()
            .max(30)
            .required(),
        },
      ]);
    }).toThrow(InvalidArgumentError);
  });
});
