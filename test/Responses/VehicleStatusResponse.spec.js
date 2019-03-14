import Response from '../../src/Responses/Response';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleStatusResponse`, () => {
  it(`should return VehicleStatusResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `00110101001401001131484d45443535303848433337414333350200040100010003000301000004001a0100174d697373696f6e20452063726f73732074757269736d6f05000c010009422d484d2d3838343907000501000207e108000301000009000501000200000a0004010001040b0004010001040c0007010004000000000d000501000200000e0004010001000f0004010001001000040100010011000301000012000a010007506f72736368659900e10100de002301020005010002001e03000b0100083fe999999999999a040007010004bf19999a050007010004bf19999a060007010004000000000700070100040000000008000b0100083fe000000000000009000501000200000a0007010004000000000b0004010001000c0004010001010e000701000441c800000f00040100010110000401000100110006010003000a1c130006010003000a1c1400070100044219999a15000c010009000000016184c860e015000c010009010000016184c94b4015000c010009020000016184ca35a01600040100010017000401000100990059010056005301010004010001010200040100010005000501000200150500050100020115060005010002002506000501000201250700050100020011070005010002011108000401000119090004010001370a0004010001e499007001006d00240101000701000441b800000200070100044190000003000701000441b8000004000701000441b0000006000401000100070004010001000800040100010009000701000441b80000050004010001000b00060100030508000b00060100030608000c000701000441b0000099002b0100280062010100040100010002000401000100030005010002000004000401000100050005010002000099011e01011b00610101000501000200000100050100020100010005010002020001000501000203000100050100020400010005010002050001000501000206000100050100020700010005010002080001000501000209000100050100020a000100050100020b000100050100020c000100050100020d000100050100020e000100050100020f0001000501000210000100050100021100010005010002120001000501000213000100050100021400010005010002150001000501000216000100050100021700010005010002180001000501000219000100050100021a000100050100021b000100050100021c000100050100021d000100050100021e000100050100021f0001000501000220000100050100022100010005010002220099016d01016a003301010006010003000bb802000501000200120300050100020000040005010002000005000b0100083fe999999999999a06000501000200c8090004010001000b0007010004414000000c0007010004000000000d000501000200000e000501000200000f00070100040000000010000401000100110005010002001712000701000441c00000130007010004441600001400040100010015000b0100083fc999999999999a16000b0100083fb999999999999a170005010002000018000b0100083fe999999999999a19000c010009000a000000000000001a000801000500401333331a000801000501401333331a000801000502401333331a000801000503401333331b000801000500422000001b000801000501422000001b000801000502422000001b000801000503422000001c00060100030000001c00060100030100001c00060100030200001c00060100030300001d0007010004000000001e000701000400000bb899007e01007b002001020005010002000002000501000201000200050100020200020005010002030002000501000205000300050100020000030005010002010003000501000202000300050100020300030005010002050004000501000200000400050100020100040005010002020004000501000203000400050100020500990014010011003501010004010001000200040100010099001401001100400102000401000100030004010001009900ab0100a80060010100040100010002000401000100030004010001000400070100040000000005000401000100080004010001000900030100000a0004010001000b00030100000d0004010001000e00070100043f0000000f00070100044248000010000701000400000000110013010010404a421cde5d1809402ac37d41743e9612000b010008004020000045555212000b010008010000000000000012000b010008023fa6666655534499000d01000a0026010100040100010099000d01000a0067010100040100010099001a010017005401010007010004461c4000020007010004447a000099006b01006800360101000401000100020004010001000400060100030000ff05000401000100060004010001000700050100020000070005010002010008000501000200000800050100020100080005010002020008000501000203000900050100020000090005010002010099008201007f003401010005010002019002000601000300753003000401000100040004010001000500040100010006000501000200000700040100010008000b010008000001669baf11a909000b010008000001669baf11a90a000b010008000001669baf11a90b000c0100091208007b00000000000c000b010008000001669baf11a999000d01000a00660101000401000100990047010044003101070013010010404a421cde5d1809402ac37d41743e96020028010025416c6578616e646572706c61747a2c203130313738204265726c696e2c204765726d616e7999001c010019005201010005010002000002000b010008000000000000000099000d01000a005801010004010001009900350100320047010100040100010002000301000003000301000004000b01000800000169385e85b505000b01000800000169385e85b599001401001100650101000401000100020004010001009900d40100d1005701010008010005000000000001000801000501000000000100080100050200000000010008010005030000000002000b010008000000000000000003000b010008000000000000000004000b010008000000000000000005000401000100060007010004000000000700070100040000000008000401000100090004010001000a000501000200000a000501000201000b0004010001000c0004010001000d000b01000800000000000000000e0004010001000f00040100010010000401000100110004010001001200040100010099003701003400250101000b010008000000000000000002000b01000800000000000000000300040100010004000401000100050004010001009900460100430056010200050100020000020005010002010002000501000202000200050100020300030005010002000003000501000201000300050100020200030005010002030099000d01000a00630101000401000100990053010050006401010005010002010001000501000202000200050100020100020005010002020003000501000201000300050100020200040004010001000500040100010006000401000100070005010002000099000d01000a0046010100040100010099001401001100500101000b01000800000169385e85b99900140100110021010100040100010102000401000100990119010116006801010005010002012c020005010002012c03000b0100083fe000000000000004000b0100083fe000000000000005000c010009003fd999999999999a05000c010009013fd999999999999a05000c010009023fd999999999999a05000c010009033fd999999999999a05000c010009043fd999999999999a060008010005004204cccd060008010005014204cccd060008010005024204cccd060008010005034204cccd060008010005044204cccd07000701000442ca999a08000701000441b400000900060100030175900a000b0100083fc999999999999a0b000701000440b5c28f0c000b0100083fe00000000000000d000b010008000001669baf11a90e000701000440c666660f0007010004410b333399000d01000a00280101000401000100990038010035003001040013010010404a421cde5d1809402ac37d41743e9605000b010008404a428f9f44d44506000b0100084060b0000000000099001401001100550101000b010008000000000000000099002101001e00590101000401000100020004010001000300030100000400040100010099007901007600450102000c01000900000000000000000002000c01000901000000000000000002000c01000902000000000000000002000c01000903000000000000000002000c0100090400000000000000000300050100020000030005010002010003000501000202000300050100020300030005010002040099004c01004900420101000401000100020004010001000300040100010004000401000132050004010001220600040100010007000b010008000000000000000008000b010008000000dc6acfac00a2000b0100080000016938640777`
      )
    );

    expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);

    expect(response.parse()).toEqual({
      vin: { value: '1HMED5508HC37AC35' },
      powertrain: { value: 'unknown' },
      modelName: { value: '' },
      name: { value: 'Mission E cross turismo' },
      licensePlate: { value: 'B-HM-8849' },
      modelYear: { value: 2017 },
      colorName: { value: '' },
      powerInKw: { value: 0 },
      numberOfDoors: { value: 4 },
      numberOfSeats: { value: 4 },
      engineVolume: { value: 0 },
      engineMaxTorque: { value: 0 },
      gearbox: { value: 'manual' },
      displayUnit: { value: 'km' },
      driverSeatLocation: { value: 'left' },
      equipments: [{ value: '' }],
      brand: { value: 'Porsche' },
      states: [
        {
          capabilityIdentifier: 'charging',
          state: {
            estimatedRange: { value: 30 },
            batteryLevel: { value: 0.8 },
            batteryCurrentAC: { value: -0.6 },
            batteryCurrentDC: { value: -0.6 },
            chargerVoltageAC: { value: 0 },
            chargerVoltageDC: { value: 0 },
            chargeLimit: { value: 0.5 },
            timeToCompleteCharge: { value: 0 },
            chargingRateKW: { value: 0 },
            chargePortState: { value: 'closed' },
            chargeMode: { value: 'timer_based' },
            maxChargingCurrent: { value: 25 },
            plugType: { value: 'type_2' },
            chargingWindowChosen: { value: 'not_chosen' },
            departureTimes: [
              { value: { activeState: 'inactive', hour: 10, minute: 28 } },
            ],
            reductionTimes: [
              { value: { startStop: 'start', hour: 10, minute: 28 } },
            ],
            batteryTemperature: { value: 38.4 },
            timers: [
              {
                value: {
                  timerType: 'preferred_start_time',
                  time: new Date('2018-02-11T12:13:00.000Z'),
                },
              },
              {
                value: {
                  timerType: 'preferred_end_time',
                  time: new Date('2018-02-11T12:14:00.000Z'),
                },
              },
              {
                value: {
                  timerType: 'departure_time',
                  time: new Date('2018-02-11T12:15:00.000Z'),
                },
              },
            ],
            pluggedIn: { value: 'disconnected' },
            activeState: { value: 'not_charging' },
          },
        },
        {
          capabilityIdentifier: 'chassis_settings',
          state: {
            drivingMode: { value: 'eco' },
            sportChrono: { value: 'inactive' },
            currentSpringRates: [
              { value: { axle: 'front_axle', springRate: 21 } },
              { value: { axle: 'rear_axle', springRate: 21 } },
            ],
            maximumSpringRates: [
              { value: { axle: 'front_axle', springRate: 37 } },
              { value: { axle: 'rear_axle', springRate: 37 } },
            ],
            minimumSpringRates: [
              { value: { axle: 'front_axle', springRate: 17 } },
              { value: { axle: 'rear_axle', springRate: 17 } },
            ],
            currentChassisPosition: { value: 25 },
            maximumChassisPosition: { value: 55 },
            minimumChassisPosition: { value: -28 },
          },
        },
        {
          capabilityIdentifier: 'climate',
          state: {
            insideTemperature: { value: 23 },
            outsideTemperature: { value: 18 },
            driverTemperatureSetting: { value: 23 },
            passengerTemperatureSetting: { value: 22 },
            defoggingState: { value: 'inactive' },
            defrostingState: { value: 'inactive' },
            ionisingState: { value: 'inactive' },
            defrostingTemperature: { value: 23 },
            hvacState: { value: 'inactive' },
            hvacWeekdayStartingTimes: [
              { value: { weekday: 'saturday', hour: 8, minute: 0 } },
              { value: { weekday: 'sunday', hour: 8, minute: 0 } },
            ],
            rearTemperatureSetting: { value: 22 },
          },
        },
        {
          capabilityIdentifier: 'cruise_control',
          state: {
            cruiseControl: { value: 'inactive' },
            limiter: { value: 'not_set' },
            targetSpeed: { value: 0 },
            acc: { value: 'inactive' },
            accTargetSpeed: { value: 0 },
          },
        },
        {
          capabilityIdentifier: 'dashboard_lights',
          state: {
            dashboardLights: [
              { value: { lightName: 'high_beam', state: 'inactive' } },
              { value: { lightName: 'low_beam', state: 'inactive' } },
              { value: { lightName: 'hazard_warning', state: 'inactive' } },
              { value: { lightName: 'brake_failure', state: 'inactive' } },
              { value: { lightName: 'hatch_open', state: 'inactive' } },
              { value: { lightName: 'fuel_level', state: 'inactive' } },
              {
                value: {
                  lightName: 'engine_coolant_temperature',
                  state: 'inactive',
                },
              },
              {
                value: {
                  lightName: 'battery_charging_condition',
                  state: 'inactive',
                },
              },
              { value: { lightName: 'engine_oil', state: 'inactive' } },
              { value: { lightName: 'position_lights', state: 'inactive' } },
              { value: { lightName: 'front_fog_light', state: 'inactive' } },
              { value: { lightName: 'rear_fog_light', state: 'inactive' } },
              { value: { lightName: 'park_heating', state: 'inactive' } },
              { value: { lightName: 'engine_indicator', state: 'inactive' } },
              { value: { lightName: 'service_call', state: 'inactive' } },
              {
                value: {
                  lightName: 'transmission_fluid_temperature',
                  state: 'inactive',
                },
              },
              {
                value: { lightName: 'transmission_failure', state: 'inactive' },
              },
              {
                value: {
                  lightName: 'anti_lock_brake_failure',
                  state: 'inactive',
                },
              },
              { value: { lightName: 'worn_brake_linings', state: 'inactive' } },
              {
                value: {
                  lightName: 'windscreen_washer_fluid',
                  state: 'inactive',
                },
              },
              { value: { lightName: 'tire_failure', state: 'inactive' } },
              { value: { lightName: 'engine_oil_level', state: 'inactive' } },
              {
                value: { lightName: 'engine_coolant_level', state: 'inactive' },
              },
              { value: { lightName: 'steering_failure', state: 'inactive' } },
              { value: { lightName: 'esc_indication', state: 'inactive' } },
              { value: { lightName: 'brake_lights', state: 'inactive' } },
              { value: { lightName: 'adblue_level', state: 'inactive' } },
              {
                value: {
                  lightName: 'fuel_filter_diff_pressure',
                  state: 'inactive',
                },
              },
              { value: { lightName: 'seat_belt', state: 'inactive' } },
              { value: { lightName: 'advanced_braking', state: 'inactive' } },
              { value: { lightName: 'acc', state: 'inactive' } },
              { value: { lightName: 'trailer_connected', state: 'inactive' } },
              { value: { lightName: 'airbag', state: 'inactive' } },
              { value: { lightName: 'esc_switched_off', state: 'inactive' } },
              {
                value: {
                  lightName: 'lane_departure_warning_off',
                  state: 'inactive',
                },
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'diagnostics',
          state: {
            mileage: { value: 3000 },
            engineOilTemperature: { value: 18 },
            speed: { value: 0 },
            engineRPM: { value: 0 },
            fuelLevel: { value: 0.8 },
            estimatedRange: { value: 200 },
            washerFluidLevel: { value: 'low' },
            batteryVoltage: { value: 12 },
            adblueLevel: { value: 0 },
            distanceSinceReset: { value: 0 },
            distanceSinceStart: { value: 0 },
            fuelVolume: { value: 0 },
            antiLockBraking: { value: 'inactive' },
            engineCoolantTemperature: { value: 23 },
            engineTotalOperatingHours: { value: 24 },
            engineTotalFuelConsumption: { value: 600 },
            brakeFluidLevel: { value: 'low' },
            engineTorque: { value: 0.2 },
            engineLoad: { value: 0.1 },
            wheelBasedSpeed: { value: 0 },
            batteryLevel: { value: 0.8 },
            checkControlMessages: [
              { value: { id: 10, remainingMinutes: 0, text: '', status: '' } },
            ],
            tirePressures: [
              { value: { location: 'front_left', pressure: 2.3 } },
              { value: { location: 'front_right', pressure: 2.3 } },
              { value: { location: 'rear_right', pressure: 2.3 } },
              { value: { location: 'rear_left', pressure: 2.3 } },
            ],
            tireTemperatures: [
              { value: { location: 'front_left', temperature: 40 } },
              { value: { location: 'front_right', temperature: 40 } },
              { value: { location: 'rear_right', temperature: 40 } },
              { value: { location: 'rear_left', temperature: 40 } },
            ],
            wheelRpms: [
              { value: { location: 'front_left', rpm: 0 } },
              { value: { location: 'front_right', rpm: 0 } },
              { value: { location: 'rear_right', rpm: 0 } },
              { value: { location: 'rear_left', rpm: 0 } },
            ],
            troubleCodes: [
              { value: { occurences: 0, id: '', ecuId: '', status: '' } },
            ],
            mileageMeters: { value: 3000 },
          },
        },
        {
          capabilityIdentifier: 'door_locks',
          state: {
            insideLocks: [
              { value: { doorLocation: 'front_left', lockState: 'unlocked' } },
              { value: { doorLocation: 'front_right', lockState: 'unlocked' } },
              { value: { doorLocation: 'rear_right', lockState: 'unlocked' } },
              { value: { doorLocation: 'rear_left', lockState: 'unlocked' } },
              { value: { doorLocation: 'all', lockState: 'unlocked' } },
            ],
            locks: [
              { value: { doorLocation: 'front_left', lockState: 'unlocked' } },
              { value: { doorLocation: 'front_right', lockState: 'unlocked' } },
              { value: { doorLocation: 'rear_right', lockState: 'unlocked' } },
              { value: { doorLocation: 'rear_left', lockState: 'unlocked' } },
              { value: { doorLocation: 'all', lockState: 'unlocked' } },
            ],
            positions: [
              { value: { doorLocation: 'front_left', position: 'closed' } },
              { value: { doorLocation: 'front_right', position: 'closed' } },
              { value: { doorLocation: 'rear_right', position: 'closed' } },
              { value: { doorLocation: 'rear_left', position: 'closed' } },
              { value: { doorLocation: 'all', position: 'closed' } },
            ],
          },
        },
        {
          capabilityIdentifier: 'engine',
          state: {
            ignition: { value: 'off' },
            accessoriesIgnition: { value: 'off' },
          },
        },
        {
          capabilityIdentifier: 'fueling',
          state: {
            gasFlapLock: { value: 'unlocked' },
            gasFlapPosition: { value: 'closed' },
          },
        },
        {
          capabilityIdentifier: 'home_charger',
          state: {
            charging: { value: 'disconnected' },
            authenticationMechanism: { value: 'pin' },
            plugType: { value: 'type_1' },
            chargingPower: { value: 0 },
            solarCharging: { value: 'deactivated' },
            hotspotEnabled: { value: 'disabled' },
            hotspotSSID: { value: '' },
            wiFiHotspotSecurity: { value: 'none' },
            wiFiHotspotPassword: { value: '' },
            authentication: { value: 'unauthenticated' },
            chargeCurrentDC: { value: 0.5 },
            maximumChargeCurrent: { value: 50 },
            minimumChargeCurrent: { value: 0 },
            coordinates: {
              value: { latitude: 52.516506, longitude: 13.381815 },
            },
            priceTariffs: [
              {
                value: {
                  pricingType: 'starting_fee',
                  price: 2.5,
                  currency: 'EUR',
                },
              },
              { value: { pricingType: 'per_minute', price: 0, currency: '' } },
              {
                value: { pricingType: 'per_kwh', price: 1.3, currency: 'USD' },
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'honk_horn_flash_lights',
          state: { flashers: { value: 'inactive' } },
        },
        {
          capabilityIdentifier: 'hood',
          state: { position: { value: 'closed' } },
        },
        {
          capabilityIdentifier: 'light_conditions',
          state: {
            outsideLight: { value: 10000 },
            insideLight: { value: 1000 },
          },
        },
        {
          capabilityIdentifier: 'lights',
          state: {
            frontExteriorLight: { value: 'inactive' },
            rearExteriorLight: { value: 'inactive' },
            ambientLight: { value: '#0000ff' },
            reverseLight: { value: 'inactive' },
            emergencyBrakeLight: { value: 'inactive' },
            fogLights: [
              { value: { location: 'front', state: 'inactive' } },
              { value: { location: 'rear', state: 'inactive' } },
            ],
            readingLamps: [
              { value: { location: 'front_left', state: 'inactive' } },
              { value: { location: 'front_right', state: 'inactive' } },
              { value: { location: 'rear_right', state: 'inactive' } },
              { value: { location: 'rear_left', state: 'inactive' } },
            ],
            interiorLights: [
              { value: { location: 'front', state: 'inactive' } },
              { value: { location: 'rear', state: 'inactive' } },
            ],
          },
        },
        {
          capabilityIdentifier: 'maintenance',
          state: {
            daysToNextService: { value: 400 },
            kilometersToNextService: { value: 30000 },
            cbsReportsCount: { value: 0 },
            monthsToExhaustInspection: { value: 0 },
            teleserviceAvailability: { value: 'pending' },
            serviceDistanceThreshold: { value: 0 },
            serviceTimeThreshold: { value: 0 },
            automaticTeleserviceCallDate: {
              value: new Date('2018-10-22T12:10:33.769Z'),
            },
            teleserviceBatteryCallDate: {
              value: new Date('2018-10-22T12:10:33.769Z'),
            },
            nextInspectionDate: { value: new Date('2018-10-22T12:10:33.769Z') },
            conditionBasedServices: [
              {
                value: {
                  year: 2018,
                  month: 8,
                  cbsIdentifier: 123,
                  dueStatus: 'ok',
                  cbsText: '',
                  description: '',
                },
              },
            ],
            brakeFluidChangeDate: {
              value: new Date('2018-10-22T12:10:33.769Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'mobile',
          state: { connection: { value: 'disconnected' } },
        },
        {
          capabilityIdentifier: 'navi_destination',
          state: {
            coordinates: {
              value: { latitude: 52.516506, longitude: 13.381815 },
            },
            destinationName: { value: 'Alexanderplatz, 10178 Berlin, Germany' },
          },
        },
        {
          capabilityIdentifier: 'offroad',
          state: { routeIncline: { value: 0 }, wheelSuspension: { value: 0 } },
        },
        {
          capabilityIdentifier: 'parking_brake',
          state: { parkingBrake: { value: 'inactive' } },
        },
        {
          capabilityIdentifier: 'parking_ticket',
          state: {
            parkingTicketState: { value: 'ended' },
            operatorName: { value: '' },
            operatorTicketID: { value: '' },
            ticketStartTime: { value: new Date('2019-03-01T08:28:32.565Z') },
            ticketEndTime: { value: new Date('2019-03-01T08:28:32.565Z') },
          },
        },
        {
          capabilityIdentifier: 'power_takeoff',
          state: {
            powerTakeoff: { value: 'inactive' },
            powerTakeoffEngaged: { value: 'not_engaged' },
          },
        },
        {
          capabilityIdentifier: 'race',
          state: {
            accelerations: [
              { value: { type: 'longitudinal_acceleration', gForce: 0 } },
              { value: { type: 'lateral_acceleration', gForce: 0 } },
              { value: { type: 'front_lateral_acceleration', gForce: 0 } },
              { value: { type: 'rear_lateral_acceleration', gForce: 0 } },
            ],
            understeering: { value: 0 },
            oversteering: { value: 0 },
            gasPedalPosition: { value: 0 },
            steeringAngle: { value: 0 },
            brakePressure: { value: 0 },
            yawRate: { value: 0 },
            rearSuspensionSteering: { value: 0 },
            electronicStabilityProgram: { value: 'inactive' },
            brakeTorqueVectorings: [
              { value: { axle: 'front_axle', vectoring: 'inactive' } },
              { value: { axle: 'rear_axle', vectoring: 'inactive' } },
            ],
            gearMode: { value: 'manual' },
            selectedGear: { value: 0 },
            brakePedalPosition: { value: 0 },
            brakePedalSwitch: { value: 'inactive' },
            clutchPedalSwitch: { value: 'inactive' },
            acceleratorPedalIdleSwitch: { value: 'inactive' },
            acceleratorPedalKickdownSwitch: { value: 'inactive' },
            vehicleMoving: { value: 'not_moving' },
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: { value: 0 },
            position: { value: 0 },
            convertibleRoof: { value: 'closed' },
            sunroofTilt: { value: 'closed' },
            sunroofState: { value: 'closed' },
          },
        },
        {
          capabilityIdentifier: 'seats',
          state: {
            personsDetected: [
              {
                value: {
                  seatPosition: 'front_left',
                  personDetected: 'not_detected',
                },
              },
              {
                value: {
                  seatPosition: 'front_right',
                  personDetected: 'not_detected',
                },
              },
              {
                value: {
                  seatPosition: 'rear_right',
                  personDetected: 'not_detected',
                },
              },
              {
                value: {
                  seatPosition: 'rear_left',
                  personDetected: 'not_detected',
                },
              },
            ],
            seatbeltsFastened: [
              {
                value: {
                  seatPosition: 'front_left',
                  seatbeltFastened: 'not_fastened',
                },
              },
              {
                value: {
                  seatPosition: 'front_right',
                  seatbeltFastened: 'not_fastened',
                },
              },
              {
                value: {
                  seatPosition: 'rear_right',
                  seatbeltFastened: 'not_fastened',
                },
              },
              {
                value: {
                  seatPosition: 'rear_left',
                  seatbeltFastened: 'not_fastened',
                },
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'start_stop',
          state: { startStop: { value: 'inactive' } },
        },
        {
          capabilityIdentifier: 'tachograph',
          state: {
            driverWorkingStates: [
              { value: { driverNumber: 1, workingState: 'resting' } },
              { value: { driverNumber: 2, workingState: 'resting' } },
            ],
            driverTimeStates: [
              { value: { driverNumber: 1, timeState: 'normal' } },
              { value: { driverNumber: 2, timeState: 'normal' } },
            ],
            driverCards: [
              { value: { driverNumber: 1, card: 'not_present' } },
              { value: { driverNumber: 2, card: 'not_present' } },
            ],
            vehicleMotion: { value: 'not_detected' },
            vehicleOverspeed: { value: 'no_overspeed' },
            vehicleDirection: { value: 'forward' },
            vehicleSpeed: { value: 0 },
          },
        },
        {
          capabilityIdentifier: 'theft_alarm',
          state: { theftAlarm: { value: 'not_armed' } },
        },
        {
          capabilityIdentifier: 'vehicle_time',
          state: {
            vehicleTime: { value: new Date('2019-03-01T08:28:32.569Z') },
          },
        },
        {
          capabilityIdentifier: 'trunk',
          state: {
            trunkLock: { value: 'locked' },
            trunkPosition: { value: 'closed' },
          },
        },
        {
          capabilityIdentifier: 'usage',
          state: {
            averageWeeklyDistance: { value: 300 },
            averageWeeklyDistanceLongRun: { value: 300 },
            accelerationEvaluation: { value: 0.5 },
            drivingStyleEvaluation: { value: 0.5 },
            drivingModesActivationPeriods: [
              { value: { drivingMode: 'regular', period: 0.4 } },
              { value: { drivingMode: 'eco', period: 0.4 } },
              { value: { drivingMode: 'sport', period: 0.4 } },
              { value: { drivingMode: 'sport_plus', period: 0.4 } },
              { value: { drivingMode: 'eco_plus', period: 0.4 } },
            ],
            drivingModesEnergyConsumptions: [
              { value: { drivingMode: 'regular', consumption: 33.2 } },
              { value: { drivingMode: 'eco', consumption: 33.2 } },
              { value: { drivingMode: 'sport', consumption: 33.2 } },
              { value: { drivingMode: 'sport_plus', consumption: 33.2 } },
              { value: { drivingMode: 'eco_plus', consumption: 33.2 } },
            ],
            lastTripEnergyConsumption: { value: 101.3 },
            lastTripFuelConsumption: { value: 22.5 },
            mileageAfterLastTrip: { value: 95632 },
            lastTripElectricPortion: { value: 0.2 },
            lastTripAverageEnergyRecuperation: { value: 5.68 },
            lastTripBatteryRemaining: { value: 0.5 },
            lastTripDate: { value: new Date('2018-10-22T12:10:33.769Z') },
            averageFuelConsumption: { value: 6.2 },
            currentFuelConsumption: { value: 8.7 },
          },
        },
        {
          capabilityIdentifier: 'valet_mode',
          state: { valetMode: { value: 'deactivated' } },
        },
        {
          capabilityIdentifier: 'vehicle_location',
          state: {
            coordinates: {
              value: { latitude: 52.516506, longitude: 13.381815 },
            },
            heading: { value: 52.520008 },
            altitude: { value: 133.5 },
          },
        },
        {
          capabilityIdentifier: 'weather_conditions',
          state: { rainIntensity: { value: 0 } },
        },
        {
          capabilityIdentifier: 'wi_fi',
          state: {
            wifiEnabled: { value: 'disabled' },
            networkConnected: { value: 'disconnected' },
            networkSSID: { value: '' },
            networkSecurity: { value: 'none' },
          },
        },
        {
          capabilityIdentifier: 'windows',
          state: {
            windowsOpenPercentages: [
              { value: { windowLocation: 'front_left', openPercentage: 0 } },
              { value: { windowLocation: 'front_right', openPercentage: 0 } },
              { value: { windowLocation: 'rear_right', openPercentage: 0 } },
              { value: { windowLocation: 'rear_left', openPercentage: 0 } },
              { value: { windowLocation: 'hatch', openPercentage: 0 } },
            ],
            windowsPositions: [
              {
                value: {
                  windowLocation: 'front_left',
                  windowPosition: 'closed',
                },
              },
              {
                value: {
                  windowLocation: 'front_right',
                  windowPosition: 'closed',
                },
              },
              {
                value: {
                  windowLocation: 'rear_right',
                  windowPosition: 'closed',
                },
              },
              {
                value: {
                  windowLocation: 'rear_left',
                  windowPosition: 'closed',
                },
              },
              { value: { windowLocation: 'hatch', windowPosition: 'closed' } },
            ],
          },
        },
        {
          capabilityIdentifier: 'windscreen',
          state: {
            wipers: { value: 'inactive' },
            wipersIntensity: { value: 'level_0' },
            windscreenDamage: { value: 'no_impact_detected' },
            windscreenZoneMatrix: { value: { rows: 3, columns: 2 } },
            windscreenDamageZone: { value: { rows: 2, columns: 2 } },
            windscreenNeedsReplacement: { value: 'unknown' },
            windscreenDamageConfidence: { value: 0 },
            windscreenDamageDetectionTime: {
              value: new Date('2000-01-01T00:00:00.000Z'),
            },
          },
        },
      ],
    });
  });
});
