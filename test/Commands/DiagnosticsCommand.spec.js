import getHmkit, { vehicleSerial } from '../testutils/getHmkit';
import DiagnosticsResponse from '../../src/Responses/DiagnosticsResponse';
const hmkit = getHmkit();

describe(`DiagnosticsCommand`, () => {
  it(`should get diagnostics state`, async () => {
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.DiagnosticsCommand.getState()
    );

    expect(response.parse()).toBeInstanceOf(DiagnosticsResponse);

    expect(response.parse()).toEqual(
      expect.objectContaining({
        mileage: expect.any(Number),
        engineOilTemperature: expect.any(Number),
        speed: expect.any(Number),
        engineRPM: expect.any(Number),
        fuelLevel: expect.any(Number),
        estimatedRange: expect.any(Number),
        currentFuelConsumption: expect.any(Number),
        averageFuelConsumption: expect.any(Number),
        washerFluidLevel: expect.any(String),
        tires: [
          {
            tirePosition: 'front_left',
            tirePressure: expect.any(Number),
            tireTemperature: expect.any(Number),
            wheelRPM: expect.any(Number),
          },
          {
            tirePosition: 'front_right',
            tirePressure: expect.any(Number),
            tireTemperature: expect.any(Number),
            wheelRPM: expect.any(Number),
          },
          {
            tirePosition: 'rear_right',
            tirePressure: expect.any(Number),
            tireTemperature: expect.any(Number),
            wheelRPM: expect.any(Number),
          },
          {
            tirePosition: 'rear_left',
            tirePressure: expect.any(Number),
            tireTemperature: expect.any(Number),
            wheelRPM: expect.any(Number),
          },
        ],
        batteryVoltage: expect.any(Number),
        adblueLevel: expect.any(Number),
        distanceSinceReset: expect.any(Number),
        distanceSinceStart: expect.any(Number),
      })
    );
  });
});
