export default class WindowsResponse {
  static identifier = [0x00, 0x45];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      Object.assign(this, this.getWindowsStates(bytes));
    }
  }

  getVehicleState(bytes) {
    const windowsCount = bytes[3];

    if (bytes[2] === 1 + windowsCount * 2) {
      Object.assign(this, this.getWindowsStates(bytes));
    } else {
      this.error = 'invalid state size';
    }
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
