import Response from '../../src/Responses/Response';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleStatusResponse`, () => {
  it(`should return VehicleStatusResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00110101001401001131484d45443535303848433337414333350200040100010003000301000004001a0100174d697373696f6e20452063726f73732074757269736d6f05000c010009422d484d2d3838343907000501000207e108000301000009000501000200000a0004010001040b0004010001040c0007010004000000000d000501000200000e0004010001000f0004010001001000040100010011000301000012000a010007506f72736368659900e10100de002301020005010002001e03000b0100083fe999999999999a040007010004bf19999a050007010004bf19999a060007010004000000000700070100040000000008000b0100083ff000000000000009000501000200000a0007010004000000000b0004010001000c0004010001000e000701000441c800000f000401000101100004010001001100060100030010071300060100030010071400070100044219999a15000c01000900000001669baf11a915000c01000901000001669baf11a915000c01000902000001669baf11a91600040100010017000401000100990059010056005301010004010001010200040100010005000501000200150500050100020115060005010002002506000501000201250700050100020011070005010002011108000401000119090004010001370a0004010001e499007001006d00240101000701000441b800000200070100044190000003000701000441b8000004000701000441b0000006000401000100070004010001000800040100010009000701000441b80000050004010001000b00060100030508000b00060100030608000c000701000441b0000099002b0100280062010100040100010002000401000100030005010002000004000401000100050005010002000099011e01011b00610101000501000200000100050100020100010005010002020001000501000203000100050100020400010005010002050001000501000206000100050100020700010005010002080001000501000209000100050100020a000100050100020b000100050100020c000100050100020d000100050100020e000100050100020f0001000501000210000100050100021100010005010002120001000501000213000100050100021400010005010002150001000501000216000100050100021700010005010002180001000501000219000100050100021a000100050100021b000100050100021c000100050100021d000100050100021e000100050100021f0001000501000220000100050100022100010005010002220099016d01016a003301010006010003000bb802000501000200120300050100020000040005010002000005000b0100083fe999999999999a06000501000200c8090004010001000b0007010004414000000c0007010004000000000d000501000200000e000501000200000f00070100040000000010000401000100110005010002001712000701000441c00000130007010004441600001400040100010015000b0100083fc999999999999a16000b0100083fb999999999999a170005010002000018000b0100083fe999999999999a19000c010009000a000000000000001a000801000500401333331a000801000501401333331a000801000502401333331a000801000503401333331b000801000500422000001b000801000501422000001b000801000502422000001b000801000503422000001c00060100030000001c00060100030100001c00060100030200001c00060100030300001d0007010004000000001e000701000400000bb8990096010093002001020005010002000002000501000201000200050100020200020005010002030002000501000204000200050100020500030005010002000003000501000201000300050100020200030005010002030003000501000204000300050100020500040005010002000004000501000201000400050100020200040005010002030004000501000204000400050100020500990014010011003501010004010001000200040100010099001401001100400102000401000100030004010001009900ab0100a80060010100040100010002000401000100030004010001000400070100040000000005000401000100080004010001000900030100000a0004010001000b00030100000d0004010001000e00070100043f19999a0f00070100044248000010000701000400000000110013010010404a421cde5d1809402ac37d41743e9612000b010008000000000000000012000b010008010000000000000012000b010008020000000000000099000d01000a0026010100040100010099000d01000a0067010100040100010099001a010017005401010007010004461c4000020007010004447a000099006b01006800360101000401000100020004010001000400060100030000ff05000401000100060004010001000700050100020000070005010002010008000501000200000800050100020100080005010002020008000501000203000900050100020000090005010002010099008201007f003401010005010002019002000601000300753003000401000100040004010001000500040100010006000501000200000700040100010008000b010008000001669baf11a909000b010008000001669baf11a90a000b010008000001669baf11a90b000c0100091208007b00000000000c000b010008000001669baf11a999000d01000a00660101000401000100990047010044003101070013010010404a421cde5d1809402ac37d41743e96020028010025416c6578616e646572706c61747a2c203130313738204265726c696e2c204765726d616e7999001c010019005201010005010002000002000b010008000000000000000099000d01000a005801010004010001009900350100320047010100040100010002000301000003000301000004000b0100080000016906152e2205000b0100080000016906152e2299001401001100650101000401000100020004010001009900d40100d1005701010008010005000000000001000801000501000000000100080100050200000000010008010005030000000002000b010008000000000000000003000b010008000000000000000004000b010008000000000000000005000401000100060007010004000000000700070100040000000008000401000100090004010001000a000501000200000a000501000201000b0004010001000c0004010001000d000b01000800000000000000000e0004010001000f00040100010010000401000100110004010001001200040100010099003701003400250101000b010008000000000000000002000b01000800000000000000000300040100010004000401000100050004010001009900460100430056010200050100020000020005010002010002000501000202000200050100020300030005010002000003000501000201000300050100020200030005010002030099000d01000a00630101000401000100990053010050006401010005010002010001000501000202000200050100020100020005010002020003000501000201000300050100020200040004010001000500040100010006000401000100070005010002000099000d01000a0046010100040100010099001401001100500101000b0100080000016906152e259900140100110021010100040100010102000401000100990119010116006801010005010002012c020005010002012c03000b0100083fe000000000000004000b0100083fe000000000000005000c010009003fd999999999999a05000c010009013fd999999999999a05000c010009023fd999999999999a05000c010009033fd999999999999a05000c010009043fd999999999999a060008010005004204cccd060008010005014204cccd060008010005024204cccd060008010005034204cccd060008010005044204cccd07000701000442ca999a08000701000441b400000900060100030175900a000b0100083fc999999999999a0b000701000440b5c28f0c000b0100083fe00000000000000d000b010008000001669baf11a90e000701000440c666660f0007010004410b333399000d01000a00280101000401000100990038010035003001040013010010404a421cde5d1809402ac37d41743e9605000b010008404a428f9f44d44506000b0100084060b0000000000099001401001100550101000b010008000000000000000099002101001e00590101000401000100020004010001000300030100000400040100010099007901007600450102000c01000900000000000000000002000c01000901000000000000000002000c01000902000000000000000002000c01000903000000000000000002000c0100090400000000000000000300050100020000030005010002010003000501000202000300050100020300030005010002040099004c01004900420101000401000100020004010001000300040100010004000401000132050004010001220600040100010007000b010008000000000000000008000b010008000000dc6acfac00a2000b010008000001690615bc8d'
      )
    );

    expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);

    expect(response.parse()).toEqual({
      vin: { data: '1HMED5508HC37AC35' },
      powertrain: { data: 'unknown' },
      modelName: { data: '' },
      name: { data: 'Mission E cross turismo' },
      licensePlate: { data: 'B-HM-8849' },
      modelYear: { data: 2017 },
      colorName: { data: '' },
      powerInKw: { data: 0 },
      numberOfDoors: { data: 4 },
      numberOfSeats: { data: 4 },
      engineVolume: { data: 0 },
      engineMaxTorque: { data: 0 },
      gearbox: { data: 'manual' },
      displayUnit: { data: 'km' },
      driverSeatLocation: { data: 'left' },
      equipments: [{ data: '' }],
      brand: { data: 'Porsche' },
      states: [
        {
          capabilityIdentifier: 'charging',
          state: {
            estimatedRange: { data: 30 },
            batteryLevel: { data: 0.8 },
            batteryCurrentAC: { data: -0.6 },
            batteryCurrentDC: { data: -0.6 },
            chargerVoltageAC: { data: 0 },
            chargerVoltageDC: { data: 0 },
            chargeLimit: { data: 1 },
            timeToCompleteCharge: { data: 0 },
            chargingRateKW: { data: 0 },
            chargePortState: { data: 'closed' },
            chargeMode: { data: 'immediate' },
            maxChargingCurrent: { data: 25 },
            plugType: { data: 'type_2' },
            chargingWindowChosen: { data: 'not_chosen' },
            departureTimes: [
              { data: { activeState: 'inactive', hour: 9, minute: 51 } },
            ],
            reductionTimes: [
              { data: { startStop: 'start', hour: 9, minute: 51 } },
            ],
            batteryTemperature: { data: 38.4 },
            timers: [
              {
                data: {
                  timerType: 'preferred_start_time',
                  time: '2018-10-22T12:10:33.769Z',
                },
              },
              {
                data: {
                  timerType: 'preferred_end_time',
                  time: '2018-10-22T12:10:33.769Z',
                },
              },
              {
                data: {
                  timerType: 'departure_time',
                  time: '2018-10-22T12:10:33.769Z',
                },
              },
            ],
            pluggedIn: { data: 'disconnected' },
            activeState: { data: 'not_charging' },
          },
        },
        {
          capabilityIdentifier: 'chassis_settings',
          state: {
            drivingMode: { data: 'eco' },
            sportChrono: { data: 'inactive' },
            currentSpringRates: [
              { data: { axle: 'front_axle', springRate: 21 } },
              { data: { axle: 'rear_axle', springRate: 21 } },
            ],
            maximumSpringRates: [
              { data: { axle: 'front_axle', springRate: 37 } },
              { data: { axle: 'rear_axle', springRate: 37 } },
            ],
            minimumSpringRates: [
              { data: { axle: 'front_axle', springRate: 17 } },
              { data: { axle: 'rear_axle', springRate: 17 } },
            ],
            currentChassisPosition: { data: 25 },
            maximumChassisPosition: { data: 55 },
            minimumChassisPosition: { data: -28 },
          },
        },
        {
          capabilityIdentifier: 'climate',
          state: {
            insideTemperature: { data: 23 },
            outsideTemperature: { data: 18 },
            driverTemperatureSetting: { data: 23 },
            passengerTemperatureSetting: { data: 22 },
            defoggingState: { data: 'inactive' },
            defrostingState: { data: 'inactive' },
            ionisingState: { data: 'inactive' },
            defrostingTemperature: { data: 23 },
            hvacState: { data: 'inactive' },
            hvacWeekdayStartingTimes: [
              { data: { weekday: 'monday', hour: 18, minute: 30 } },
              { data: { weekday: 'friday', hour: 18, minute: 30 } },
            ],
            rearTemperatureSetting: { data: 22 },
          },
        },
        {
          capabilityIdentifier: 'cruise_control',
          state: {
            cruiseControl: { data: 'inactive' },
            limiter: { data: 'not_set' },
            targetSpeed: { data: 0 },
            acc: { data: 'inactive' },
            accTargetSpeed: { data: 0 },
          },
        },
        {
          capabilityIdentifier: 'dashboard_lights',
          state: {
            dashboardLights: [
              { data: { lightName: 'high_beam', state: 'inactive' } },
              { data: { lightName: 'low_beam', state: 'inactive' } },
              { data: { lightName: 'hazard_warning', state: 'inactive' } },
              { data: { lightName: 'brake_failure', state: 'inactive' } },
              { data: { lightName: 'hatch_open', state: 'inactive' } },
              { data: { lightName: 'fuel_level', state: 'inactive' } },
              {
                data: {
                  lightName: 'engine_coolant_temperature',
                  state: 'inactive',
                },
              },
              {
                data: {
                  lightName: 'battery_charging_condition',
                  state: 'inactive',
                },
              },
              { data: { lightName: 'engine_oil', state: 'inactive' } },
              { data: { lightName: 'position_lights', state: 'inactive' } },
              { data: { lightName: 'front_fog_light', state: 'inactive' } },
              { data: { lightName: 'rear_fog_light', state: 'inactive' } },
              { data: { lightName: 'park_heating', state: 'inactive' } },
              { data: { lightName: 'engine_indicator', state: 'inactive' } },
              { data: { lightName: 'service_call', state: 'inactive' } },
              {
                data: {
                  lightName: 'transmission_fluid_temperature',
                  state: 'inactive',
                },
              },
              {
                data: { lightName: 'transmission_failure', state: 'inactive' },
              },
              {
                data: {
                  lightName: 'anti_lock_brake_failure',
                  state: 'inactive',
                },
              },
              { data: { lightName: 'worn_brake_linings', state: 'inactive' } },
              {
                data: {
                  lightName: 'windscreen_washer_fluid',
                  state: 'inactive',
                },
              },
              { data: { lightName: 'tire_failure', state: 'inactive' } },
              { data: { lightName: 'engine_oil_level', state: 'inactive' } },
              {
                data: { lightName: 'engine_coolant_level', state: 'inactive' },
              },
              { data: { lightName: 'steering_failure', state: 'inactive' } },
              { data: { lightName: 'esc_indication', state: 'inactive' } },
              { data: { lightName: 'brake_lights', state: 'inactive' } },
              { data: { lightName: 'adblue_level', state: 'inactive' } },
              {
                data: {
                  lightName: 'fuel_filter_diff_pressure',
                  state: 'inactive',
                },
              },
              { data: { lightName: 'seat_belt', state: 'inactive' } },
              { data: { lightName: 'advanced_braking', state: 'inactive' } },
              { data: { lightName: 'acc', state: 'inactive' } },
              { data: { lightName: 'trailer_connected', state: 'inactive' } },
              { data: { lightName: 'airbag', state: 'inactive' } },
              { data: { lightName: 'esc_switched_off', state: 'inactive' } },
              {
                data: {
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
            mileage: { data: 3000 },
            engineOilTemperature: { data: 18 },
            speed: { data: 0 },
            engineRPM: { data: 0 },
            fuelLevel: { data: 0.8 },
            estimatedRange: { data: 200 },
            washerFluidLevel: { data: 'low' },
            batteryVoltage: { data: 12 },
            adblueLevel: { data: 0 },
            distanceSinceReset: { data: 0 },
            distanceSinceStart: { data: 0 },
            fuelVolume: { data: 0 },
            antiLockBraking: { data: 'inactive' },
            engineCoolantTemperature: { data: 23 },
            engineTotalOperatingHours: { data: 24 },
            engineTotalFuelConsumption: { data: 600 },
            brakeFluidLevel: { data: 'low' },
            engineTorque: { data: 0.2 },
            engineLoad: { data: 0.1 },
            wheelBasedSpeed: { data: 0 },
            batteryLevel: { data: 0.8 },
            checkControlMessages: {
              data: [{ id: 10, remainingMinutes: 0, text: '', status: '' }],
            },
            tirePressures: [
              { data: { location: 'front_left', pressure: 2.3 } },
              { data: { location: 'front_right', pressure: 2.3 } },
              { data: { location: 'rear_right', pressure: 2.3 } },
              { data: { location: 'rear_left', pressure: 2.3 } },
            ],
            tireTemperatures: [
              { data: { location: 'front_left', temperature: 40 } },
              { data: { location: 'front_right', temperature: 40 } },
              { data: { location: 'rear_right', temperature: 40 } },
              { data: { location: 'rear_left', temperature: 40 } },
            ],
            wheelRpms: [
              { data: { location: 'front_left', rpm: 0 } },
              { data: { location: 'front_right', rpm: 0 } },
              { data: { location: 'rear_right', rpm: 0 } },
              { data: { location: 'rear_left', rpm: 0 } },
            ],
            troubleCodes: {
              data: [{ occurences: 0, id: '', ecuId: '', status: '' }],
            },
            mileageMeters: { data: 3000 },
          },
        },
        {
          capabilityIdentifier: 'door_locks',
          state: {
            insideLocks: [
              { data: { doorLocation: 'front_left', lockState: 'unlocked' } },
              { data: { doorLocation: 'front_right', lockState: 'unlocked' } },
              { data: { doorLocation: 'rear_right', lockState: 'unlocked' } },
              { data: { doorLocation: 'rear_left', lockState: 'unlocked' } },
              { data: { doorLocation: 'hatch', lockState: 'unlocked' } },
              { data: { doorLocation: 'all', lockState: 'unlocked' } },
            ],
            locks: [
              { data: { doorLocation: 'front_left', lockState: 'unlocked' } },
              { data: { doorLocation: 'front_right', lockState: 'unlocked' } },
              { data: { doorLocation: 'rear_right', lockState: 'unlocked' } },
              { data: { doorLocation: 'rear_left', lockState: 'unlocked' } },
              { data: { doorLocation: 'hatch', lockState: 'unlocked' } },
              { data: { doorLocation: 'all', lockState: 'unlocked' } },
            ],
            positions: [
              { data: { doorLocation: 'front_left', position: 'closed' } },
              { data: { doorLocation: 'front_right', position: 'closed' } },
              { data: { doorLocation: 'rear_right', position: 'closed' } },
              { data: { doorLocation: 'rear_left', position: 'closed' } },
              { data: { doorLocation: 'hatch', position: 'closed' } },
              { data: { doorLocation: 'all', position: 'closed' } },
            ],
          },
        },
        {
          capabilityIdentifier: 'engine',
          state: {
            ignition: { data: 'engine_off' },
            accessoriesIgnition: { data: 'powered_off' },
          },
        },
        {
          capabilityIdentifier: 'fueling',
          state: {
            gasFlapLock: { data: 'unlocked' },
            gasFlapPosition: { data: 'closed' },
          },
        },
        {
          capabilityIdentifier: 'home_charger',
          state: {
            charging: { data: 'disconnected' },
            authenticationMechanism: { data: 'pin' },
            plugType: { data: 'type_1' },
            chargingPower: { data: 0 },
            solarCharging: { data: 'deactivated' },
            hotspotEnabled: { data: 'disabled' },
            hotspotSSID: { data: '' },
            wiFiHotspotSecurity: { data: 'none' },
            wiFiHotspotPassword: { data: '' },
            authentication: { data: 'unauthenticated' },
            chargeCurrentDC: { data: 0.6 },
            maximumChargeCurrent: { data: 50 },
            minimumChargeCurrent: { data: 0 },
            coordinates: {
              data: { latitude: 52.516506, longitude: 13.381815 },
            },
            priceTariffs: [
              { data: { pricingType: 'starting_fee', price: 0, currency: '' } },
              { data: { pricingType: 'per_minute', price: 0, currency: '' } },
              { data: { pricingType: 'per_kwh', price: 0, currency: '' } },
            ],
          },
        },
        {
          capabilityIdentifier: 'honk_horn_flash_lights',
          state: { flashers: { data: 'inactive' } },
        },
        {
          capabilityIdentifier: 'hood',
          state: { position: { data: 'closed' } },
        },
        {
          capabilityIdentifier: 'light_conditions',
          state: { outsideLight: { data: 10000 }, insideLight: { data: 1000 } },
        },
        {
          capabilityIdentifier: 'lights',
          state: {
            frontExteriorLight: { data: 'automatic' },
            rearExteriorLight: { data: 'active' },
            ambientLight: { data: '#ff0000' },
            reverseLight: { data: 'inactive' },
            emergencyBrakeLight: { data: 'inactive' },
            fogLights: [
              { data: { location: 'front', state: 'active' } },
              { data: { location: 'rear', state: 'active' } },
            ],
            readingLamps: [
              { data: { location: 'front_left', state: 'active' } },
              { data: { location: 'front_right', state: 'active' } },
              { data: { location: 'rear_right', state: 'active' } },
              { data: { location: 'rear_left', state: 'active' } },
            ],
            interiorLights: [
              { data: { location: 'front', state: 'active' } },
              { data: { location: 'rear', state: 'active' } },
            ],
          },
        },
        {
          capabilityIdentifier: 'maintenance',
          state: {
            daysToNextService: { data: 400 },
            kilometersToNextService: { data: 30000 },
            cbsReportsCount: { data: 0 },
            monthsToExhaustInspection: { data: 0 },
            teleserviceAvailability: { data: 'pending' },
            serviceDistanceThreshold: { data: 0 },
            serviceTimeThreshold: { data: 0 },
            automaticTeleserviceCallDate: { data: '2018-10-22T12:10:33.769Z' },
            teleserviceBatteryCallDate: { data: '2018-10-22T12:10:33.769Z' },
            nextInspectionDate: { data: '2018-10-22T12:10:33.769Z' },
            conditionBasedServices: {
              data: [
                {
                  year: 2018,
                  month: 8,
                  cbsIdentifier: 123,
                  dueStatus: 'ok',
                  cbsText: '',
                  description: '',
                },
              ],
            },
            brakeFluidChangeDate: { data: '2018-10-22T12:10:33.769Z' },
          },
        },
        {
          capabilityIdentifier: 'mobile',
          state: { connection: { data: 'disconnected' } },
        },
        {
          capabilityIdentifier: 'navi_destination',
          state: {
            coordinates: {
              data: { latitude: 52.516506, longitude: 13.381815 },
            },
            destinationName: { data: 'Alexanderplatz, 10178 Berlin, Germany' },
          },
        },
        {
          capabilityIdentifier: 'offroad',
          state: { routeIncline: { data: 0 }, wheelSuspension: { data: 0 } },
        },
        {
          capabilityIdentifier: 'parking_brake',
          state: { parkingBrake: { data: 'inactive' } },
        },
        {
          capabilityIdentifier: 'parking_ticket',
          state: {
            parkingTicketState: { data: 'ended' },
            operatorName: { data: '' },
            operatorTicketID: { data: '' },
            ticketStartTime: { data: '2019-02-20T07:51:08.968Z' },
            ticketEndTime: { data: '2019-02-20T07:51:08.968Z' },
          },
        },
        {
          capabilityIdentifier: 'power_takeoff',
          state: {
            powerTakeoff: { data: 'inactive' },
            powerTakeoffEngaged: { data: 'not_engaged' },
          },
        },
        {
          capabilityIdentifier: 'race',
          state: {
            accelerations: [
              { data: { type: 'longitudinal_acceleration', gForce: 0 } },
              { data: { type: 'lateral_acceleration', gForce: 0 } },
              { data: { type: 'front_lateral_acceleration', gForce: 0 } },
              { data: { type: 'rear_lateral_acceleration', gForce: 0 } },
            ],
            understeering: { data: 0 },
            oversteering: { data: 0 },
            gasPedalPosition: { data: 0 },
            steeringAngle: { data: 0 },
            brakePressure: { data: 0 },
            yawRate: { data: 0 },
            rearSuspensionSteering: { data: 0 },
            electronicStabilityProgram: { data: 'inactive' },
            brakeTorqueVectorings: [
              { data: { axle: 'front_axle', vectoring: 'inactive' } },
              { data: { axle: 'rear_axle', vectoring: 'inactive' } },
            ],
            gearMode: { data: 'manual' },
            selectedGear: { data: 0 },
            brakePedalPosition: { data: 0 },
            brakePedalSwitch: { data: 'inactive' },
            clutchPedalSwitch: { data: 'inactive' },
            acceleratorPedalIdleSwitch: { data: 'inactive' },
            acceleratorPedalKickdownSwitch: { data: 'inactive' },
            vehicleMoving: { data: 'not_moving' },
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: { data: 0 },
            position: { data: 0 },
            convertibleRoof: { data: 'closed' },
            sunroofTilt: { data: 'closed' },
            sunroofState: { data: 'closed' },
          },
        },
        {
          capabilityIdentifier: 'seats',
          state: {
            personsDetected: [
              {
                data: {
                  seatPosition: 'front_left',
                  personDetected: 'not_detected',
                },
              },
              {
                data: {
                  seatPosition: 'front_right',
                  personDetected: 'not_detected',
                },
              },
              {
                data: {
                  seatPosition: 'rear_right',
                  personDetected: 'not_detected',
                },
              },
              {
                data: {
                  seatPosition: 'rear_left',
                  personDetected: 'not_detected',
                },
              },
            ],
            seatbeltsFastened: [
              {
                data: {
                  seatPosition: 'front_left',
                  seatbeltFastened: 'not_fastened',
                },
              },
              {
                data: {
                  seatPosition: 'front_right',
                  seatbeltFastened: 'not_fastened',
                },
              },
              {
                data: {
                  seatPosition: 'rear_right',
                  seatbeltFastened: 'not_fastened',
                },
              },
              {
                data: {
                  seatPosition: 'rear_left',
                  seatbeltFastened: 'not_fastened',
                },
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'start_stop',
          state: { startStop: { data: 'inactive' } },
        },
        {
          capabilityIdentifier: 'tachograph',
          state: {
            driverWorkingStates: [
              { data: { driverNumber: 1, workingState: 'resting' } },
              { data: { driverNumber: 2, workingState: 'resting' } },
            ],
            driverTimeStates: [
              { data: { driverNumber: 1, timeState: 'normal' } },
              { data: { driverNumber: 2, timeState: 'normal' } },
            ],
            driverCards: [
              { data: { driverNumber: 1, card: 'not_present' } },
              { data: { driverNumber: 2, card: 'not_present' } },
            ],
            vehicleMotion: { data: 'not_detected' },
            vehicleOverspeed: { data: 'no_overspeed' },
            vehicleDirection: { data: 'forward' },
            vehicleSpeed: { data: 0 },
          },
        },
        {
          capabilityIdentifier: 'theft_alarm',
          state: { theftAlarm: { data: 'not_armed' } },
        },
        {
          capabilityIdentifier: 'vehicle_time',
          state: { vehicleTime: { data: '2019-02-20T07:51:08.972Z' } },
        },
        {
          capabilityIdentifier: 'trunk',
          state: {
            trunkLock: { data: 'locked' },
            trunkPosition: { data: 'closed' },
          },
        },
        {
          capabilityIdentifier: 'usage',
          state: {
            averageWeeklyDistance: { data: 300 },
            averageWeeklyDistanceLongRun: { data: 300 },
            accelerationEvaluation: { data: 0.5 },
            drivingStyleEvaluation: { data: 0.5 },
            drivingModesActivationPeriods: [
              { data: { drivingMode: 'regular', period: 0.4 } },
              { data: { drivingMode: 'eco', period: 0.4 } },
              { data: { drivingMode: 'sport', period: 0.4 } },
              { data: { drivingMode: 'sport_plus', period: 0.4 } },
              { data: { drivingMode: 'eco_plus', period: 0.4 } },
            ],
            drivingModesEnergyConsumptions: [
              { data: { drivingMode: 'regular', consumption: 33.2 } },
              { data: { drivingMode: 'eco', consumption: 33.2 } },
              { data: { drivingMode: 'sport', consumption: 33.2 } },
              { data: { drivingMode: 'sport_plus', consumption: 33.2 } },
              { data: { drivingMode: 'eco_plus', consumption: 33.2 } },
            ],
            lastTripEnergyConsumption: { data: 101.3 },
            lastTripFuelConsumption: { data: 22.5 },
            mileageAfterLastTrip: { data: 95632 },
            lastTripElectricPortion: { data: 0.2 },
            lastTripAverageEnergyRecuperation: { data: 5.68 },
            lastTripBatteryRemaining: { data: 0.5 },
            lastTripDate: { data: '2018-10-22T12:10:33.769Z' },
            averageFuelConsumption: { data: 6.2 },
            currentFuelConsumption: { data: 8.7 },
          },
        },
        {
          capabilityIdentifier: 'valet_mode',
          state: { valetMode: { data: 'deactivated' } },
        },
        {
          capabilityIdentifier: 'vehicle_location',
          state: {
            coordinates: {
              data: { latitude: 52.516506, longitude: 13.381815 },
            },
            heading: { data: 52.520008 },
            altitude: { data: 133.5 },
          },
        },
        {
          capabilityIdentifier: 'weather_conditions',
          state: { rainIntensity: { data: 0 } },
        },
        {
          capabilityIdentifier: 'wi_fi',
          state: {
            wifiEnabled: { data: 'disabled' },
            networkConnected: { data: 'disconnected' },
            networkSSID: { data: '' },
            networkSecurity: { data: 'none' },
          },
        },
        {
          capabilityIdentifier: 'windows',
          state: {
            windowsOpenPercentages: [
              { data: { windowLocation: 'front_left', openPercentage: 0 } },
              { data: { windowLocation: 'front_right', openPercentage: 0 } },
              { data: { windowLocation: 'rear_right', openPercentage: 0 } },
              { data: { windowLocation: 'rear_left', openPercentage: 0 } },
              { data: { windowLocation: 'hatch', openPercentage: 0 } },
            ],
            windowsPositions: [
              {
                data: {
                  windowLocation: 'front_left',
                  windowPosition: 'closed',
                },
              },
              {
                data: {
                  windowLocation: 'front_right',
                  windowPosition: 'closed',
                },
              },
              {
                data: {
                  windowLocation: 'rear_right',
                  windowPosition: 'closed',
                },
              },
              {
                data: { windowLocation: 'rear_left', windowPosition: 'closed' },
              },
              { data: { windowLocation: 'hatch', windowPosition: 'closed' } },
            ],
          },
        },
        {
          capabilityIdentifier: 'windscreen',
          state: {
            wipers: { data: 'inactive' },
            wipersIntensity: { data: 'level_0' },
            windscreenDamage: { data: 'no_impact_detected' },
            windscreenZoneMatrix: { data: { rows: 3, columns: 2 } },
            windscreenDamageZone: { data: { rows: 2, columns: 2 } },
            windscreenNeedsReplacement: { data: 'unknown' },
            windscreenDamageConfidence: { data: 0 },
            windscreenDamageDetectionTime: { data: '2000-01-01T00:00:00.000Z' },
          },
        },
      ],
    });

    expect(response.parse()).toEqual({
      vin: '1HMED5508HC37AC35',
      powertrain: 'unknown',
      modelName: '',
      name: 'Mission E cross turismo',
      licensePlate: 'B-HM-8849',
      modelYear: 2017,
      colorName: '',
      powerInKw: 0,
      numberOfDoors: 4,
      numberOfSeats: 4,
      engineVolume: 0,
      engineMaxTorque: 0,
      gearbox: 'manual',
      displayUnit: 'km',
      driverSeatLocation: 'left',
      equipments: [''],
      brand: 'Porsche',
      states: [
        {
          capabilityIdentifier: 'door_locks',
          state: {
            insideLocks: [
              { doorLocation: 'front_left', lockState: 'locked' },
              { doorLocation: 'front_right', lockState: 'locked' },
              { doorLocation: 'rear_right', lockState: 'locked' },
              { doorLocation: 'rear_left', lockState: 'locked' },
              { doorLocation: 'all', lockState: 'locked' },
            ],
            locks: [
              { doorLocation: 'front_left', lockState: 'locked' },
              { doorLocation: 'front_right', lockState: 'locked' },
              { doorLocation: 'rear_right', lockState: 'locked' },
              { doorLocation: 'rear_left', lockState: 'locked' },
              { doorLocation: 'all', lockState: 'locked' },
            ],
            positions: [
              { doorLocation: 'front_left', position: 'closed' },
              { doorLocation: 'front_right', position: 'closed' },
              { doorLocation: 'rear_right', position: 'closed' },
              { doorLocation: 'rear_left', position: 'closed' },
              { doorLocation: 'all', position: 'closed' },
            ],
          },
        },
        {
          capabilityIdentifier: 'trunk',
          state: { trunkLock: 'unlocked', trunkPosition: 'closed' },
        },
        {
          capabilityIdentifier: 'charging',
          state: {
            estimatedRange: 30,
            batteryLevel: 0.8,
            batteryCurrentAC: -0.6,
            batteryCurrentDC: -0.6,
            chargerVoltageAC: 0,
            chargerVoltageDC: 0,
            chargeLimit: 1,
            timeToCompleteCharge: 0,
            chargingRateKW: 0,
            chargePortState: 'closed',
            chargeMode: 'immediate',
            maxChargingCurrent: 25,
            plugType: 'type_2',
            chargingWindowChosen: 'not_chosen',
            departureTimes: [{ activeState: 'inactive', hour: 16, minute: 7 }],
            reductionTimes: [{ startStop: 'start', hour: 16, minute: 7 }],
            batteryTemperature: 38.4,
            timers: [
              {
                timerType: 'preferred_start_time',
                time: new Date('2018-10-22T12:10:33.769Z'),
              },
              {
                timerType: 'preferred_end_time',
                time: new Date('2018-10-22T12:10:33.769Z'),
              },
              {
                timerType: 'departure_time',
                time: new Date('2018-10-22T12:10:33.769Z'),
              },
            ],
            pluggedIn: 'disconnected',
            activeState: 'not_charging',
          },
        },
        {
          capabilityIdentifier: 'chassis_settings',
          state: {
            drivingMode: 'eco',
            sportChrono: 'inactive',
            currentSpringRates: [
              { axle: 'front_axle', springRate: 21 },
              { axle: 'rear_axle', springRate: 21 },
            ],
            maximumSpringRates: [
              { axle: 'front_axle', springRate: 37 },
              { axle: 'rear_axle', springRate: 37 },
            ],
            minimumSpringRates: [
              { axle: 'front_axle', springRate: 17 },
              { axle: 'rear_axle', springRate: 17 },
            ],
            currentChassisPosition: 25,
            maximumChassisPosition: 55,
            minimumChassisPosition: -28,
          },
        },
        {
          capabilityIdentifier: 'climate',
          state: {
            insideTemperature: 23,
            outsideTemperature: 18,
            driverTemperatureSetting: 23,
            passengerTemperatureSetting: 22,
            defoggingState: 'inactive',
            defrostingState: 'inactive',
            ionisingState: 'inactive',
            defrostingTemperature: 23,
            hvacState: 'inactive',
            hvacWeekdayStartingTimes: [
              { weekday: 'saturday', hour: 8, minute: 0 },
              { weekday: 'sunday', hour: 8, minute: 0 },
            ],
            rearTemperatureSetting: 22,
          },
        },
        {
          capabilityIdentifier: 'cruise_control',
          state: {
            cruiseControl: 'inactive',
            limiter: 'not_set',
            targetSpeed: 0,
            acc: 'inactive',
            accTargetSpeed: 0,
          },
        },
        {
          capabilityIdentifier: 'dashboard_lights',
          state: {
            dashboardLights: [
              { lightName: 'high_beam', state: 'inactive' },
              { lightName: 'low_beam', state: 'inactive' },
              { lightName: 'hazard_warning', state: 'inactive' },
              { lightName: 'brake_failure', state: 'inactive' },
              { lightName: 'hatch_open', state: 'inactive' },
              { lightName: 'fuel_level', state: 'inactive' },
              { lightName: 'engine_coolant_temperature', state: 'inactive' },
              { lightName: 'battery_charging_condition', state: 'inactive' },
              { lightName: 'engine_oil', state: 'inactive' },
              { lightName: 'position_lights', state: 'inactive' },
              { lightName: 'front_fog_light', state: 'inactive' },
              { lightName: 'rear_fog_light', state: 'inactive' },
              { lightName: 'park_heating', state: 'inactive' },
              { lightName: 'engine_indicator', state: 'inactive' },
              { lightName: 'service_call', state: 'inactive' },
              {
                lightName: 'transmission_fluid_temperature',
                state: 'inactive',
              },
              { lightName: 'transmission_failure', state: 'inactive' },
              { lightName: 'anti_lock_brake_failure', state: 'inactive' },
              { lightName: 'worn_brake_linings', state: 'inactive' },
              { lightName: 'windscreen_washer_fluid', state: 'inactive' },
              { lightName: 'tire_failure', state: 'inactive' },
              { lightName: 'engine_oil_level', state: 'inactive' },
              { lightName: 'engine_coolant_level', state: 'inactive' },
              { lightName: 'steering_failure', state: 'inactive' },
              { lightName: 'esc_indication', state: 'inactive' },
              { lightName: 'brake_lights', state: 'inactive' },
              { lightName: 'adblue_level', state: 'inactive' },
              { lightName: 'fuel_filter_diff_pressure', state: 'inactive' },
              { lightName: 'seat_belt', state: 'inactive' },
              { lightName: 'advanced_braking', state: 'inactive' },
              { lightName: 'acc', state: 'inactive' },
              { lightName: 'trailer_connected', state: 'inactive' },
              { lightName: 'airbag', state: 'inactive' },
              { lightName: 'esc_switched_off', state: 'inactive' },
              { lightName: 'lane_departure_warning_off', state: 'inactive' },
            ],
          },
        },
        {
          capabilityIdentifier: 'diagnostics',
          state: {
            mileage: 3000,
            engineOilTemperature: 18,
            speed: 0,
            engineRPM: 0,
            fuelLevel: 0.8,
            estimatedRange: 200,
            washerFluidLevel: 'low',
            batteryVoltage: 12,
            adblueLevel: 0,
            distanceSinceReset: 0,
            distanceSinceStart: 0,
            fuelVolume: 0,
            antiLockBraking: 'inactive',
            engineCoolantTemperature: 23,
            engineTotalOperatingHours: 24,
            engineTotalFuelConsumption: 600,
            brakeFluidLevel: 'low',
            engineTorque: 0.2,
            engineLoad: 0.1,
            wheelBasedSpeed: 0,
            batteryLevel: 0.8,
            checkControlMessages: [
              { id: 10, remainingMinutes: 0, text: '', status: '' },
            ],
            tirePressures: [
              { location: 'front_left', pressure: 2.3 },
              { location: 'front_right', pressure: 2.3 },
              { location: 'rear_right', pressure: 2.3 },
              { location: 'rear_left', pressure: 2.3 },
            ],
            tireTemperatures: [
              { location: 'front_left', temperature: 40 },
              { location: 'front_right', temperature: 40 },
              { location: 'rear_right', temperature: 40 },
              { location: 'rear_left', temperature: 40 },
            ],
            wheelRpms: [
              { location: 'front_left', rpm: 0 },
              { location: 'front_right', rpm: 0 },
              { location: 'rear_right', rpm: 0 },
              { location: 'rear_left', rpm: 0 },
            ],
            troubleCodes: [{ occurences: 0, id: '', ecuId: '', status: '' }],
            mileageMeters: 3000,
          },
        },
        {
          capabilityIdentifier: 'engine',
          state: { ignition: 'engine_off', accessoriesIgnition: 'powered_off' },
        },
        {
          capabilityIdentifier: 'fueling',
          state: { gasFlapLock: 'unlocked', gasFlapPosition: 'closed' },
        },
        {
          capabilityIdentifier: 'home_charger',
          state: {
            charging: 'disconnected',
            authenticationMechanism: 'pin',
            plugType: 'type_1',
            chargingPower: 0,
            solarCharging: 'deactivated',
            hotspotEnabled: 'disabled',
            hotspotSSID: '',
            wiFiHotspotSecurity: 'none',
            wiFiHotspotPassword: '',
            authentication: 'unauthenticated',
            chargeCurrentDC: 0.6,
            maximumChargeCurrent: 50,
            minimumChargeCurrent: 0,
            coordinates: { latitude: 52.516506, longitude: 13.381815 },
            priceTariffs: [
              { pricingType: 'starting_fee', price: 0, currency: '' },
              { pricingType: 'per_minute', price: 0, currency: '' },
              { pricingType: 'per_kwh', price: 0, currency: '' },
            ],
          },
        },
        {
          capabilityIdentifier: 'honk_horn_flash_lights',
          state: { flashers: 'inactive' },
        },
        { capabilityIdentifier: 'hood', state: { position: 'closed' } },
        {
          capabilityIdentifier: 'light_conditions',
          state: { outsideLight: 10000, insideLight: 1000 },
        },
        {
          capabilityIdentifier: 'lights',
          state: {
            frontExteriorLight: 'inactive',
            rearExteriorLight: 'inactive',
            ambientLight: '#0000ff',
            reverseLight: 'inactive',
            emergencyBrakeLight: 'inactive',
            fogLights: [
              { location: 'front', state: 'inactive' },
              { location: 'rear', state: 'inactive' },
            ],
            readingLamps: [
              { location: 'front_left', state: 'inactive' },
              { location: 'front_right', state: 'inactive' },
              { location: 'rear_right', state: 'inactive' },
              { location: 'rear_left', state: 'inactive' },
            ],
            interiorLights: [
              { location: 'front', state: 'inactive' },
              { location: 'rear', state: 'inactive' },
            ],
          },
        },
        {
          capabilityIdentifier: 'maintenance',
          state: {
            daysToNextService: 400,
            kilometersToNextService: 30000,
            cbsReportsCount: 0,
            monthsToExhaustInspection: 0,
            teleserviceAvailability: 'pending',
            serviceDistanceThreshold: 0,
            serviceTimeThreshold: 0,
            automaticTeleserviceCallDate: new Date('2018-10-22T12:10:33.769Z'),
            teleserviceBatteryCallDate: new Date('2018-10-22T12:10:33.769Z'),
            nextInspectionDate: new Date('2018-10-22T12:10:33.769Z'),
            conditionBasedServices: [
              {
                year: 2018,
                month: 8,
                cbsIdentifier: 123,
                dueStatus: 'ok',
                cbsText: '',
                description: '',
              },
            ],
            brakeFluidChangeDate: new Date('2018-10-22T12:10:33.769Z'),
          },
        },
        {
          capabilityIdentifier: 'mobile',
          state: { connection: 'disconnected' },
        },
        {
          capabilityIdentifier: 'navi_destination',
          state: {
            coordinates: { latitude: 52.516506, longitude: 13.381815 },
            destinationName: 'Alexanderplatz, 10178 Berlin, Germany',
          },
        },
        {
          capabilityIdentifier: 'offroad',
          state: { routeIncline: 0, wheelSuspension: 0 },
        },
        {
          capabilityIdentifier: 'parking_brake',
          state: { parkingBrake: 'inactive' },
        },
        {
          capabilityIdentifier: 'parking_ticket',
          state: {
            parkingTicketState: 'ended',
            operatorName: '',
            operatorTicketID: '',
            ticketStartTime: new Date('2019-02-19T14:07:25.218Z'),
            ticketEndTime: new Date('2019-02-19T14:07:25.218Z'),
          },
        },
        {
          capabilityIdentifier: 'power_takeoff',
          state: {
            powerTakeoff: 'inactive',
            powerTakeoffEngaged: 'not_engaged',
          },
        },
        {
          capabilityIdentifier: 'race',
          state: {
            accelerations: [
              { type: 'longitudinal_acceleration', gForce: 0 },
              { type: 'lateral_acceleration', gForce: 0 },
              { type: 'front_lateral_acceleration', gForce: 0 },
              { type: 'rear_lateral_acceleration', gForce: 0 },
            ],
            understeering: 0,
            oversteering: 0,
            gasPedalPosition: 0,
            steeringAngle: 0,
            brakePressure: 0,
            yawRate: 0,
            rearSuspensionSteering: 0,
            electronicStabilityProgram: 'inactive',
            brakeTorqueVectorings: [
              { axle: 'front_axle', vectoring: 'inactive' },
              { axle: 'rear_axle', vectoring: 'inactive' },
            ],
            gearMode: 'manual',
            selectedGear: 0,
            brakePedalPosition: 0,
            brakePedalSwitch: 'inactive',
            clutchPedalSwitch: 'inactive',
            acceleratorPedalIdleSwitch: 'inactive',
            acceleratorPedalKickdownSwitch: 'inactive',
            vehicleMoving: 'not_moving',
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: 0,
            position: 0,
            convertibleRoof: 'closed',
            sunroofTilt: 'closed',
            sunroofState: 'closed',
          },
        },
        {
          capabilityIdentifier: 'seats',
          state: {
            personsDetected: [
              { seatPosition: 'front_left', personDetected: 'not_detected' },
              { seatPosition: 'front_right', personDetected: 'not_detected' },
              { seatPosition: 'rear_right', personDetected: 'not_detected' },
              { seatPosition: 'rear_left', personDetected: 'not_detected' },
            ],
            seatbeltsFastened: [
              { seatPosition: 'front_left', seatbeltFastened: 'not_fastened' },
              { seatPosition: 'front_right', seatbeltFastened: 'not_fastened' },
              { seatPosition: 'rear_right', seatbeltFastened: 'not_fastened' },
              { seatPosition: 'rear_left', seatbeltFastened: 'not_fastened' },
            ],
          },
        },
        {
          capabilityIdentifier: 'start_stop',
          state: { startStop: 'inactive' },
        },
        {
          capabilityIdentifier: 'tachograph',
          state: {
            driverWorkingStates: [
              { driverNumber: 1, workingState: 'resting' },
              { driverNumber: 2, workingState: 'resting' },
            ],
            driverTimeStates: [
              { driverNumber: 1, timeState: 'normal' },
              { driverNumber: 2, timeState: 'normal' },
            ],
            driverCards: [
              { driverNumber: 1, card: 'not_present' },
              { driverNumber: 2, card: 'not_present' },
            ],
            vehicleMotion: 'not_detected',
            vehicleOverspeed: 'no_overspeed',
            vehicleDirection: 'forward',
            vehicleSpeed: 0,
          },
        },
        {
          capabilityIdentifier: 'theft_alarm',
          state: { theftAlarm: 'not_armed' },
        },
        {
          capabilityIdentifier: 'vehicle_time',
          state: { vehicleTime: new Date('2019-02-19T14:07:25.221Z') },
        },
        {
          capabilityIdentifier: 'trunk',
          state: { trunkLock: 'locked', trunkPosition: 'closed' },
        },
        {
          capabilityIdentifier: 'usage',
          state: {
            averageWeeklyDistance: 300,
            averageWeeklyDistanceLongRun: 300,
            accelerationEvaluation: 0.5,
            drivingStyleEvaluation: 0.5,
            drivingModesActivationPeriods: [
              { drivingMode: 'regular', period: 0.4 },
              { drivingMode: 'eco', period: 0.4 },
              { drivingMode: 'sport', period: 0.4 },
              { drivingMode: 'sport_plus', period: 0.4 },
              { drivingMode: 'eco_plus', period: 0.4 },
            ],
            drivingModesEnergyConsumptions: [
              { drivingMode: 'regular', consumption: 33.2 },
              { drivingMode: 'eco', consumption: 33.2 },
              { drivingMode: 'sport', consumption: 33.2 },
              { drivingMode: 'sport_plus', consumption: 33.2 },
              { drivingMode: 'eco_plus', consumption: 33.2 },
            ],
            lastTripEnergyConsumption: 101.3,
            lastTripFuelConsumption: 22.5,
            mileageAfterLastTrip: 95632,
            lastTripElectricPortion: 0.2,
            lastTripAverageEnergyRecuperation: 5.68,
            lastTripBatteryRemaining: 0.5,
            lastTripDate: new Date('2018-10-22T12:10:33.769Z'),
            averageFuelConsumption: 6.2,
            currentFuelConsumption: 8.7,
          },
        },
        {
          capabilityIdentifier: 'valet_mode',
          state: { valetMode: 'deactivated' },
        },
        {
          capabilityIdentifier: 'vehicle_location',
          state: {
            coordinates: { latitude: 52.516506, longitude: 13.381815 },
            heading: 52.520008,
            altitude: 133.5,
          },
        },
        {
          capabilityIdentifier: 'weather_conditions',
          state: { rainIntensity: 0 },
        },
        {
          capabilityIdentifier: 'wi_fi',
          state: {
            wifiEnabled: 'disabled',
            networkConnected: 'disconnected',
            networkSSID: '',
            networkSecurity: 'none',
          },
        },
        {
          capabilityIdentifier: 'windows',
          state: {
            windowsOpenPercentages: [
              { windowLocation: 'front_left', openPercentage: 0 },
              { windowLocation: 'front_right', openPercentage: 0 },
              { windowLocation: 'rear_right', openPercentage: 0 },
              { windowLocation: 'rear_left', openPercentage: 0 },
              { windowLocation: 'hatch', openPercentage: 0 },
            ],
            windowsPositions: [
              { windowLocation: 'front_left', windowPosition: 'closed' },
              { windowLocation: 'front_right', windowPosition: 'closed' },
              { windowLocation: 'rear_right', windowPosition: 'closed' },
              { windowLocation: 'rear_left', windowPosition: 'closed' },
              { windowLocation: 'hatch', windowPosition: 'closed' },
            ],
          },
        },
        {
          capabilityIdentifier: 'windscreen',
          state: {
            wipers: 'inactive',
            wipersIntensity: 'level_0',
            windscreenDamage: 'no_impact_detected',
            windscreenZoneMatrix: { rows: 3, columns: 2 },
            windscreenDamageZone: { rows: 2, columns: 2 },
            windscreenNeedsReplacement: 'unknown',
            windscreenDamageConfidence: 0,
            windscreenDamageDetectionTime: new Date('2000-01-01T00:00:00.000Z'),
          },
        },
      ],
    });
  });
});
