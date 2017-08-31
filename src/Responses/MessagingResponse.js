import { bytesToString, hexToInt } from '../encoding';

export default class MessagingResponse {
  static identifier = [0x00, 0x37];

    constructor(bytes) {
        this.handle = this.getHandle(bytes);
        this.text = this.getText(bytes);
    }

    getHandleSize(bytes) {
        return bytes[3];
    }

    getHandle(bytes) {
        const handleBytes = bytes.slice(4, 4 + this.getHandleSize(bytes));

        return bytesToString(handleBytes);
    }

    getText(bytes) {
        const handleSize = this.getHandleSize(bytes);
        const textSize = (bytes[4 + handleSize] << 8) + bytes[5 + handleSize];
        const textStart = 6 + handleSize;
        const textBytes = bytes.slice(textStart, textStart + textSize);

        return bytesToString(textBytes);
    }
}
