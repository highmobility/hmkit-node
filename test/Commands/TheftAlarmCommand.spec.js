import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import TheftAlarmResponse from '../../src/Responses/TheftAlarmResponse';
const hmkit = getHmkit();

describe(`TheftAlarmCommand`, () => {
  it(`should get state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TheftAlarmCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
  });

  it(`should unarm the alarm`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TheftAlarmCommand.unarm()
    );

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response.parse()).toEqual({
      theftAlarm: 'not_armed',
    });
  });

  it(`should arm the alarm`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TheftAlarmCommand.arm()
    );

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response.parse()).toEqual({
      theftAlarm: 'armed',
    });
  });

  it(`should trigger the alarm`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.TheftAlarmCommand.trigger()
    );

    expect(response.parse()).toBeInstanceOf(TheftAlarmResponse);
    expect(response.parse()).toEqual({
      theftAlarm: 'triggered',
    });
  });
});
