expect.extend({
  unitWithValue(received, unitTypes) {
    const [receivedUnitType, value] = Object.entries(received)[0];
    const hasUnit = unitTypes.some(unitType => unitType.name === receivedUnitType);
    const hasNumberValue = Number(value) === value;

    if (hasUnit && hasNumberValue) {
      return {
        message: () => `expect to have unit and value`,
        pass: true,
      };
    }

    return {
      message: () => `expected ${JSON.stringify(received)} to have unit and value`,
      pass: false,
    };
  }
});
