const describeIf = (condition, ...args) =>
  condition ? describe(...args) : describe.skip(...args);

export default describeIf;
