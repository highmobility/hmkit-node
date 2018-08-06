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
    expect(response.parse()).toEqual(
      expect.objectContaining({
        windscreenDamage: 'damage_smaller_than_1_inch',
        windscreenDamageZone: {
          rows: 2,
          columns: 3,
        },
        windscreenNeedsReplacement: 'replacement_needed',
      })
    );
  });

  it(`should return correct damage byte`, () => {
    expect(
      hmkit.commands.WindscreenCommand.getDamageByte(
        'impact_but_no_damage_detected'
      )
    ).toEqual(0x01);

    expect(
      hmkit.commands.WindscreenCommand.getDamageByte(
        'damage_smaller_than_1_inch'
      )
    ).toEqual(0x02);

    expect(
      hmkit.commands.WindscreenCommand.getDamageByte(
        'damage_larger_than_1_inch'
      )
    ).toEqual(0x03);

    expect(hmkit.commands.WindscreenCommand.getDamageByte('u_wot_m8')).toEqual(
      0x00
    );
  });

  it(`should return correct replacement byte`, () => {
    expect(
      hmkit.commands.WindscreenCommand.getNeedReplacementByte('no')
    ).toEqual(0x01);

    expect(
      hmkit.commands.WindscreenCommand.getNeedReplacementByte(
        'no_replacement_needed'
      )
    ).toEqual(0x01);

    expect(
      hmkit.commands.WindscreenCommand.getNeedReplacementByte('yes')
    ).toEqual(0x02);

    expect(
      hmkit.commands.WindscreenCommand.getNeedReplacementByte(
        'replacement_needed'
      )
    ).toEqual(0x02);

    expect(
      hmkit.commands.WindscreenCommand.getNeedReplacementByte('u_wot_m8')
    ).toEqual(0x00);
  });
});
