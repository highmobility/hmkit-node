import Command from './Command';

export default class WindowsCommand {
  static getState() {
    return new Command([0x00, 0x45, 0x00]);
  }

  static control(windows: Object) {
    return new Command([0x00, 0x45, 0x02, ...this.getWindowsBytes(windows)]);
  }

  static getWindowsBytes(windows) {
    let result = [];

    for (const window of windows) {
      const positionStr = window.windowPosition;
      const stateStr = window.windowState;

      if (positionStr !== null && stateStr !== null) {
        result = [
          ...result,
          0x01,
          0x00,
          0x02,
          this.getWindowPositionByte(positionStr),
          this.getWindowOpenCloseByte(stateStr),
        ];
      }
    }

    return result;
  }

  static getWindowPositionByte(position) {
    switch (position) {
      case 'front_right':
        return 0x01;
      case 'rear_right':
        return 0x02;
      case 'rear_left':
        return 0x03;
      case 'hatch':
        return 0x04;
      default:
        return 0x00;
    }
  }

  static getWindowOpenCloseByte(openClose) {
    switch (openClose) {
      case 'open':
        return 0x01;
      default:
        return 0x00;
    }
  }
}
