export default class KeyfobPositionResponse {
  static identifier = [0x00, 0x48];

  constructor(bytes) {
    this.position = this.getPosition(bytes);
  }

  getPosition(bytes) {
    switch (bytes[3]) {
      case 0x01:
        return 'outside_driver_side';
      case 0x02:
        return 'outside_in_front_of_car';
      case 0x03:
        return 'outside_passenger_side';
      case 0x04:
        return 'outside_behind_car';
      case 0x05:
        return 'inside';
      default:
        return 'out_of_range';
    }
  }
}
