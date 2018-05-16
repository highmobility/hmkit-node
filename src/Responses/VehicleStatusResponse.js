import PropertyResponse from '../PropertyResponse';
import OptionalProperty from '../OptionalProperty';
import Response from './Response';
import CapabilityProperty from '../CapabilityProperty';
import Property from '../Property';
import {
  bytesSum,
  dateDecoder,
  getRoundedIeee754ToBase10,
  switchDecoder,
  progressDecoder,
} from '../helpers';
import { bytesToString } from '../encoding';
import CAPABILITY_IDENTIFIERS from '../CAPABILITY_IDENTIFIERS';

export default class VehicleStatusResponse extends PropertyResponse {
  static identifier = [0x00, 0x11];

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'vin').setDecoder(bytesToString),
      new Property(0x02, 'powertrain').setDecoder(
        switchDecoder({
          0x00: 'unknown',
          0x01: 'all_electric',
          0x02: 'combustion_engine',
          0x03: 'phev',
          0x04: 'hydrogen',
          0x05: 'hydrogen_hybrid',
        })
      ),
      new Property(0x03, 'modelName').setDecoder(bytesToString),
      new Property(0x04, 'name').setDecoder(bytesToString),
      new Property(0x05, 'licensePlate').setDecoder(bytesToString),
      new Property(0x06, 'salesDesignation').setDecoder(bytesToString),
      new Property(0x07, 'modelYear').setDecoder(bytesSum),
      new Property(0x08, 'colorName').setDecoder(bytesToString),
      new Property(0x09, 'powerInKw').setDecoder(bytesSum),
      new Property(0x0a, 'numberOfDoors').setDecoder(bytesSum),
      new Property(0x0b, 'numberOfSeats').setDecoder(bytesSum),
      new Property(0x0c, 'engineVolume').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new Property(0x0d, 'engineMaxTorque').setDecoder(bytesSum),
      new Property(0x0e, 'gearbox').setDecoder(
        switchDecoder({
          0x00: 'manual',
          0x01: 'automatic',
          0x02: 'semi_automatic',
        })
      ),
      new CapabilityProperty(0x99, 'states').setOptionalSubProperties(
        'capabilityIdentifier',
        Object.entries(CAPABILITY_IDENTIFIERS).map(([name, { identifier }]) => {
          return new OptionalProperty(identifier, name).setDecoder(
            this.getCapabilityStateDecoder(identifier)
          );
        })
      ),
    ];

    this.parse(data, properties);
  }

  getCapabilityStateDecoder(identifier) {
    return bytes => {
      return { state: new Response([...identifier, ...bytes]).parse() };
    };
  }
}
