import getHmkit from '../testutils/getHmkit';
const hmkit = getHmkit();

describe(`VehicleLocationCommand`, () => {
  it(`should get vehicle location`, async () => {
    const response = await hmkit.telematics.sendCommand(
      '356675D0CC76A8FFF5',
      hmkit.commands.VehicleLocationCommand.get()
    );

    expect(response.parse()).toEqual(
      expect.objectContaining({
        latitude: expect.any(Number),
        longitude: expect.any(Number),
      })
    );
  });
});
