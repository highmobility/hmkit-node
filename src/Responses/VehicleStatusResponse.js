import PropertyResponse from '../PropertyResponse';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import Response from './Response';
import CapabilityPropertyDecoder from '../CapabilityPropertyDecoder';
import PropertyDecoder from '../PropertyDecoder';
import { bytesSum, getRoundedIeee754ToBase10, switchDecoder } from '../helpers';
import { bytesToString } from '../encoding';
import CAPABILITY_IDENTIFIERS from '../CAPABILITY_IDENTIFIERS';

export default class VehicleStatusResponse extends PropertyResponse {
  static identifier = [0x00, 0x11];

  /**
   * @property {String} vin (string) The unique Vehicle Identification Number
   * @property {String} powertrain (string 'unknown|all_electric|combustion_engine|phev|hydrogen|hydrogen_hybrid') Powertrain
   * @property {String} modelName (string) Model name
   * @property {String} name (string) Car's name
   * @property {String} licensePlate (string) License plate
   * @property {String} salesDesignation (string) Sales designation
   * @property {Number} modelYear (number) Model year
   * @property {String} colorName (string) Color name
   * @property {Number} powerInKw (number) Power in kw
   * @property {Number} numberOfDoors (number) Number of doors
   * @property {Number} numberOfSeats (number) Number of seats
   * @property {Number} engineVolume (number) The engine volume displacement in liters
   * @property {Number} engineMaxTorque (number) The maximum engine torque in Nm
   * @property {String} gearbox (string 'manual|automatic|semi_automatic') Gearbox
   * @property {String} displayUnit (string 'km|miles') Display unit
   * @property {String} driverSeatLocation (string 'left|right|center') Driver seat location
   * @property {String} equipments (array) List of equipments
   * @property {String} brand (string) Brand name
   * @property {String} states (array '{capabilityIdentifier: (string), state: (object)}') Capability states
   *
   * @example VehicleStatusResponse
    {
      vin: 'JF2SHBDC7CH451869',
      powertrain: 'all_electric',
      modelName: 'Type X',
      name: 'My Car',
      licensePlate: 'ABC123',
      salesDesignation: 'Package+',
      modelYear: 2017,
      colorName: 'Estoril Blau',
      powerInKw: 220,
      numberOfDoors: 5,
      numberOfSeats: 5,
      engineVolume: 4395,
      engineMaxTorque: 520,
      gearbox: 'semi_automatic',
      displayUnit: 'km',
      driverSeatLocation: 'left',
      equipments: ['side skirts', 'front apron', 'rear apron'],
      brand: 'Mercedes',
      states: [
        {
          capabilityIdentifier: 'trunk',
          state: {
            trunkLock: 'unlocked',
            trunkPosition: 'open',
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: 100,
            position: 0,
          },
        },
      ],
    }
   */

  constructor(data: Uint8Array) {
    super();

    const properties = [
      new PropertyDecoder(0x01, 'vin').setDecoder(bytesToString),
      new PropertyDecoder(0x02, 'powertrain').setDecoder(
        switchDecoder({
          0x00: 'unknown',
          0x01: 'all_electric',
          0x02: 'combustion_engine',
          0x03: 'phev',
          0x04: 'hydrogen',
          0x05: 'hydrogen_hybrid',
        })
      ),
      new PropertyDecoder(0x03, 'modelName').setDecoder(bytesToString),
      new PropertyDecoder(0x04, 'name').setDecoder(bytesToString),
      new PropertyDecoder(0x05, 'licensePlate').setDecoder(bytesToString),
      new PropertyDecoder(0x06, 'salesDesignation').setDecoder(bytesToString),
      new PropertyDecoder(0x07, 'modelYear').setDecoder(bytesSum),
      new PropertyDecoder(0x08, 'colorName').setDecoder(bytesToString),
      new PropertyDecoder(0x09, 'powerInKw').setDecoder(bytesSum),
      new PropertyDecoder(0x0a, 'numberOfDoors').setDecoder(bytesSum),
      new PropertyDecoder(0x0b, 'numberOfSeats').setDecoder(bytesSum),
      new PropertyDecoder(0x0c, 'engineVolume').setDecoder(
        getRoundedIeee754ToBase10(2)
      ),
      new PropertyDecoder(0x0d, 'engineMaxTorque').setDecoder(bytesSum),
      new PropertyDecoder(0x0e, 'gearbox').setDecoder(
        switchDecoder({
          0x00: 'manual',
          0x01: 'automatic',
          0x02: 'semi_automatic',
        })
      ),
      new PropertyDecoder(0x0f, 'displayUnit').setDecoder(
        switchDecoder({
          0x00: 'km',
          0x01: 'miles',
        })
      ),
      new PropertyDecoder(0x10, 'driverSeatLocation').setDecoder(
        switchDecoder({
          0x00: 'left',
          0x01: 'right',
          0x02: 'center',
        })
      ),
      new PropertyDecoder(0x11, 'equipments').array().setDecoder(bytesToString),
      new PropertyDecoder(0x12, 'brand').setDecoder(bytesToString),
      new CapabilityPropertyDecoder(0x99, 'states').setOptionalSubProperties(
        'capabilityIdentifier',
        Object.entries(CAPABILITY_IDENTIFIERS).map(([name, { identifier }]) => {
          return new OptionalPropertyDecoder(identifier, name).setDecoder(
            this.getCapabilityStateDecoder(identifier)
          );
        })
      ),
    ];

    this.parse(data, properties);
  }

  getCapabilityStateDecoder(identifier) {
    return bytes => ({
      state: new Response([...identifier, ...bytes]).parse(),
    });
  }
}
