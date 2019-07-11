import Response from '../../src/Responses/Response';
import CruiseControlResponse from '../../src/Responses/CruiseControlResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`CruiseControlResponse`, () => {
  it(`should return CruiseControlResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00620101000d0100010002000601699ab1f8af02000d0100010002000601699ab1f8af03000e010002000002000601699ab1f8af04000d0100010002000601699ab1f8af05000e010002000002000601699ab1f8af'
      )
    );

    expect(response.parse()).toBeInstanceOf(CruiseControlResponse);

    expect(response.parse()).toEqual({
      cruiseControl: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      limiter: {
        value: 'not_set',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      targetSpeed: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      acc: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      accTargetSpeed: {
        value: 0,
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
