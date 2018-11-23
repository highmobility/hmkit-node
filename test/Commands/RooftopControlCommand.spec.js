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
      sunroofState: expect.any(String),
    });
  });

  it(`should control rooftop`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(
        22,
        33,
        'closed_secured',
        'tilted',
        'open'
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: 22,
      position: 33,
      convertibleRoof: 'closed_secured',
      sunroofTilt: 'tilted',
      sunroofState: 'open',
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
      sunroofState: oldData.sunroofState,
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
      sunroofState: oldData.sunroofState,
    });
  });

  it('should control convertible roof separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    )).parse();

    const newRoofState = oldData.convertibleRoof === 'open' ? 'closed' : 'open';

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(
        undefined,
        undefined,
        newRoofState
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: oldData.dimming,
      position: oldData.position,
      convertibleRoof: newRoofState,
      sunroofTilt: oldData.sunroofTilt,
      sunroofState: oldData.sunroofState,
    });
  });

  it('should control sunroof tilt separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    )).parse();

    const newSunroofTilt =
      oldData.convertibleRoof === 'closed' ? 'tilted' : 'closed';

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(
        undefined,
        undefined,
        undefined,
        newSunroofTilt
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);

    expect(response.parse()).toEqual({
      dimming: oldData.dimming,
      position: oldData.position,
      convertibleRoof: oldData.convertibleRoof,
      sunroofTilt: newSunroofTilt,
      sunroofState: oldData.sunroofState,
    });
  });

  it('should control sunroof state separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    )).parse();

    const newSunroofState =
      oldData.sunroofState === 'closed' ? 'open' : 'closed';

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(
        undefined,
        undefined,
        undefined,
        undefined,
        newSunroofState
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);

    expect(response.parse()).toEqual({
      dimming: oldData.dimming,
      position: oldData.position,
      convertibleRoof: oldData.convertibleRoof,
      sunroofTilt: oldData.sunroofTilt,
      sunroofState: newSunroofState,
    });
  });
});
