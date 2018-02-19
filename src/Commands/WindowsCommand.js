import Command from './Command';

export default class WindowsCommand {
  static getState() {
    return new Command([0x00, 0x45, 0x00]);
  }

  static control(windows: Object) {
    return new Command([0x00, 0x45, 0x02, ...this.getWindowsBytes(windows)]);
  }

  static getWindowsBytes(windows) {
    var result = [];

    console.log(windows);

    for (const window of windows) {
      result = [...result, 0x01, 0x00, 0x02];

      console.log('HELLLLOOO:', window['windowPosition']);

      for (const [key, value] of Object.entries(window)) {
        //              if (key === 'windowPosition') {
        //                  result = [...result, this.getWindowPositionByte(value)];
        //              }

        console.log('key:', key, ' value:', value);
      }
    }

    for (const [position, openClose] of Object.entries(windows)) {
      //      result = [
      //        ...result,
      //        0x01,
      //        0x00,
      //        0x02,
      //        this.getWindowPositionByte(position),
      //        this.getWindowOpenCloseByte(openClose),
      //      ];
    }

    return result;
  }

  //  static getWindowsBytes(windows) {
  //    const windowsCount = Object.keys(windows).length;
  //    let result = [windowsCount];
  //
  //    for (const [windowPosition, windowOpenClose] of Object.entries(windows)) {
  //      const positionByte = this.getWindowPositionByte(windowPosition);
  //      const openCloseByte = this.getWindowOpenCloseByte(windowOpenClose);
  //
  //      result = [...result, positionByte, openCloseByte];
  //    }
  //
  //    return result;
  //  }

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
