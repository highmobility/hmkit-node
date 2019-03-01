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
      dimming: { data: expect.any(Number) },
      position: { data: expect.any(Number) },
      convertibleRoof: { data: expect.any(String) },
      sunroofTilt: { data: expect.any(String) },
      sunroofState: { data: expect.any(String) },
    });
  });

  it(`should control rooftop`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(
        0.2,
        0.3,
        'closed_secured',
        'tilted',
        'open'
      )
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: { data: 0.2 },
      position: { data: 0.3 },
      convertibleRoof: { data: 'closed_secured' },
      sunroofTilt: { data: 'tilted' },
      sunroofState: { data: 'open' },
    });
  });

  it('should control dimming separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    )).parse();
    // Ensure new value is different from old
    const newDimming = Number(
      (oldData.dimming.data >= 0.99
        ? 0.01
        : oldData.dimming.data + 0.01
      ).toFixed(2)
    );

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(newDimming)
    );

    expect(response.parse()).toEqual({
      dimming: { data: newDimming },
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
    const newPosition =
      oldData.position.data >= 0.99 ? 0.01 : oldData.position.data + 0.01;

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.control(undefined, newPosition)
    );

    expect(response.parse()).toBeInstanceOf(RooftopControlResponse);
    expect(response.parse()).toEqual({
      dimming: oldData.dimming,
      position: { data: newPosition },
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

    const newRoofState =
      oldData.convertibleRoof.data === 'open' ? 'closed' : 'open';

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
      convertibleRoof: { data: newRoofState },
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
      oldData.convertibleRoof.data === 'closed' ? 'tilted' : 'closed';

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
      sunroofTilt: { data: newSunroofTilt },
      sunroofState: oldData.sunroofState,
    });
  });

  it('should control sunroof state separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.RooftopControlCommand.getState()
    )).parse();

    const newSunroofState =
      oldData.sunroofState.data === 'closed' ? 'open' : 'closed';

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
      sunroofState: { data: newSunroofState },
    });
  });
});
