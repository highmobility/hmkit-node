export default class WindowsResponse {
  static identifier = [0x00, 0x45];

  constructor(bytes) {
    this.windows = this.getWindowsStates(bytes);
  }

  getWindowsStates(bytes) {
    const windows = {};
    const windowsCount = bytes[3];

    const positions = {
      0: 'front_left',
      1: 'front_right',
      2: 'rear_right',
      3: 'rear_left',
    };

    for (let i = 0; i < windowsCount; i++) {
      const pos = 4 + 2 * i;

      windows[positions[bytes[pos]]] = {
        openClosed: this.getPositionValue(bytes[pos + 1]),
      };
    }

    return windows;
  }

  getPositionValue(byte) {
    return byte === 0x00 ? 'closed' : 'open';
  }
}
