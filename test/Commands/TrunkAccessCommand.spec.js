import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import TrunkAccessResponse from '../../src/Responses/TrunkAccessResponse';
const hmkit = getHmkit();

describe(`TrunkAccessCommand`, () => {
  it(`should get trunk state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual({
      trunkLock: { value: expect.any(String) },
      trunkPosition: { value: expect.any(String) },
    });
  });

  it(`should unlock trunk`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.unlock()
    );

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        trunkLock: { value: 'unlocked' },
        trunkPosition: { value: expect.any(String) },
      })
    );
  });

  it(`should open trunk`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.open()
    );

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        trunkLock: { value: 'unlocked' },
        trunkPosition: { value: 'open' },
      })
    );
  });

  it(`should close trunk`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.close()
    );

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        trunkLock: { value: expect.any(String) },
        trunkPosition: { value: 'closed' },
      })
    );
  });

  it(`should lock trunk`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.lock()
    );

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        trunkLock: { value: 'locked' },
        trunkPosition: { value: expect.any(String) },
      })
    );
  });

  it(`should control trunk`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.controlTrunk(true, true)
    );

    expect(response.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        trunkLock: { value: 'locked' },
        trunkPosition: { value: 'open' },
      })
    );

    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.controlTrunk(false, false)
    );

    expect(response2.parse()).toBeInstanceOf(TrunkAccessResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        trunkLock: { value: 'unlocked' },
        trunkPosition: { value: 'closed' },
      })
    );
  });
});
