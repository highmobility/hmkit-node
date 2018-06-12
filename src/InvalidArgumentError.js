// export default class InvalidArgumentError extends Error {
//   constructor(...args) {
//     super(...args);
//     Error.captureStackTrace(this, InvalidArgumentError);
//     this.name = this.constructor.name;
//   }
// }

export default class InvalidArgumentError {
  constructor(message) {
    this.name = 'InvalidArgumentError';
    this.message = message;
    this.stack = new Error().stack;
  }
}
InvalidArgumentError.prototype = Object.create(Error.prototype);
