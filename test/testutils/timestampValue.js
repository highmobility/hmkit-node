expect.extend({
  timestampValue(received) {
    let pass = false;

    if (received instanceof Date) {
      pass = true;
    } else if (received instanceof Object) {
      const values = Object.values(received);
      pass = values.some(v => Object.prototype.toString.call(v) === '[object Date]');
    }

    return {
      message: () => `expected ${JSON.stringify(received)} to have a timestamp`,
      pass,
    };
  }
});
