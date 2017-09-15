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

  it('should return DoorLocks VS', () => {
    const response = new Response(
      hexToUint8Array('00200D04000100010000020001030001')
    ).vehicleState();

    expect(response.parse()).toBeInstanceOf(DoorLocksResponse);
    expect(response.parse()).toEqual(
      expect.objectContaining({
        doors: expect.anything(),
      })
    );

    const response2 = new Response(
      hexToUint8Array('00200E04000100010000020001030001')
    ).vehicleState();

    expect(response2.parse()).toEqual({ error: 'invalid state size' });
  });
});
