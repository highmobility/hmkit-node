import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';

const hmkit = getHmkit();

describe(`WindscreenCommand`, () => {
  it(`should get windscreen states`, async () => {
    const bytes = hmkit.commands.WindscreenCommand.getState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);
  });

  it('should set windscreen damage', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindscreenCommand.setDamage(
        'damage_smaller_than_1_inch',
        2,
        3,
        'replacement_needed'
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);
    expect(response.parse()).toEqual({
      windscreenDamage: 'damage_smaller_than_1_inch',
      windscreenDamageZone: {
        rows: 2,
        columns: 3,
      },
      windscreenNeedsReplacement: 'replacement_needed',
    });
  });
});
