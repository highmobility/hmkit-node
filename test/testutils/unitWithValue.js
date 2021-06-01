expect.extend({
  unitWithValue(received, unitTypes) {
    const { value, unit: receivedUnitType } = received;
    const hasUnit = unitTypes.some(
      unitType => unitType.name === receivedUnitType
    );
    const hasNumberValue = Number(value) === value;

    if (hasUnit && hasNumberValue) {
      return {
        message: () => `expect to have unit and value`,
        pass: true,
      };
    }

    return {
      message: () =>
        `expected ${JSON.stringify(received)} to have unit and value`,
      pass: false,
    };
  },
});
