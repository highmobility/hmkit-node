import { bytesToString, hexToInt, uint8ArrayToHex } from '../encoding';

export default class ParkingTicketResponse {
  static identifier = [0x00, 0x47];

  constructor(bytes, vehicleState = false) {
    if (vehicleState) {
      this.getVehicleState(bytes);
    } else {
      this.getValues(bytes);
    }
  }

  getValues(bytes) {
    this.state = this.getState(bytes);
    this.operatorName = this.getOperatorName(bytes);
    this.operatorTicketID = this.getOperatorTicketID(bytes);

    const datesStartIdx =
      6 + this.getOperatorNameSize(bytes) + this.getOperatorTicketIDSize(bytes);

    this.startDate = this.getDate(bytes, datesStartIdx);
    this.endDate = this.getDate(bytes, datesStartIdx + 5);
  }

  getVehicleState(bytes) {
    const nameSize = this.getOperatorNameSize(bytes);
    const ticketSize = this.getOperatorTicketIDSize(bytes);

    if (bytes[2] === 13 + nameSize + ticketSize) {
      this.getValues(bytes);
    } else {
      this.error = 'invalid state size';
    }
  }

  getOperatorName(bytes) {
    const nameBytes = bytes.slice(5, 5 + this.getOperatorNameSize(bytes));

    return bytesToString(nameBytes);
  }

  getOperatorNameSize(bytes) {
    return bytes[4];
  }

  getOperatorTicketID(bytes) {
    const nameSize = this.getOperatorNameSize(bytes);
    const idSize = this.getOperatorTicketIDSize(bytes);
    const idStart = 6 + nameSize;
    const idBytes = bytes.slice(idStart, idStart + idSize);

    return hexToInt(uint8ArrayToHex(idBytes));
  }

  getOperatorTicketIDSize(bytes) {
    return bytes[5 + this.getOperatorNameSize(bytes)];
  }

  getDate(bytes, idx) {
    let year = 0;

    if (bytes[idx] !== 0x00) {
      year = 2000;
    }

    return {
      year: year + bytes[idx],
      month: bytes[idx + 1],
      day: bytes[idx + 2],
      hour: bytes[idx + 3],
      minute: bytes[idx + 4],
    };
  }

  getState(bytes) {
    return bytes[3] === 0x00 ? 'ended' : 'started';
  }
}
