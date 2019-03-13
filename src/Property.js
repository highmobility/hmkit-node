export default class Property {
  constructor(value, timestamp, error) {
    if (value !== undefined) {
      this.value = value;
    }

    if (timestamp !== undefined) {
      this.timestamp = timestamp;
    }

    if (error !== undefined) {
      this.error = error;
    }
  }
}
