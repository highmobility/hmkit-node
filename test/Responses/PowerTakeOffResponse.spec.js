import Response from '../../src/Responses/Response';
import PowerTakeOffResponse from '../../src/Responses/PowerTakeOffResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`PowerTakeOffResponse`, () => {
  it(`should return PowerTakeOffResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00650101000d0100010002000601699ab1f8af02000d0100010002000601699ab1f8af'
      )
    );

    expect(response.parse()).toBeInstanceOf(PowerTakeOffResponse);

    expect(response.parse()).toEqual({
      powerTakeoff: {
        value: 'inactive',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
      powerTakeoffEngaged: {
        value: 'not_engaged',
        timestamp: new Date('2019-03-20T10:42:28.655Z'),
      },
    });
  });
});
