export default class NotificationResponse {
  static identifier = [0x00, 0x38];

  constructor(bytes) {
    this.action = this.getAction(bytes);
  }

  getAction(bytes) {
    return bytes[3];
  }
}
