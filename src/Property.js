export default class Property {
  constructor(data, timestamp, error) {
    if (data !== undefined) {
      this.data = data;
    }

    if (timestamp !== undefined) {
      this.timestamp = timestamp;
    }

    if (error !== undefined) {
      this.error = error;
    }
  }
}
