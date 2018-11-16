import Response from '../../src/Responses/Response';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleStatusResponse`, () => {
  it(`should return VehicleStatusResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00110101001131484d4442344233304835344536393631020001000300094d697373696f6e20450400084d696b6b20414138050008617364313233353407000207e2080005426c61636b09000202580a0001040b0001050c000442c800000d000213880e0001010f0001001000010011000b7369646520736b6972747311000b66726f6e74206170726f6e11000a72656172206170726f6e99008e002301020002001e03000150040004bf19999a050004bf19999a06000400000000070004000000000800016409000200000a0004000000000b0001000c0001000e000441c800000f000101100001001100030013301300030002051400044219999a15000900120a160f0a2100b415000901120a160f0a2100b41500090212020a0f2d210078160001001700010099003500530101000103020001000500020015050002011906000200250600020125070002001107000201110800011a090001370a0001e499004900240101000441b800000200044190000003000441b0000004000441b8000006000100070001000800010009000441b80000050001000b000300121e0b000304121e0c000441c000009900190062010100010102000100030002005a0400010005000200009900b200610101000200000100020100010002020001000203000100020400010002050001000206000100020700010002080001000209000100020a000100020b000100020c000100020d000100020e000100020f0001000210000100021100010002120001000213000100021400010002150001000216000100021700010002180001000219000100021a000100021b000100021c000100021d000100021e000100021f000100022000010002210001000222009900db003301010003000bb80200020012030002000004000200000500015006000200c8090001000b0004414000000c0004000000000d000200000e000200000f00040000000010000100110002001712000441c000001300044416000014000100150001141600010a170002000018000150190009000a000000000000001a000500401333331a000501401333331a000502401333331a000503401333331b000500422000001b000501422000001b000502422000001b000503422000001c00030000001c00030100001c00030200001c00030300001d00040000000099003f00200102000200010200020101020002020102000203010300020001030002010103000202010300020301040002000004000201000400020200040002030099000b0035010100010102000100990007004001010001019900750060010100010002000100030001000400040000000005000100080001000900000a0001000b00000d0001000e00043f0000000f00044248000010000400000000110010404a421cde5d1809402ac37d41743e961200080040900000455552120008010000000000000012000802000000000000009900070026010100010099000700670101000100990011005401010004461c4000020004447a000099001d003601010001020200010003000101040003ccbbee05000100060001009900630034010100020190020003007530030001000400010005000100060002000007000100080008120a160f0a2100b4090008120a160f0a2100b40a0008120a160f0a2100b40b00111208007b0000047472c3a40004c3b573730c0008120a160f0a2100b499000700660101000100990020003101070010404a428f9f44d445402acf55ffe6d58d0200074265726c696e6f99000c005201010002000002000100990007005801010001009900390047010100010002000e4265726c696e205061726b696e67030008363438393432333304000812040d02143200b4050008120b07133201007899000b0065010100010002000100990073005701010005000000000001000501000000000100050200000000010005030000000002000100030001000400010005000100060004000000000700040000000008000100090001000a000200000a000201000b0001000c0001000d0001000e0001000f0001001000010011000100120001009900130025010100010002000164030001010400010099003500560102000200000200020100020002020002000203000200020400030002000003000201000300020200030002030003000204009900070063010100010099003200640101000201000100020200020002010002000202000300020100030002020004000100050001000600010007000200009900070046010100010299000e005001010008120b07133024007899000b0021010100010102000100990092006801010002012c020002012c030001320400013205000200280500020128050002022805000203280500020428060005004204cccd060005014204cccd060005024204cccd060005034204cccd060005044204cccd07000442ca999a08000441b400000900030175900a0001140b000440b5c28f0c0001320d0008120a160f0a2100b40e000440c666660f0004410b33339900070028010100010099002c003001040010404a421cde5d1809402ac37d41743e96050008404a428f9f44d4450600084060b0000000000099000700550101000100990012005901010001010200010003000004000102990035004501020002003c020002013c020002023c020002033c020002043c0300020000030002010003000202000300020300030002040099002a004201010001010200010303000102040001320500013306000102070001000800080001010200000078a20008120b100f1f2d0078'
      )
    );

    expect(response.parse()).toBeInstanceOf(VehicleStatusResponse);
    expect(response.parse()).toEqual({
      vin: '1HMDB4B30H54E6961',
      powertrain: 'unknown',
      modelName: 'Mission E',
      name: 'Mikk AA8',
      licensePlate: 'asd12354',
      modelYear: 2018,
      colorName: 'Black',
      powerInKw: 600,
      numberOfDoors: 4,
      numberOfSeats: 5,
      engineVolume: 100,
      engineMaxTorque: 5000,
      gearbox: 'automatic',
      displayUnit: 'km',
      driverSeatLocation: 'left',
      equipments: ['side skirts', 'front apron', 'rear apron'],
      states: [
        {
          capabilityIdentifier: 'door_locks',
          state: {
            insideLocks: [
              {
                doorLocation: 'front_left',
                lockState: 'locked',
              },
              {
                doorLocation: 'front_right',
                lockState: 'locked',
              },
              {
                doorLocation: 'rear_right',
                lockState: 'locked',
              },
              {
                doorLocation: 'rear_left',
                lockState: 'locked',
              },
            ],
            locks: [
              {
                doorLocation: 'front_left',
                lockState: 'locked',
              },
              {
                doorLocation: 'front_right',
                lockState: 'locked',
              },
              {
                doorLocation: 'rear_right',
                lockState: 'locked',
              },
              {
                doorLocation: 'rear_left',
                lockState: 'locked',
              },
            ],
            positions: [
              {
                doorLocation: 'front_left',
                position: 'closed',
              },
              {
                doorLocation: 'front_right',
                position: 'closed',
              },
              {
                doorLocation: 'rear_right',
                position: 'closed',
              },
              {
                doorLocation: 'rear_left',
                position: 'closed',
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'trunk',
          state: {
            trunkLock: 'locked',
            trunkPosition: 'closed',
          },
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
            departureTimes: [
              {
                activeState: 'inactive',
                hour: 19,
                minute: 48,
              },
            ],
            reductionTimes: [
              {
                startStop: 'start',
                hour: 2,
                minute: 5,
              },
            ],
            batteryTemperature: 38.4,
            timers: [
              {
                timerType: 'preferred_start_time',
                time: new Date('2018-10-22T12:10:33.000Z'),
              },
              {
                timerType: 'preferred_end_time',
                time: new Date('2018-10-22T12:10:33.000Z'),
              },
              {
                timerType: 'departure_time',
                time: new Date('2018-02-10T13:45:33.000Z'),
              },
            ],
            pluggedIn: 'disconnected',
            activeState: 'not_charging',
          },
        },
        {
          capabilityIdentifier: 'climate',
          state: {
            insideTemperature: 23,
            outsideTemperature: 18,
            driverTemperatureSetting: 22,
            passengerTemperatureSetting: 23,
            hvacState: 'inactive',
            defoggingState: 'inactive',
            defrostingState: 'inactive',
            ionisingState: 'inactive',
            defrostingTemperature: 23,
            hvacWeekdayStartingTimes: [
              {
                weekday: 'monday',
                hour: 18,
                minute: 30,
              },
              {
                weekday: 'friday',
                hour: 18,
                minute: 30,
              },
            ],
            rearTemperatureSetting: 24,
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: 0,
            position: 100,
            convertibleRoof: 'open',
            sunroofTilt: 'closed',
          },
        },
        {
          capabilityIdentifier: 'honk_horn_flash_lights',
          state: {
            flashers: 'inactive',
          },
        },
        {
          capabilityIdentifier: 'valet_mode',
          state: {
            valetMode: 'deactivated',
          },
        },
        {
          capabilityIdentifier: 'vehicle_location',
          state: {
            coordinates: {
              latitude: 52.516506,
              longitude: 13.381815,
            },
            heading: 52.520008,
            altitude: 133.5,
          },
        },
        {
          capabilityIdentifier: 'navi_destination',
          state: {
            coordinates: {
              latitude: 52.520008,
              longitude: 13.404953,
            },
            destinationName: 'Berlino',
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
              {
                id: 10,
                remainingMinutes: 0,
                text: '',
                status: '',
              },
            ],
            tirePressures: [
              {
                location: 'front_left',
                pressure: 2.3,
              },
              {
                location: 'front_right',
                pressure: 2.3,
              },
              {
                location: 'rear_right',
                pressure: 2.3,
              },
              {
                location: 'rear_left',
                pressure: 2.3,
              },
            ],
            tireTemperatures: [
              {
                location: 'front_left',
                temperature: 40,
              },
              {
                location: 'front_right',
                temperature: 40,
              },
              {
                location: 'rear_right',
                temperature: 40,
              },
              {
                location: 'rear_left',
                temperature: 40,
              },
            ],
            wheelRpms: [
              {
                location: 'front_left',
                rpm: 0,
              },
              {
                location: 'front_right',
                rpm: 0,
              },
              {
                location: 'rear_right',
                rpm: 0,
              },
              {
                location: 'rear_left',
                rpm: 0,
              },
            ],
            troubleCodes: [
              {
                occurences: 0,
                id: '',
                ecuId: '',
                status: '',
              },
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
            automaticTeleserviceCallDate: new Date('2018-10-22T12:10:33.000Z'),
            teleserviceBatteryCallDate: new Date('2018-10-22T12:10:33.000Z'),
            nextInspectionDate: new Date('2018-10-22T12:10:33.000Z'),
            conditionBasedServices: [
              {
                year: 2018,
                month: 8,
                cbsIdentifier: 123,
                dueStatus: 'ok',
                cbsText: 'trä',
                description: 'õss',
              },
            ],
            brakeFluidChangeDate: new Date('2018-10-22T12:10:33.000Z'),
          },
        },
        {
          capabilityIdentifier: 'engine',
          state: {
            ignition: 'engine_on',
            accessoriesIgnition: 'powered_off',
          },
        },
        {
          capabilityIdentifier: 'lights',
          state: {
            frontExteriorLight: 'active_with_full_beam',
            rearExteriorLight: 'inactive',
            interiorLight: 'active',
            ambientLight: '#ccbbee',
            reverseLight: 'inactive',
            emergencyBrakeLight: 'inactive',
          },
        },
        {
          capabilityIdentifier: 'fueling',
          state: {
            gasFlap: 'open',
          },
        },
        {
          capabilityIdentifier: 'windscreen',
          state: {
            wipers: 'active',
            wipersIntensity: 'level_3',
            windscreenDamage: 'damage_smaller_than_1_inch',
            windscreenZoneMatrix: {
              rows: 3,
              columns: 2,
            },
            windscreenDamageZone: {
              rows: 3,
              columns: 3,
            },
            windscreenNeedsReplacement: 'replacement_needed',
            windscreenDamageConfidence: 0,
            windscreenDamageDetectionTime: new Date('2000-01-01T00:00:00.000Z'),
          },
        },
        {
          capabilityIdentifier: 'windows',
          state: {
            windowsOpenPercentages: [
              {
                windowLocation: 'front_left',
                openPercentage: 0.6,
              },
              {
                windowLocation: 'front_right',
                openPercentage: 0.6,
              },
              {
                windowLocation: 'rear_right',
                openPercentage: 0.6,
              },
              {
                windowLocation: 'rear_left',
                openPercentage: 0.6,
              },
              {
                windowLocation: 'hatch',
                openPercentage: 0.6,
              },
            ],
            windowsPositions: [
              {
                windowLocation: 'front_left',
                windowPosition: 'closed',
              },
              {
                windowLocation: 'front_right',
                windowPosition: 'closed',
              },
              {
                windowLocation: 'rear_right',
                windowPosition: 'closed',
              },
              {
                windowLocation: 'rear_left',
                windowPosition: 'closed',
              },
              {
                windowLocation: 'hatch',
                windowPosition: 'closed',
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'theft_alarm',
          state: {
            theftAlarm: 'triggered',
          },
        },
        {
          capabilityIdentifier: 'parking_ticket',
          state: {
            parkingTicketState: 'ended',
            operatorName: 'Berlin Parking',
            operatorTicketID: '64894233',
            ticketStartTime: new Date('2018-04-12T23:20:50.000Z'),
            ticketEndTime: new Date('2018-11-07T17:50:01.000Z'),
          },
        },
        {
          capabilityIdentifier: 'vehicle_time',
          state: {
            vehicleTime: new Date('2018-11-07T17:48:36.000Z'),
          },
        },
        {
          capabilityIdentifier: 'offroad',
          state: {
            routeIncline: 0,
            wheelSuspension: 0,
          },
        },
        {
          capabilityIdentifier: 'chassis_settings',
          state: {
            drivingMode: 'sport_plus',
            sportChrono: 'inactive',
            currentSpringRates: [
              {
                axle: 'front_axle',
                springRate: 21,
              },
              {
                axle: 'rear_axle',
                springRate: 25,
              },
            ],
            maximumSpringRates: [
              {
                axle: 'front_axle',
                springRate: 37,
              },
              {
                axle: 'rear_axle',
                springRate: 37,
              },
            ],
            minimumSpringRates: [
              {
                axle: 'front_axle',
                springRate: 17,
              },
              {
                axle: 'rear_axle',
                springRate: 17,
              },
            ],
            currentChassisPosition: 26,
            maximumChassisPosition: 55,
            minimumChassisPosition: -28,
          },
        },
        {
          capabilityIdentifier: 'light_conditions',
          state: {
            outsideLight: 10000,
            insideLight: 1000,
          },
        },
        {
          capabilityIdentifier: 'weather_conditions',
          state: {
            rainIntensity: 0,
          },
        },
        {
          capabilityIdentifier: 'seats',
          state: {
            personsDetected: [
              {
                seatPosition: 'front_left',
                personDetected: 'not_detected',
              },
              {
                seatPosition: 'front_right',
                personDetected: 'not_detected',
              },
              {
                seatPosition: 'rear_right',
                personDetected: 'not_detected',
              },
              {
                seatPosition: 'rear_left',
                personDetected: 'not_detected',
              },
              {
                seatPosition: 'rear_center',
                personDetected: 'not_detected',
              },
            ],
            seatbeltsFastened: [
              {
                seatPosition: 'front_left',
                seatbeltFastened: 'not_fastened',
              },
              {
                seatPosition: 'front_right',
                seatbeltFastened: 'not_fastened',
              },
              {
                seatPosition: 'rear_right',
                seatbeltFastened: 'not_fastened',
              },
              {
                seatPosition: 'rear_left',
                seatbeltFastened: 'not_fastened',
              },
              {
                seatPosition: 'rear_center',
                seatbeltFastened: 'not_fastened',
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'race',
          state: {
            accelerations: [
              {
                type: 'longitudinal_acceleration',
                gForce: 0,
              },
              {
                type: 'lateral_acceleration',
                gForce: 0,
              },
              {
                type: 'front_lateral_acceleration',
                gForce: 0,
              },
              {
                type: 'rear_lateral_acceleration',
                gForce: 0,
              },
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
              {
                axle: 'front_axle',
                vectoring: 'inactive',
              },
              {
                axle: 'rear_axle',
                vectoring: 'inactive',
              },
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
          capabilityIdentifier: 'parking_brake',
          state: {
            parkingBrake: 'inactive',
          },
        },
        {
          capabilityIdentifier: 'wi_fi',
          state: {
            wifiEnabled: 'enabled',
            networkConnected: 'disconnected',
            networkSSID: '',
            networkSecurity: 'wpa',
          },
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
            chargeCurrentDC: 0.5,
            maximumChargeCurrent: 50,
            minimumChargeCurrent: 0,
            coordinates: {
              latitude: 52.516506,
              longitude: 13.381815,
            },
            priceTariffs: [
              {
                pricingType: 'starting_fee',
                price: 4.5,
                currency: 'EUR',
              },
              {
                pricingType: 'per_minute',
                price: 0,
                currency: '',
              },
              {
                pricingType: 'per_kwh',
                price: 0,
                currency: '',
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'dashboard_lights',
          state: {
            dashboardLights: [
              {
                lightName: 'high_beam',
                state: 'inactive',
              },
              {
                lightName: 'low_beam',
                state: 'inactive',
              },
              {
                lightName: 'hazard_warning',
                state: 'inactive',
              },
              {
                lightName: 'brake_failure',
                state: 'inactive',
              },
              {
                lightName: 'hatch_open',
                state: 'inactive',
              },
              {
                lightName: 'fuel_level',
                state: 'inactive',
              },
              {
                lightName: 'engine_coolant_temperature',
                state: 'inactive',
              },
              {
                lightName: 'battery_charging_condition',
                state: 'inactive',
              },
              {
                lightName: 'engine_oil',
                state: 'inactive',
              },
              {
                lightName: 'position_lights',
                state: 'inactive',
              },
              {
                lightName: 'front_fog_light',
                state: 'inactive',
              },
              {
                lightName: 'rear_fog_light',
                state: 'inactive',
              },
              {
                lightName: 'park_heating',
                state: 'inactive',
              },
              {
                lightName: 'engine_indicator',
                state: 'inactive',
              },
              {
                lightName: 'service_call',
                state: 'inactive',
              },
              {
                lightName: 'transmission_fluid_temperature',
                state: 'inactive',
              },
              {
                lightName: 'transmission_failure',
                state: 'inactive',
              },
              {
                lightName: 'anti_lock_brake_failure',
                state: 'inactive',
              },
              {
                lightName: 'worn_brake_linings',
                state: 'inactive',
              },
              {
                lightName: 'windscreen_washer_fluid',
                state: 'inactive',
              },
              {
                lightName: 'tire_failure',
                state: 'inactive',
              },
              {
                lightName: 'engine_oil_level',
                state: 'inactive',
              },
              {
                lightName: 'engine_coolant_level',
                state: 'inactive',
              },
              {
                lightName: 'steering_failure',
                state: 'inactive',
              },
              {
                lightName: 'esc_indication',
                state: 'inactive',
              },
              {
                lightName: 'brake_lights',
                state: 'inactive',
              },
              {
                lightName: 'adblue_level',
                state: 'inactive',
              },
              {
                lightName: 'fuel_filter_diff_pressure',
                state: 'inactive',
              },
              {
                lightName: 'seat_belt',
                state: 'inactive',
              },
              {
                lightName: 'advanced_braking',
                state: 'inactive',
              },
              {
                lightName: 'acc',
                state: 'inactive',
              },
              {
                lightName: 'trailer_connected',
                state: 'inactive',
              },
              {
                lightName: 'airbag',
                state: 'inactive',
              },
              {
                lightName: 'esc_switched_off',
                state: 'inactive',
              },
              {
                lightName: 'lane_departure_warning_off',
                state: 'inactive',
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'cruise_control',
          state: {
            cruiseControl: 'active',
            limiter: 'not_set',
            targetSpeed: 90,
            acc: 'inactive',
            accTargetSpeed: 0,
          },
        },
        {
          capabilityIdentifier: 'start_stop',
          state: {
            startStop: 'inactive',
          },
        },
        {
          capabilityIdentifier: 'tachograph',
          state: {
            driverWorkingStates: [
              {
                driverNumber: 1,
                workingState: 'resting',
              },
              {
                driverNumber: 2,
                workingState: 'resting',
              },
            ],
            driverTimeStates: [
              {
                driverNumber: 1,
                timeState: 'normal',
              },
              {
                driverNumber: 2,
                timeState: 'normal',
              },
            ],
            driverCards: [
              {
                driverNumber: 1,
                card: 'not_present',
              },
              {
                driverNumber: 2,
                card: 'not_present',
              },
            ],
            vehicleMotion: 'not_detected',
            vehicleOverspeed: 'no_overspeed',
            vehicleDirection: 'forward',
            vehicleSpeed: 0,
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
          capabilityIdentifier: 'mobile',
          state: {
            connection: 'disconnected',
          },
        },
        {
          capabilityIdentifier: 'hood',
          state: {
            position: 'closed',
          },
        },
        {
          capabilityIdentifier: 'usage',
          state: {
            averageWeeklyDistance: 300,
            averageWeeklyDistanceLongRun: 300,
            accelerationEvaluation: 0.5,
            drivingStyleEvaluation: 0.5,
            drivingModesActivationPeriods: [
              {
                drivingMode: 'regular',
                period: 0.4,
              },
              {
                drivingMode: 'eco',
                period: 0.4,
              },
              {
                drivingMode: 'sport',
                period: 0.4,
              },
              {
                drivingMode: 'sport_plus',
                period: 0.4,
              },
              {
                drivingMode: 'eco_plus',
                period: 0.4,
              },
            ],
            drivingModesEnergyConsumptions: [
              {
                drivingMode: 'regular',
                consumption: 33.2,
              },
              {
                drivingMode: 'eco',
                consumption: 33.2,
              },
              {
                drivingMode: 'sport',
                consumption: 33.2,
              },
              {
                drivingMode: 'sport_plus',
                consumption: 33.2,
              },
              {
                drivingMode: 'eco_plus',
                consumption: 33.2,
              },
            ],
            lastTripEnergyConsumption: 101.3,
            lastTripFuelConsumption: 22.5,
            mileageAfterLastTrip: 95632,
            lastTripElectricPortion: 20,
            lastTripAverageEnergyRecuperation: 5.68,
            lastTripBatteryRemaining: 0.5,
            lastTripDate: new Date('2018-10-22T12:10:33.000Z'),
            averageFuelConsumption: 6.2,
            currentFuelConsumption: 8.7,
          },
        },
      ],
    });
  });
});
