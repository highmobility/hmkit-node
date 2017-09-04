import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import TheftAlarmResponse from '../../src/Responses/TheftAlarmResponse';
const hmkit = getHmkit();

describe(`TheftAlarmCommand`, () => {
  it(`should get state`, async () => {
    const command = hmkit.commands.TheftAlarmCommand.getState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe('004600');

    // Waiting for the emulator
    //    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
  });

  it(`should unarm the alarm`, async () => {
    const command = hmkit.commands.TheftAlarmCommand.unarm();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe('00460200');

    // Waiting for the emulator
    //    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
  });

  it(`should arm the alarm`, async () => {
    const command = hmkit.commands.TheftAlarmCommand.arm();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe('00460201');

    // Waiting for the emulator
    //    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
  });

  it(`should trigger the alarm`, async () => {
    const command = hmkit.commands.TheftAlarmCommand.triggerAlarm();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, command);

    expect(command.toString()).toBe('00460202');

    // Waiting for the emulator
    //    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
  });
});
