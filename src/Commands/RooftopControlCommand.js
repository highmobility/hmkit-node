import Command from './Command';

function getByteArray(identifier, value) {
  if (typeof value !== 'number') return [];

  if (value > 0.0 && value < 1.0) {
    value = value * 100;
  }

  return [identifier, 0x00, 0x01, value];
}

export default class RooftopControlCommand {
  static getState() {
    return new Command([0x00, 0x25, 0x00]);
  }

  static control(dimming: ?number, position: ?number) {
    return new Command([
      0x00,
      0x25,
      0x02,
      ...getByteArray(0x01, dimming),
      ...getByteArray(0x02, position),
    ]);
  }
}
