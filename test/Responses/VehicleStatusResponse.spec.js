import Response from '../../src/Responses/Response';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleStatusResponse`, () => {
  it(`should return VehicleStatusResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '0011010100114a46325348424443374348343531383639020001010300065479706520580400064d79204361720500064142433132330600085061636B6167652B07000207E108000C4573746f72696c20426c617509000200DC0A0001050B0001050C0004458958000D000202080E00010299000B00210101000100020001019900130025010100016402000100'
      )
    );

    expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);
    expect(response.parse()).toEqual({
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
    });
  });
});
