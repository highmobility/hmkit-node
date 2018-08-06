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

  it(`should ignore invalid properties`, async () => {
    const invalidResponseBytes = new Uint8Array(
      `0,16,1,1,0,5,0,32,0,1,2,1,0,5,0,33,0,1,2,1,0,6,0,35,0,1,2,3,1,0,8,0,36,0,1,2,3,4,5,6,1,0,5,0,37,0,1,2,1,0,6,0,38,0,1,2,3,1,0,7,0,39,0,1,2,3,4,1,0,5,0,40,0,1,2,1,0,3,0,41,2,1,0,4,0,48,0,1,1,0,5,0,49,0,1,2`.split(
        ','
      )
    );

    const capabilitiesResponse = new CapabilitiesResponse(invalidResponseBytes);

    expect(
      capabilitiesResponse.capabilities.find(
        c => c.capabilityIdentifier === 'rooftop_control'
      )
    ).toBeUndefined();

    expect(
      capabilitiesResponse.capabilities.find(
        c => c.capabilityIdentifier === 'climate'
      )
    ).toBeDefined();
  });
});
