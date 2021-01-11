const describeIf = (condition, ...args) =>{
  if (condition) {
    return describe(...args);
  }

  return describe.skip(...args);
}

export default describeIf;
