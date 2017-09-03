export default class TheftAlarmResponse {
  static identifier = [0x00, 0x46];

  constructor(bytes) {
    this.state = this.getState(bytes);
  }

  getState(bytes) {
    switch (bytes[3]) {
      case 0x01:
        return 'armed';

      case 0x02:
        return 'triggered';

      default:
        return 'not armed';
    }
  }
}
