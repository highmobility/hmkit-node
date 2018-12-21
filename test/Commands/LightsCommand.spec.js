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
      frontExteriorLight: expect.any(String),
      rearExteriorLight: expect.any(String),
      interiorLight: expect.any(String),
      ambientLight: expect.any(String),
      reverseLight: expect.any(String),
      emergencyBrakeLight: expect.any(String),
      fogLights: [
        { location: 'front', state: expect.any(String) },
        { location: 'rear', state: expect.any(String) },
      ],
      readingLamps: [
        { location: 'front_left', state: expect.any(String) },
        { location: 'front_right', state: expect.any(String) },
        { location: 'rear_right', state: expect.any(String) },
        { location: 'rear_left', state: expect.any(String) },
      ],
      interiorLights: [
        { location: 'front', state: expect.any(String) },
        { location: 'rear', state: expect.any(String) },
      ],
    });
  });

  it(`should control lights`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(
        'active_with_full_beam',
        'inactive',
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
        frontExteriorLight: 'active_with_full_beam',
        rearExteriorLight: 'inactive',
        interiorLight: 'inactive',
        ambientLight: '#254f4c',
        reverseLight: 'inactive',
        emergencyBrakeLight: 'inactive',
        fogLights: [
          { location: 'front', state: 'inactive' },
          { location: 'rear', state: 'inactive' },
        ],
        readingLamps: [
          { location: 'front_left', state: 'inactive' },
          { location: 'front_right', state: 'inactive' },
          { location: 'rear_right', state: 'inactive' },
          { location: 'rear_left', state: 'inactive' },
        ],
        interiorLights: [
          { location: 'front', state: 'inactive' },
          { location: 'rear', state: 'inactive' },
        ],
      })
    );
    const response2 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(
        'inactive',
        'inactive',
        '',
        '',
        [],
        [],
        []
      )
    );
    expect(response2.parse()).toBeInstanceOf(LightsResponse);
    expect(response2.parse()).toEqual(
      expect.objectContaining({
        frontExteriorLight: 'inactive',
        rearExteriorLight: 'inactive',
        interiorLight: expect.any(String),
        ambientLight: expect.any(String),
        fogLights: [
          { location: 'front', state: expect.any(String) },
          { location: 'rear', state: expect.any(String) },
        ],
        readingLamps: [
          { location: 'front_left', state: expect.any(String) },
          { location: 'front_right', state: expect.any(String) },
          { location: 'rear_right', state: expect.any(String) },
          { location: 'rear_left', state: expect.any(String) },
        ],
        interiorLights: [
          { location: 'front', state: expect.any(String) },
          { location: 'rear', state: expect.any(String) },
        ],
      })
    );
    const response3 = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(
        null,
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
        frontExteriorLight: expect.any(String),
        rearExteriorLight: expect.any(String),
        interiorLight: 'active',
        ambientLight: '#ffffff',
        fogLights: [
          { location: 'front', state: expect.any(String) },
          { location: 'rear', state: expect.any(String) },
        ],
        readingLamps: [
          { location: 'front_left', state: expect.any(String) },
          { location: 'front_right', state: expect.any(String) },
          { location: 'rear_right', state: expect.any(String) },
          { location: 'rear_left', state: expect.any(String) },
        ],
        interiorLights: [
          { location: 'front', state: expect.any(String) },
          { location: 'rear', state: expect.any(String) },
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
        frontExteriorLight: 'automatic',
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
        rearExteriorLight: 'active',
      })
    );
  });

  it('should control interior light separately', async () => {
    const oldData = (await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.getState()
    )).parse();

    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.LightsCommand.control(undefined, undefined, 'active')
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        ...oldData,
        interiorLight: 'active',
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
      hmkit.commands.LightsCommand.control(
        undefined,
        undefined,
        undefined,
        '#ff0000'
      )
    );

    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        ...oldData,
        ambientLight: '#ff0000',
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
      hmkit.commands.LightsCommand.control(
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
        fogLights: [
          { location: 'front', state: 'active' },
          { location: 'rear', state: 'active' },
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
          { location: 'front_left', state: expect.any(String) },
          { location: 'front_right', state: expect.any(String) },
          { location: 'rear_right', state: expect.any(String) },
          { location: 'rear_left', state: 'active' },
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
          { location: 'front', state: 'active' },
          { location: 'rear', state: 'active' },
        ],
      })
    );
  });
});
