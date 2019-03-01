import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';

const hmkit = getHmkit();

describe(`WindscreenCommand`, () => {
  it(`should get windscreen states`, async () => {
    const bytes = hmkit.commands.WindscreenCommand.getState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: { data: expect.any(String) },
      wipersIntensity: { data: expect.any(String) },
      windscreenDamage: { data: expect.any(String) },
      windscreenZoneMatrix: {
        data: {
          rows: expect.any(Number),
          columns: expect.any(Number),
        },
      },
      windscreenDamageZone: {
        data: {
          rows: expect.any(Number),
          columns: expect.any(Number),
        },
      },
      windscreenNeedsReplacement: { data: expect.any(String) },
      windscreenDamageConfidence: { data: expect.any(Number) },
      windscreenDamageDetectionTime: { data: expect.any(Date) },
    });
  });

  it('should set windscreen damage', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindscreenCommand.setDamage(
        'damage_smaller_than_1_inch',
        2,
        3
      )
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        windscreenDamage: { data: 'damage_smaller_than_1_inch' },
        windscreenDamageZone: {
          data: {
            rows: 2,
            columns: 3,
          },
        },
      })
    );
  });

  it('should set windscreen replacement', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindscreenCommand.setReplacement('replacement_needed')
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        windscreenNeedsReplacement: { data: 'replacement_needed' },
      })
    );
  });

  it('should control windscreen wipers without intensity', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindscreenCommand.controlWipers('automatic')
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        wipers: { data: 'automatic' },
      })
    );
  });

  it('should control windscreen wipers with intensity', async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindscreenCommand.controlWipers('active', 'level_3')
    );

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        wipers: { data: 'active' },
        wipersIntensity: { data: 'level_3' },
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

  it(`should return correct wipers state byte`, () => {
    expect(
      hmkit.commands.WindscreenCommand.getWiperStateByte('inactive')
    ).toEqual(0x00);

    expect(
      hmkit.commands.WindscreenCommand.getWiperStateByte('active')
    ).toEqual(0x01);

    expect(
      hmkit.commands.WindscreenCommand.getWiperStateByte('automatic')
    ).toEqual(0x02);
  });

  it(`should return correct wipers intensity byte`, () => {
    expect(
      hmkit.commands.WindscreenCommand.getWipersIntensityByte('level_0')
    ).toEqual(0x00);

    expect(
      hmkit.commands.WindscreenCommand.getWipersIntensityByte('level_1')
    ).toEqual(0x01);

    expect(
      hmkit.commands.WindscreenCommand.getWipersIntensityByte('level_2')
    ).toEqual(0x02);

    expect(
      hmkit.commands.WindscreenCommand.getWipersIntensityByte('level_3')
    ).toEqual(0x03);
  });
});
