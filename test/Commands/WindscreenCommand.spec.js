import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import WindscreenResponse from '../../src/Responses/WindscreenResponse';

const hmkit = getHmkit();

describe(`WindscreenCommand`, () => {
  it(`should get windscreen states`, async () => {
    const bytes = hmkit.commands.WindscreenCommand.getState();
    const response = await hmkit.telematics.sendCommand(vehicleSerial, bytes);

    expect(response.parse()).toBeInstanceOf(WindscreenResponse);

    expect(response.parse()).toEqual({
      wipers: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      wipersIntensity: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      windscreenDamage: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      windscreenZoneMatrix: {
        value: {
          rows: expect.any(Number),
          columns: expect.any(Number),
        },
        timestamp: expect.any(Date),
      },
      windscreenDamageZone: {
        value: {
          rows: expect.any(Number),
          columns: expect.any(Number),
        },
        timestamp: expect.any(Date),
      },
      windscreenNeedsReplacement: {
        value: expect.any(String),
        timestamp: expect.any(Date),
      },
      windscreenDamageConfidence: {
        value: expect.any(Number),
        timestamp: expect.any(Date),
      },
      windscreenDamageDetectionTime: {
        value: expect.any(Date),
        timestamp: expect.any(Date),
      },
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
        windscreenDamage: {
          value: 'damage_smaller_than_1_inch',
          timestamp: expect.any(Date),
        },
        windscreenDamageZone: {
          value: {
            rows: 2,
            columns: 3,
          },
          timestamp: expect.any(Date),
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
        windscreenNeedsReplacement: {
          value: 'replacement_needed',
          timestamp: expect.any(Date),
        },
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
        wipers: {
          value: 'automatic',
          timestamp: expect.any(Date),
        },
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
        wipers: {
          value: 'active',
          timestamp: expect.any(Date),
        },
        wipersIntensity: {
          value: 'level_3',
          timestamp: expect.any(Date),
        },
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
