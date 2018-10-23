import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import RooftopControlResponse from '../../src/Responses/RooftopControlResponse';
const hmkit = getHmkit();

describe(`RooftopControlCommand`, () => {
  it(`should get rooftop state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: expect.any(Number),
      position: expect.any(Number),
      convertibleRoof: expect.any(String),
      sunroofTilt: expect.any(String),
    });
  });

  it(`should control rooftop`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(
        22,
        33,
        'closed_secured',
        'tilted'
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: 22,
      position: 33,
      convertibleRoof: 'closed_secured',
      sunroofTilt: 'tilted',
    });
  });

  it('should control dimming separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    )).parse();
    // Ensure new value is different from old
    const newDimming = oldData.dimming >= 99 ? 1 : oldData.dimming + 1;

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(newDimming)
    );

    expect(response.parse()).toEqual({
      dimming: newDimming,
      position: oldData.position,
      convertibleRoof: oldData.convertibleRoof,
      sunroofTilt: oldData.sunroofTilt,
    });
  });

  it('should control position separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    )).parse();
    // Ensure new value is different from old
    const newPosition = oldData.position >= 99 ? 1 : oldData.position + 1;

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(undefined, newPosition)
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: oldData.dimming,
      position: newPosition,
      convertibleRoof: oldData.convertibleRoof,
      sunroofTilt: oldData.sunroofTilt,
    });
  });
});
