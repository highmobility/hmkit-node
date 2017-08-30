import Response from '../../src/Responses/Response';
import NotificationResponse from '../../src/Responses/NotificationResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`NotificationResponse`, () => {
  it(`should return NotificationResponse`, () => {
    const response = new Response(hexToUint8Array('003801FE'));
    expect(response.parse()).toBeInstanceOf(NotificationResponse);
    expect(response.parse()).toEqual({
      action: 254,
    });
  });
});
