import Command from './Command';

export default class WindowsCommand {
  static getState() {
    return new Command([0x00, 0x45, 0x00]);
  }

  static openClose(windows: Object) {
    const windowsBytes = this.getWindowsBytes(windows);

    return new Command([0x00, 0x45, 0x02, ...windowsBytes]);
  }

  static getWindowsBytes(windows) {
    const windowsCount = Object.keys(windows).length;
    let result = [windowsCount];

    for (const [windowPosition, windowOpenClose] of Object.entries(windows)) {
      const positionByte = this.getWindowPositionByte(windowPosition);
      const openCloseByte = this.getWindowOpenCloseByte(windowOpenClose);

      result = [...result, positionByte, openCloseByte];
    }

    return result;
  }

  static getWindowPositionByte(position) {
    switch (position) {
      case 'front_left':
        return 0x00;

      case 'front_right':
        return 0x01;

      case 'rear_right':
        return 0x02;

      case 'rear_left':
        return 0x03;

      default:
        return 0x00;
    }
  }

  static getWindowOpenCloseByte(openClose) {
    switch (openClose) {
      case 'close':
        return 0x00;

      case 'open':
        return 0x01;

      default:
        return 0x00;
    }
  }
}
