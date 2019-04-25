import Response from '../../src/Responses/Response';
import ChassisSettingsResponse from '../../src/Responses/ChassisSettingsResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`ChassisSettingsResponse`, () => {
  it(`should return ChassisSettingsResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00530101000d0100010102000601699ab1f8ae02000d0100010002000601699ab1f8ae05000e010002001502000601699ab1f8ae05000e010002011502000601699ab1f8ae06000e010002002502000601699ab1f8ae06000e010002012502000601699ab1f8ae07000e010002001102000601699ab1f8ae07000e010002011102000601699ab1f8ae08000d0100011902000601699ab1f8ae09000d0100013702000601699ab1f8ae0a000d010001e402000601699ab1f8ae'
      )
    );

    expect(response.parse()).toBeInstanceOf(ChassisSettingsResponse);

    expect(response.parse()).toEqual({
      drivingMode: {
        value: 'eco',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      sportChrono: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      currentSpringRates: [
        {
          value: {
            axle: 'front_axle',
            springRate: 21,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            axle: 'rear_axle',
            springRate: 21,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      maximumSpringRates: [
        {
          value: {
            axle: 'front_axle',
            springRate: 37,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            axle: 'rear_axle',
            springRate: 37,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      minimumSpringRates: [
        {
          value: {
            axle: 'front_axle',
            springRate: 17,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
        {
          value: {
            axle: 'rear_axle',
            springRate: 17,
          },
          timestamp: new Date('2019-03-20T10:42:28.654Z'),
        },
      ],
      currentChassisPosition: {
        value: 25,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      maximumChassisPosition: {
        value: 55,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
      minimumChassisPosition: {
        value: -28,
        timestamp: new Date('2019-03-20T10:42:28.654Z'),
      },
    });
  });
});
