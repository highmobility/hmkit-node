import Response from '../../src/Responses/Response';
import DoorLocksResponse from '../../src/Responses/DoorLocksResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`DoorLocksResponse`, () => {
  it(`should return DoorLocksResponse`, () => {
    const response = new Response(
      hexToUint8Array('00200104000100010000020001030001')
    );
    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        doors: expect.anything(),
      })
    );
  });
});
