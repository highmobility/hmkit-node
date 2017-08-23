import getHmkit from 'test/testutils/getHmkit';
const hmkit = getHmkit();
import VehicleLocationCommand from 'src/Commands/VehicleLocationCommand';

describe(`VehicleLocationCommand`, () => {
  it(`should get vehicle location`, async () => {
    const result = await hmkit.telematics.sendCommand(
      '356675D0CC76A8FFF5',
      VehicleLocationCommand.get()
    );

    expect(result.get()).toEqual(
      expect.objectContaining({
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      })
    );
  });
});
