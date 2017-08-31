export default class WindowsResponse {
  static identifier = [0x00, 0x45];

  constructor(bytes) {
    Object.assign(this, this.getWindowsStates(bytes));
  }

  getWindowsStates(bytes) {
    const windows = {};
    const windowsCount = bytes[3];

    const positions = {
      0: 'frontLeft',
      1: 'frontRight',
      2: 'rearRight',
      3: 'rearLeft',
    };

    for (let i = 0; i < windowsCount; i++) {
      const pos = 4 + 2 * i;

      windows[positions[bytes[pos]]] = this.getPositionValue(bytes[pos + 1]);
    }

    return windows;
  }

  getPositionValue(byte) {
    return byte === 0x00 ? 'closed' : 'open';
  }
}
