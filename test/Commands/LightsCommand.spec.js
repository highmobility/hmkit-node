import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import LightsResponse from '../../src/Responses/LightsResponse';
const hmkit = getHmkit();

describe(`LightsCommand`, () => {
  it(`should get state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual({
      frontExteriorLight: { data: expect.any(String) },
      rearExteriorLight: { data: expect.any(String) },
      ambientLight: { data: expect.any(String) },
      reverseLight: { data: expect.any(String) },
      emergencyBrakeLight: { data: expect.any(String) },
      fogLights: [
        { data: { location: 'front', state: expect.any(String) } },
        { data: { location: 'rear', state: expect.any(String) } },
      ],
      readingLamps: [
        { data: { location: 'front_left', state: expect.any(String) } },
        { data: { location: 'front_right', state: expect.any(String) } },
        { data: { location: 'rear_right', state: expect.any(String) } },
        { data: { location: 'rear_left', state: expect.any(String) } },
      ],
      interiorLights: [
        { data: { location: 'front', state: expect.any(String) } },
        { data: { location: 'rear', state: expect.any(String) } },
      ],
    });
  });

  it(`should control lights`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(
        'active_with_full_beam',
        'inactive',
        '#254f4c',
        [
          { location: 'front', state: 'inactive' },
          { location: 'rear', state: 'inactive' },
        ],
        [
          { location: 'front_left', state: 'inactive' },
          { location: 'front_right', state: 'inactive' },
          { location: 'rear_right', state: 'inactive' },
          { location: 'rear_left', state: 'inactive' },
        ],
        [
          { location: 'front', state: 'inactive' },
          { location: 'rear', state: 'inactive' },
        ]
      )
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        frontExteriorLight: { data: 'active_with_full_beam' },
        rearExteriorLight: { data: 'inactive' },
        ambientLight: { data: '#254f4c' },
        reverseLight: { data: 'inactive' },
        emergencyBrakeLight: { data: 'inactive' },
        fogLights: [
          { data: { location: 'front', state: 'inactive' } },
          { data: { location: 'rear', state: 'inactive' } },
        ],
        readingLamps: [
          { data: { location: 'front_left', state: 'inactive' } },
          { data: { location: 'front_right', state: 'inactive' } },
          { data: { location: 'rear_right', state: 'inactive' } },
          { data: { location: 'rear_left', state: 'inactive' } },
        ],
        interiorLights: [
          { data: { location: 'front', state: 'inactive' } },
          { data: { location: 'rear', state: 'inactive' } },
        ],
      })
    );
    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control('inactive', '', '', [], [], [])
    );
    expect(response2.parse()).toBeInstanceOf(LightsResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        frontExteriorLight: { data: 'inactive' },
        rearExteriorLight: { data: 'inactive' },
        ambientLight: { data: expect.any(String) },
        fogLights: [
          { data: { location: 'front', state: expect.any(String) } },
          { data: { location: 'rear', state: expect.any(String) } },
        ],
        readingLamps: [
          { data: { location: 'front_left', state: expect.any(String) } },
          { data: { location: 'front_right', state: expect.any(String) } },
          { data: { location: 'rear_right', state: expect.any(String) } },
          { data: { location: 'rear_left', state: expect.any(String) } },
        ],
        interiorLights: [
          { data: { location: 'front', state: expect.any(String) } },
          { data: { location: 'rear', state: expect.any(String) } },
        ],
      })
    );
    const response3 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(
        null,
        'active',
        '#ffffff',
        null,
        null,
        null
      )
    );
    expect(response3.parse()).toBeInstanceOf(LightsResponse);
    expect(response3.parse()).toEqual(
      expect.objectContaining({
        frontExteriorLight: { data: expect.any(String) },
        rearExteriorLight: { data: expect.any(String) },
        ambientLight: { data: '#ffffff' },
        fogLights: [
          { data: { location: 'front', state: expect.any(String) } },
          { data: { location: 'rear', state: expect.any(String) } },
        ],
        readingLamps: [
          { data: { location: 'front_left', state: expect.any(String) } },
          { data: { location: 'front_right', state: expect.any(String) } },
          { data: { location: 'rear_right', state: expect.any(String) } },
          { data: { location: 'rear_left', state: expect.any(String) } },
        ],
        interiorLights: [
          { data: { location: 'front', state: expect.any(String) } },
          { data: { location: 'rear', state: expect.any(String) } },
        ],
      })
    );
  });

  it('should control front exterior light separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    )).parse();

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control('automatic')
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        ...oldData,
        frontExteriorLight: { data: 'automatic' },
      })
    );
  });

  it('should control rear exterior light separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    )).parse();

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(undefined, 'active')
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        ...oldData,
        rearExteriorLight: { data: 'active' },
      })
    );
  });

  it('should control ambient light separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    )).parse();

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(undefined, undefined, '#ff0000')
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        ...oldData,
        ambientLight: { data: '#ff0000' },
      })
    );
  });

  it('should control fog lights separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    )).parse();

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(undefined, undefined, undefined, [
        { location: 'front', state: 'active' },
        { location: 'rear', state: 'active' },
      ])
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        ...oldData,
        fogLights: [
          { data: { location: 'front', state: 'active' } },
          { data: { location: 'rear', state: 'active' } },
        ],
      })
    );
  });

  it('should control reading lamps separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    )).parse();

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(
        undefined,
        undefined,
        undefined,
        undefined,
        [
          { location: 'front_left', state: 'active' },
          { location: 'front_right', state: 'active' },
          { location: 'rear_right', state: 'active' },
          { location: 'rear_left', state: 'active' },
        ]
      )
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        ...oldData,
        readingLamps: [
          { data: { location: 'front_left', state: expect.any(String) } },
          { data: { location: 'front_right', state: expect.any(String) } },
          { data: { location: 'rear_right', state: expect.any(String) } },
          { data: { location: 'rear_left', state: 'active' } },
        ],
      })
    );
  });

  it('should control interior lights separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    )).parse();

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        [
          { location: 'front', state: 'active' },
          { location: 'rear', state: 'active' },
        ]
      )
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        ...oldData,
        interiorLights: [
          { data: { location: 'front', state: 'active' } },
          { data: { location: 'rear', state: 'active' } },
        ],
      })
    );
  });
});
