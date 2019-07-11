import Response from '../../src/Responses/Response';
import LightsResponse from '../../src/Responses/LightsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`LightsResponse`, () => {
  it(`should return LightsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00360101000d0100010002000601699ab1f8ae02000d0100010002000601699ab1f8ae04000f0100030000ff02000601699ab1f8ae05000d0100010002000601699ab1f8ae06000d0100010002000601699ab1f8ae07000e010002000002000601699ab1f8ae07000e010002010002000601699ab1f8ae08000e010002000002000601699ab1f8ae08000e010002010002000601699ab1f8ae08000e010002020002000601699ab1f8ae08000e010002030002000601699ab1f8ae09000e010002000002000601699ab1f8ae09000e010002010002000601699ab1f8ae'
      )
    );
    expect(response.parse()).toBeInstanceOf(LightsResponse);

    expect(response.parse()).toEqual({
      frontExteriorLight: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      rearExteriorLight: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      ambientLight: {
        value: '#0000ff',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      reverseLight: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      emergencyBrakeLight: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      fogLights: [
        {
          value: { location: 'front', state: 'inactive' },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: { location: 'rear', state: 'inactive' },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      readingLamps: [
        {
          value: { location: 'front_left', state: 'inactive' },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: { location: 'front_right', state: 'inactive' },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: { location: 'rear_right', state: 'inactive' },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: { location: 'rear_left', state: 'inactive' },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      interiorLights: [
        {
          value: { location: 'front', state: 'inactive' },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: { location: 'rear', state: 'inactive' },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
    });
  });
});
