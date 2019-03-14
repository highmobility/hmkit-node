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
      frontExteriorLight: { value: expect.any(String) },
      rearExteriorLight: { value: expect.any(String) },
      ambientLight: { value: expect.any(String) },
      reverseLight: { value: expect.any(String) },
      emergencyBrakeLight: { value: expect.any(String) },
      fogLights: [
        { value: { location: 'front', state: expect.any(String) } },
        { value: { location: 'rear', state: expect.any(String) } },
      ],
      readingLamps: [
        { value: { location: 'front_left', state: expect.any(String) } },
        { value: { location: 'front_right', state: expect.any(String) } },
        { value: { location: 'rear_right', state: expect.any(String) } },
        { value: { location: 'rear_left', state: expect.any(String) } },
      ],
      interiorLights: [
        { value: { location: 'front', state: expect.any(String) } },
        { value: { location: 'rear', state: expect.any(String) } },
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
        frontExteriorLight: { value: 'active_with_full_beam' },
        rearExteriorLight: { value: 'inactive' },
        ambientLight: { value: '#254f4c' },
        reverseLight: { value: 'inactive' },
        emergencyBrakeLight: { value: 'inactive' },
        fogLights: [
          { value: { location: 'front', state: 'inactive' } },
          { value: { location: 'rear', state: 'inactive' } },
        ],
        readingLamps: [
          { value: { location: 'front_left', state: 'inactive' } },
          { value: { location: 'front_right', state: 'inactive' } },
          { value: { location: 'rear_right', state: 'inactive' } },
          { value: { location: 'rear_left', state: 'inactive' } },
        ],
        interiorLights: [
          { value: { location: 'front', state: 'inactive' } },
          { value: { location: 'rear', state: 'inactive' } },
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
        frontExteriorLight: { value: 'inactive' },
        rearExteriorLight: { value: 'inactive' },
        ambientLight: { value: expect.any(String) },
        fogLights: [
          { value: { location: 'front', state: expect.any(String) } },
          { value: { location: 'rear', state: expect.any(String) } },
        ],
        readingLamps: [
          { value: { location: 'front_left', state: expect.any(String) } },
          { value: { location: 'front_right', state: expect.any(String) } },
          { value: { location: 'rear_right', state: expect.any(String) } },
          { value: { location: 'rear_left', state: expect.any(String) } },
        ],
        interiorLights: [
          { value: { location: 'front', state: expect.any(String) } },
          { value: { location: 'rear', state: expect.any(String) } },
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
        frontExteriorLight: { value: expect.any(String) },
        rearExteriorLight: { value: expect.any(String) },
        ambientLight: { value: '#ffffff' },
        fogLights: [
          { value: { location: 'front', state: expect.any(String) } },
          { value: { location: 'rear', state: expect.any(String) } },
        ],
        readingLamps: [
          { value: { location: 'front_left', state: expect.any(String) } },
          { value: { location: 'front_right', state: expect.any(String) } },
          { value: { location: 'rear_right', state: expect.any(String) } },
          { value: { location: 'rear_left', state: expect.any(String) } },
        ],
        interiorLights: [
          { value: { location: 'front', state: expect.any(String) } },
          { value: { location: 'rear', state: expect.any(String) } },
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
        frontExteriorLight: { value: 'automatic' },
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
        rearExteriorLight: { value: 'active' },
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
        ambientLight: { value: '#ff0000' },
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
          { value: { location: 'front', state: 'active' } },
          { value: { location: 'rear', state: 'active' } },
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
          { value: { location: 'front_left', state: expect.any(String) } },
          { value: { location: 'front_right', state: expect.any(String) } },
          { value: { location: 'rear_right', state: expect.any(String) } },
          { value: { location: 'rear_left', state: 'active' } },
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
          { value: { location: 'front', state: 'active' } },
          { value: { location: 'rear', state: 'active' } },
        ],
      })
    );
  });
});
