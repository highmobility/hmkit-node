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
    const bytes = hmkit.commands.WindscreenCommand.setState(
      'no_impact_occured',
      4,
      1,
      'yes'
    );
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    const bytes2 = hmkit.commands.WindscreenCommand.setState(
      'damage_larger_than_1_inch',
      4,
      3,
      'no'
    );
    const response2 = await hmkit.telematics.sendCommand(vehicleSerial, bytes2);

    expect(response2.parse()).toBeInstanceOf(WindscreenResponse);

    const bytes3 = hmkit.commands.WindscreenCommand.setState(
      'damage_smaller_than_1_inch',
      1,
      2,
      'unknown'
    );
    const response3 = await hmkit.telematics.sendCommand(vehicleSerial, bytes3);

    expect(response3.parse()).toBeInstanceOf(WindscreenResponse);

    const bytes4 = hmkit.commands.WindscreenCommand.setState(
      'no_damage',
      2,
      2,
      'no'
    );
    const response4 = await hmkit.telematics.sendCommand(vehicleSerial, bytes4);

    expect(response4.parse()).toBeInstanceOf(WindscreenResponse);
  });
});
