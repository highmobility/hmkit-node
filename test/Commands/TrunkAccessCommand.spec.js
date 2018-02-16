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
      trunkLock: expect.any(String),
      trunkPosition: expect.any(String),
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
        trunkLock: 'unlocked',
        trunkPosition: expect.any(String),
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
        trunkLock: 'unlocked',
        trunkPosition: 'open',
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
        trunkLock: expect.any(String),
        trunkPosition: 'closed',
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
        trunkLock: 'locked',
        trunkPosition: expect.any(String),
      })
    );
  });
});
