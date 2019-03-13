import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import FuelingResponse from '../../src/Responses/FuelingResponse';
const hmkit = getHmkit();

describe(`FuelingCommand`, () => {
  it(`should get fueling state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(FuelingResponse);
    expect(response.parse()).toEqual({
      gasFlapLock: { value: expect.any(String) },
      gasFlapPosition: { value: expect.any(String) },
    });
  });

  it('should control gas flap', async () => {
    await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap('unlocked', 'closed')
    );

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap('locked', 'opened')
    );
    expect(response.parse()).toBeInstanceOf(FuelingResponse);
    expect(response.parse()).toEqual({
      gasFlapLock: { value: 'locked' },
      gasFlapPosition: { value: 'opened' },
    });
  });

  it(`should control gas flap lock separately`, async () => {
    await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap('unlocked')
    );

    const lockedResponse = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap('locked')
    );
    expect(lockedResponse.parse()).toBeInstanceOf(FuelingResponse);
    expect(lockedResponse.parse()).toEqual({
      gasFlapLock: { value: 'locked' },
      gasFlapPosition: { value: expect.any(String) },
    });

    const unlockedResponse = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap('unlocked')
    );
    expect(unlockedResponse.parse()).toBeInstanceOf(FuelingResponse);
    expect(unlockedResponse.parse()).toEqual({
      gasFlapLock: { value: 'unlocked' },
      gasFlapPosition: { value: expect.any(String) },
    });
  });

  it(`should control gas flap position separately`, async () => {
    await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap(undefined, 'opened')
    );

    const closedResponse = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap(undefined, 'closed')
    );
    expect(closedResponse.parse()).toBeInstanceOf(FuelingResponse);
    expect(closedResponse.parse()).toEqual({
      gasFlapLock: { value: expect.any(String) },
      gasFlapPosition: { value: 'closed' },
    });

    const openedResponse = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap(undefined, 'opened')
    );
    expect(openedResponse.parse()).toBeInstanceOf(FuelingResponse);
    expect(openedResponse.parse()).toEqual({
      gasFlapLock: { value: expect.any(String) },
      gasFlapPosition: { value: 'opened' },
    });

    const intermediateResponse = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.FuelingCommand.controlGasFlap(undefined, 'intermediate')
    );
    expect(intermediateResponse.parse()).toBeInstanceOf(FuelingResponse);
    expect(intermediateResponse.parse()).toEqual({
      gasFlapLock: { value: expect.any(String) },
      gasFlapPosition: { value: 'intermediate' },
    });
  });
});
