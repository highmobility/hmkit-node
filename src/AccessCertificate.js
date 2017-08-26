import {
  base64ToUint8,
  uint8ArrayToHex,
  hexToInt,
  hexToUint8Array,
} from './encoding';
import Permissions from './Permissions';

export default class AccessCertificate {
  constructor(bytes: Uint8Array) {
    this.bytes = bytes;
    this.rawAccessCertificate = this.parse(bytes);
    this.accessGainingSerialNumber = this.getVehicleSerial();
    this.accessGainingPublicKey = this.getVehiclePublicKey();
    this.accessProvidingSerialNumber = this.getClientSerial();
    this.validityStartDate = this.getValidityStartDate();
    this.validityEndDate = this.getValidityEndDate();
    this.permissions = this.rawAccessCertificate.permissions;
    this.signature = this.rawAccessCertificate.signature;
    this.accessCertificate = this.get();
  }

  parse(bytes: Uint8Array) {
    const permissionsSize = uint8ArrayToHex(bytes.slice(92, 93)).toUpperCase();

    return {
      accessGainingSerialNumber: uint8ArrayToHex(
        bytes.slice(0, 9)
      ).toUpperCase(),
      accessGainingPublicKey: uint8ArrayToHex(bytes.slice(9, 73)).toUpperCase(),
      accessProvidingSerialNumber: uint8ArrayToHex(
        bytes.slice(73, 82)
      ).toUpperCase(),
      validityStartDate: uint8ArrayToHex(bytes.slice(82, 87)).toUpperCase(),
      validityEndDate: uint8ArrayToHex(bytes.slice(87, 92)).toUpperCase(),
      permissionsSize,
      permissions: uint8ArrayToHex(
        bytes.slice(93, 93 + hexToInt(permissionsSize))
      ).toUpperCase(),
      signature: uint8ArrayToHex(
        bytes.slice(
          93 + hexToInt(permissionsSize),
          93 + hexToInt(permissionsSize) + 64
        )
      ).toUpperCase(),
    };
  }

  get() {
    return {
      accessGainingSerialNumber: this.accessGainingSerialNumber,
      accessGainingPublicKey: this.accessGainingPublicKey,
      accessProvidingSerialNumber: this.accessProvidingSerialNumber,
      validityStartDate: this.validityStartDate,
      validityEndDate: this.validityEndDate,
      permissions: this.permissions,
    };
  }

  getVehicleSerial() {
    return this.rawAccessCertificate.accessGainingSerialNumber;
  }

  getVehiclePublicKey() {
    return this.rawAccessCertificate.accessGainingPublicKey;
  }

  getClientSerial() {
    return this.rawAccessCertificate.accessProvidingSerialNumber;
  }

  isDateValid(date: string) {
    const [year, month, day, hour, minute] = hexToUint8Array(date);

    if (year > 99) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if (hour > 23) return false;
    if (minute > 59) return false;

    return true;
  }

  getValidityStartDate() {
    if (!this.isDateValid(this.rawAccessCertificate.validityStartDate)) {
      throw new Error('Start date is not valid.');
    }

    const [year, month, day, hour, minute] = hexToUint8Array(
      this.rawAccessCertificate.validityStartDate
    );

    return new Date(`20${year}`, month, day, hour, minute);
  }

  getValidityEndDate() {
    if (!this.isDateValid(this.rawAccessCertificate.validityEndDate)) {
      throw new Error('End date is not valid.');
    }

    const [year, month, day, hour, minute] = hexToUint8Array(
      this.rawAccessCertificate.validityEndDate
    );

    return new Date(`20${year}`, month, day, hour, minute);
  }

  getPermissions() {
    return new Permissions(
      base64ToUint8(this.rawAccessCertificate.permissions)
    );
  }
}
