import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import CapabilitiesResponse from '../../src/Responses/CapabilitiesResponse';

const hmkit = getHmkit();

describe(`CapabilitiesCommand`, () => {
  it(`should get capabilities`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.CapabilitiesCommand.get()
    );
    expect(response.parse()).toBeInstanceOf(CapabilitiesResponse);
  });

  it(`should throw error on invalid length data`, async () => {
    const invalidResponseBytes = new Uint8Array(
      '0,16,1,22,0,73,1,1,0,35,1,1,0,36,2,1,1,0,51,1,1,0,32,1,1'.split(',')
    );
    const capabilitiesResponse = new CapabilitiesResponse(invalidResponseBytes);
    console.log('capabilitiesResponse', capabilitiesResponse);
    expect(capabilitiesResponse.error).toBeDefined();
  });

  it(`should throw error on invalid capability data`, async () => {
    // Invalid capability configuration length
    const invalidBytes1 = new Uint8Array(
      '0,16,1,5,0,73,2,1,0,35,1,1,0,36,2,1,1,0,51,1,1,0,32,1,1'.split(',')
    );
    const invalidResponse1 = new CapabilitiesResponse(invalidBytes1);
    expect(invalidResponse1.error).toBeDefined();

    // Invalid capability lsb
    const invalidBytes2 = new Uint8Array(
      '0,16,1,5,0,250,1,1,0,35,1,1,0,36,2,1,1,0,51,1,1,0,32,1,1'.split(',')
    );
    const invalidResponse2 = new CapabilitiesResponse(invalidBytes2);
    expect(invalidResponse2.error).toBeDefined();

    // Invalid capability availability
    const invalidBytes3 = new Uint8Array(
      '0,16,1,5,0,73,1,5,0,35,1,5,0,36,2,1,1,0,51,1,1,0,32,1,1'.split(',')
    );
    const invalidResponse3 = new CapabilitiesResponse(invalidBytes3);
    expect(invalidResponse3.error).toBeDefined();
  });
});
