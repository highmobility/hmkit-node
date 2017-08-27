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
  });

  it(`should unlock trunk and leave it closed`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.unlock()
    );

    expect(response.parse()).toEqual(
      expect.objectContaining({
        lock: 'unlocked',
        position: 'closed',
      })
    );
  });

  it(`should open trunk`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.open()
    );

    expect(response.parse()).toEqual(
      expect.objectContaining({
        lock: 'unlocked',
        position: 'open',
      })
    );
  });

  it(`should close trunk`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.close()
    );

    expect(response.parse()).toEqual(
      expect.objectContaining({
        lock: 'unlocked',
        position: 'closed',
      })
    );
  });

  it(`should lock trunk`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TrunkAccessCommand.lock()
    );

    expect(response.parse()).toEqual(
      expect.objectContaining({
        lock: 'locked',
        position: 'closed',
      })
    );
  });
});
