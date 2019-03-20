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
      dimming: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      position: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      convertibleRoof: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      sunroofTilt: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      sunroofState: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
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
      dimming: {
        value: 0.2,
        timestamp: expect.any(Date),
      },
      position: {
        value: 0.3,
        timestamp: expect.any(Date),
      },
      convertibleRoof: {
        value: 'closed_secured',
        timestamp: expect.any(Date),
      },
      sunroofTilt: {
        value: 'tilted',
        timestamp: expect.any(Date),
      },
      sunroofState: {
        value: 'open',
        timestamp: expect.any(Date),
      },
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
      dimming: {
        value: newDimming,
        timestamp: expect.any(Date),
      },
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
      position: {
        value: newPosition,
        timestamp: expect.any(Date),
      },
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
      convertibleRoof: {
        value: newRoofState,
        timestamp: expect.any(Date),
      },
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
      sunroofTilt: {
        value: newSunroofTilt,
        timestamp: expect.any(Date),
      },
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
      sunroofState: {
        value: newSunroofState,
        timestamp: expect.any(Date),
      },
    });
  });
});
