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
});
