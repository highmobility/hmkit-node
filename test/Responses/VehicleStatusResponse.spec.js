import Response from '../../src/Responses/Response';
import VehicleStatusResponse from '../../src/Responses/VehicleStatusResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`VehicleStatusResponse`, () => {
  it(`should return VehicleStatusResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        `00110101001401001131484d45443535303848433337414333350200040100010003000301000004001a0100174d697373696f6e20452063726f73732074757269736d6f05000c010009422d484d2d3838343907000501000207e108000301000009000501000200000a0004010001040b0004010001040c0007010004000000000d000501000200000e0004010001000f0004010001001000040100010011000301000012000a010007506f72736368659901a70101a400230102000e010002001e02000601699b3b54fc0300140100083fe999999999999a02000601699b3b54fc040010010004bf19999a02000601699b3b54fc050010010004bf19999a02000601699b3b54fc0600100100040000000002000601699b3b54fc0700100100040000000002000601699b3b54fc0800140100083ff000000000000002000601699b3b54fc09000e010002000002000601699b3b54fc0a00100100040000000002000601699b3b54fc0b000d0100010002000601699b3b54fc0c000d0100010002000601699b3b54fc0e001001000441c8000002000601699b3b54fc0f000d0100010102000601699b3b54fc10000d0100010002000601699b3b54fc11000f010003000f0c02000601699b3b54fc13000f010003000f0c02000601699b3b54fc1400100100044219999a02000601699b3b54fc15001501000900000001669baf11a902000601699b3b54fc15001501000901000001669baf11a902000601699b3b54fc15001501000902000001669baf11a902000601699b3b54fc16000d0100010002000601699b3b54fc17000d0100010002000601699b3b54fc9900bc0100b900530101000d0100010102000601699b3b54fe02000d0100010002000601699b3b54fe05000e010002001502000601699b3b54fe05000e010002011502000601699b3b54fe06000e010002002502000601699b3b54fe06000e010002012502000601699b3b54fe07000e010002001102000601699b3b54fe07000e010002011102000601699b3b54fe08000d0100011902000601699b3b54fe09000d0100013702000601699b3b54fe0a000d010001e402000601699b3b54fe9900dc0100d900240101001001000441b8000002000601699b3b54fd0200100100044190000002000601699b3b54fd03001001000441b8000002000601699b3b54fd04001001000441b0000002000601699b3b54fd06000d0100010002000601699b3b54fd07000d0100010002000601699b3b54fd08000d0100010002000601699b3b54fd09001001000441b8000002000601699b3b54fd05000d0100010002000601699b3b54fd0b000f01000305080002000601699b3b54fd0b000f01000306080002000601699b3b54fd0c001001000441b0000002000601699b3b54fd99005801005500620101000d0100010002000601699b3b550002000d0100010002000601699b3b550003000e010002000002000601699b3b550004000d0100010002000601699b3b550005000e010002000002000601699b3b550099025901025600610101000e010002000002000601699b3b54f901000e010002010002000601699b3b54f901000e010002020002000601699b3b54f901000e010002030002000601699b3b54f901000e010002040002000601699b3b54f901000e010002050002000601699b3b54f901000e010002060002000601699b3b54f901000e010002070002000601699b3b54f901000e010002080002000601699b3b54f901000e010002090002000601699b3b54f901000e0100020a0002000601699b3b54f901000e0100020b0002000601699b3b54f901000e0100020c0002000601699b3b54f901000e0100020d0002000601699b3b54f901000e0100020e0002000601699b3b54f901000e0100020f0002000601699b3b54f901000e010002100002000601699b3b54f901000e010002110002000601699b3b54f901000e010002120002000601699b3b54f901000e010002130002000601699b3b54f901000e010002140002000601699b3b54f901000e010002150002000601699b3b54f901000e010002160002000601699b3b54f901000e010002170002000601699b3b54f901000e010002180002000601699b3b54f901000e010002190002000601699b3b54f901000e0100021a0002000601699b3b54f901000e0100021b0002000601699b3b54f901000e0100021c0002000601699b3b54f901000e0100021d0002000601699b3b54f901000e0100021e0002000601699b3b54f901000e0100021f0002000601699b3b54f901000e010002200002000601699b3b54f901000e010002210002000601699b3b54f901000e010002220002000601699b3b54f99902b10102ae00330101000f010003000bb802000601699b3b54ff02000e010002001202000601699b3b54ff03000e010002000002000601699b3b54ff04000e010002000002000601699b3b54ff0500140100083fe999999999999a02000601699b3b54ff06000e01000200c802000601699b3b54ff09000d0100010002000601699b3b54ff0b00100100044140000002000601699b3b54ff0c00100100040000000002000601699b3b54ff0d000e010002000002000601699b3b54ff0e000e010002000002000601699b3b54ff0f00100100040000000002000601699b3b54ff10000d0100010002000601699b3b54ff11000e010002001702000601699b3b54ff12001001000441c0000002000601699b3b54ff1300100100044416000002000601699b3b54ff14000d0100010002000601699b3b54ff1500140100083fc999999999999a02000601699b3b54ff1600140100083fb999999999999a02000601699b3b54ff17000e010002000002000601699b3b54ff1800140100083fe999999999999a02000601699b3b54ff190015010009000a0000000000000002000601699b3b54ff1a0011010005004013333302000601699b3b54ff1a0011010005014013333302000601699b3b54ff1a0011010005024013333302000601699b3b54ff1a0011010005034013333302000601699b3b54ff1b0011010005004220000002000601699b3b54ff1b0011010005014220000002000601699b3b54ff1b0011010005024220000002000601699b3b54ff1b0011010005034220000002000601699b3b54ff1c000f01000300000002000601699b3b54ff1c000f01000301000002000601699b3b54ff1c000f01000302000002000601699b3b54ff1c000f01000303000002000601699b3b54ff1d00100100040000000002000601699b3b54ff1e001001000400000bb802000601699b3b54ff99010501010200200102000e010002000002000601699b3b550002000e010002010002000601699b3b550002000e010002020002000601699b3b550002000e010002030002000601699b3b550002000e010002050002000601699b3b550003000e010002000002000601699b3b550003000e010002010002000601699b3b550003000e010002020002000601699b3b550003000e010002030002000601699b3b550003000e010002050002000601699b3b550004000e010002000002000601699b3b550004000e010002010002000601699b3b550004000e010002020002000601699b3b550004000e010002030002000601699b3b550004000e010002050002000601699b3b550099002601002300350101000d0100010002000601699b3b54ff02000d0100010002000601699b3b54ff99002601002300400102000d0100010002000601699b3b54fd03000d0100010002000601699b3b54fd99014401014100600101000d0100010002000601699b3b54ff02000d0100010002000601699b3b54ff03000d0100010002000601699b3b54ff0400100100040000000002000601699b3b54ff05000d0100010002000601699b3b54ff08000d0100010002000601699b3b54ff09000c01000002000601699b3b54ff0a000d0100010002000601699b3b54ff0b000c01000002000601699b3b54ff0d000d0100010002000601699b3b54ff0e00100100043f19999a02000601699b3b54ff0f00100100044248000002000601699b3b54ff1000100100040000000002000601699b3b54ff11001c010010404a421cde5d1809402ac37d41743e9602000601699b3b54ff120014010008000000000000000002000601699b3b54ff120014010008010000000000000002000601699b3b54ff120014010008020000000000000002000601699b3b54ff99001601001300260101000d0100010002000601699b3b550199001601001300670101000d0100010002000601699b3b550099002c010029005401010010010004461c400002000601699b3b54fc020010010004447a000002000601699b3b54fc9900e00100dd00360101000d0100010002000601699b3b54ff02000d0100010002000601699b3b54ff04000f0100030000ff02000601699b3b54ff05000d0100010002000601699b3b54ff06000d0100010002000601699b3b54ff07000e010002000002000601699b3b54ff07000e010002010002000601699b3b54ff08000e010002000002000601699b3b54ff08000e010002010002000601699b3b54ff08000e010002020002000601699b3b54ff08000e010002030002000601699b3b54ff09000e010002000002000601699b3b54ff09000e010002010002000601699b3b54ff9900ee0100eb00340101000e010002019002000601699b3b54fd02000f01000300753002000601699b3b54fd03000d0100010002000601699b3b54fd04000d0100010002000601699b3b54fd05000d0100010002000601699b3b54fd06000e010002000002000601699b3b54fd07000d0100010002000601699b3b54fd080014010008000001669baf11a902000601699b3b54fd090014010008000001669baf11a902000601699b3b54fd0a0014010008000001669baf11a902000601699b3b54fd0b00150100091208007b000000000002000601699b3b54fd0c0014010008000001669baf11a902000601699b3b54fd99001601001300660101000d0100010002000601699b3b550099005901005600310107001c010010404a421cde5d1809402ac37d41743e9602000601699b3b54fd020031010025416c6578616e646572706c61747a2c203130313738204265726c696e2c204765726d616e7902000601699b3b54fd99002e01002b00520101000e010002000002000601699b3b54ff020014010008000000000000000002000601699b3b54ff99001601001300580101000d0100010002000601699b3b550099006201005f00470101000d0100010002000601699b3b54fc02000c01000002000601699b3b54fc03000c01000002000601699b3b54fc040014010008000001699b3b53e302000601699b3b54fc050014010008000001699b3b53e302000601699b3b54fc99002601002300650101000d0100010002000601699b3b550002000d0100010002000601699b3b550099019a010197005701010011010005000000000002000601699b3b54ff010011010005010000000002000601699b3b54ff010011010005020000000002000601699b3b54ff010011010005030000000002000601699b3b54ff020014010008000000000000000002000601699b3b54ff030014010008000000000000000002000601699b3b54ff040014010008000000000000000002000601699b3b54ff05000d0100010002000601699b3b54ff0600100100040000000002000601699b3b54ff0700100100040000000002000601699b3b54ff08000d0100010002000601699b3b54ff09000d0100010002000601699b3b54ff0a000e010002000002000601699b3b54ff0a000e010002010002000601699b3b54ff0b000d0100010002000601699b3b54ff0c000d0100010002000601699b3b54ff0d0014010008000000000000000002000601699b3b54ff0e000d0100010002000601699b3b54ff0f000d0100010002000601699b3b54ff10000d0100010002000601699b3b54ff11000d0100010002000601699b3b54ff12000d0100010002000601699b3b54ff990064010061002501010014010008000000000000000002000601699b3b5500020014010008000000000000000002000601699b3b550003000d0100010002000601699b3b550004000d0100010002000601699b3b550005000d0100010002000601699b3b550099008e01008b00560102000e010002000002000601699b3b54f802000e010002010002000601699b3b54f802000e010002020002000601699b3b54f802000e010002030002000601699b3b54f803000e010002000002000601699b3b54f903000e010002010002000601699b3b54f903000e010002020002000601699b3b54f903000e010002030002000601699b3b54f999001601001300630101000d0100010002000601699b3b54ff9900ad0100aa00640101000e010002010002000601699b3b550001000e010002020002000601699b3b550002000e010002010002000601699b3b550002000e010002020002000601699b3b550003000e010002010002000601699b3b550003000e010002020002000601699b3b550004000d0100010002000601699b3b550005000d0100010002000601699b3b550006000d0100010002000601699b3b550007000e010002000002000601699b3b550099001601001300460101000d0100010002000601699b3b54fd99001d01001a005001010014010008000001699b3b53e602000601699b3b550099002601002300210101000d0100010102000601699b3b54fd02000d0100010002000601699b3b54fd9901e80101e500680101000e010002012c02000601699b3b54fb02000e010002012c02000601699b3b54fb0300140100083fe000000000000002000601699b3b54fb0400140100083fe000000000000002000601699b3b54fb050015010009003fd999999999999a02000601699b3b54fb050015010009013fd999999999999a02000601699b3b54fb050015010009023fd999999999999a02000601699b3b54fb050015010009033fd999999999999a02000601699b3b54fb050015010009043fd999999999999a02000601699b3b54fb060011010005004204cccd02000601699b3b54fb060011010005014204cccd02000601699b3b54fb060011010005024204cccd02000601699b3b54fb060011010005034204cccd02000601699b3b54fb060011010005044204cccd02000601699b3b54fb07001001000442ca999a02000601699b3b54fb08001001000441b4000002000601699b3b54fb09000f01000301759002000601699b3b54fb0a00140100083fc999999999999a02000601699b3b54fc0b001001000440b5c28f02000601699b3b54fc0c00140100083fe000000000000002000601699b3b54fc0d0014010008000001669baf11a902000601699b3b54fc0e001001000440c6666602000601699b3b54fc0f0010010004410b333302000601699b3b54fc99001601001300280101000d0100010002000601699b3b550099005301005000300104001c010010404a421cde5d1809402ac37d41743e9602000601699b3b54ff050014010008404a428f9f44d44502000601699b3b54ff0600140100084060b0000000000002000601699b3b54ff99001d01001a005501010014010008000000000000000002000601699b3b54fd99004501004200590101000d0100010002000601699b3b550102000d0100010002000601699b3b550103000c01000002000601699b3b550104000d0100010002000601699b3b55019900d30100d000450102001501000900000000000000000002000601699b3b550102001501000901000000000000000002000601699b3b550102001501000902000000000000000002000601699b3b550102001501000903000000000000000002000601699b3b550102001501000904000000000000000002000601699b3b550103000e010002000002000601699b3b550103000e010002010002000601699b3b550103000e010002020002000601699b3b550103000e010002030002000601699b3b550103000e010002040002000601699b3b550199009401009100420101000d0100010002000601699b3b54fd02000d0100010002000601699b3b54fd03000d0100010002000601699b3b54fd04000d0100013202000601699b3b54fd05000d0100012202000601699b3b54fd06000d0100010002000601699b3b54fd070014010008000000000000000002000601699b3b54fd080014010008000000dc6acfac0002000601699b3b54fd`
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
            estimatedRange: {
              value: 30,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            batteryLevel: {
              value: 0.8,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            batteryCurrentAC: {
              value: -0.6,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            batteryCurrentDC: {
              value: -0.6,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            chargerVoltageAC: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            chargerVoltageDC: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            chargeLimit: {
              value: 1,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            timeToCompleteCharge: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            chargingRateKW: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            chargePortState: {
              value: 'closed',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            chargeMode: {
              value: 'immediate',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            maxChargingCurrent: {
              value: 25,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            plugType: {
              value: 'type_2',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            chargingWindowChosen: {
              value: 'not_chosen',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            departureTimes: [
              {
                value: { activeState: 'inactive', hour: 15, minute: 12 },
                timestamp: new Date('2019-03-20T13:12:30.716Z'),
              },
            ],
            reductionTimes: [
              {
                value: { startStop: 'start', hour: 15, minute: 12 },
                timestamp: new Date('2019-03-20T13:12:30.716Z'),
              },
            ],
            batteryTemperature: {
              value: 38.4,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            timers: [
              {
                value: {
                  timerType: 'preferred_start_time',
                  time: new Date('2018-10-22T12:10:33.769Z'),
                },
                timestamp: new Date('2019-03-20T13:12:30.716Z'),
              },
              {
                value: {
                  timerType: 'preferred_end_time',
                  time: new Date('2018-10-22T12:10:33.769Z'),
                },
                timestamp: new Date('2019-03-20T13:12:30.716Z'),
              },
              {
                value: {
                  timerType: 'departure_time',
                  time: new Date('2018-10-22T12:10:33.769Z'),
                },
                timestamp: new Date('2019-03-20T13:12:30.716Z'),
              },
            ],
            pluggedIn: {
              value: 'disconnected',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            activeState: {
              value: 'not_charging',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'chassis_settings',
          state: {
            drivingMode: {
              value: 'eco',
              timestamp: new Date('2019-03-20T13:12:30.718Z'),
            },
            sportChrono: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.718Z'),
            },
            currentSpringRates: [
              {
                value: { axle: 'front_axle', springRate: 21 },
                timestamp: new Date('2019-03-20T13:12:30.718Z'),
              },
              {
                value: { axle: 'rear_axle', springRate: 21 },
                timestamp: new Date('2019-03-20T13:12:30.718Z'),
              },
            ],
            maximumSpringRates: [
              {
                value: { axle: 'front_axle', springRate: 37 },
                timestamp: new Date('2019-03-20T13:12:30.718Z'),
              },
              {
                value: { axle: 'rear_axle', springRate: 37 },
                timestamp: new Date('2019-03-20T13:12:30.718Z'),
              },
            ],
            minimumSpringRates: [
              {
                value: { axle: 'front_axle', springRate: 17 },
                timestamp: new Date('2019-03-20T13:12:30.718Z'),
              },
              {
                value: { axle: 'rear_axle', springRate: 17 },
                timestamp: new Date('2019-03-20T13:12:30.718Z'),
              },
            ],
            currentChassisPosition: {
              value: 25,
              timestamp: new Date('2019-03-20T13:12:30.718Z'),
            },
            maximumChassisPosition: {
              value: 55,
              timestamp: new Date('2019-03-20T13:12:30.718Z'),
            },
            minimumChassisPosition: {
              value: -28,
              timestamp: new Date('2019-03-20T13:12:30.718Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'climate',
          state: {
            insideTemperature: {
              value: 23,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            outsideTemperature: {
              value: 18,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            driverTemperatureSetting: {
              value: 23,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            passengerTemperatureSetting: {
              value: 22,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            defoggingState: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            defrostingState: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            ionisingState: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            defrostingTemperature: {
              value: 23,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            hvacState: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            hvacWeekdayStartingTimes: [
              {
                value: { weekday: 'saturday', hour: 8, minute: 0 },
                timestamp: new Date('2019-03-20T13:12:30.717Z'),
              },
              {
                value: { weekday: 'sunday', hour: 8, minute: 0 },
                timestamp: new Date('2019-03-20T13:12:30.717Z'),
              },
            ],
            rearTemperatureSetting: {
              value: 22,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'cruise_control',
          state: {
            cruiseControl: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            limiter: {
              value: 'not_set',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            targetSpeed: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            acc: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            accTargetSpeed: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'dashboard_lights',
          state: {
            dashboardLights: [
              {
                value: { lightName: 'high_beam', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'low_beam', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'hazard_warning', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'brake_failure', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'hatch_open', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'fuel_level', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  lightName: 'engine_coolant_temperature',
                  state: 'inactive',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  lightName: 'battery_charging_condition',
                  state: 'inactive',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'engine_oil', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'position_lights', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'front_fog_light', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'rear_fog_light', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'park_heating', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'engine_indicator', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'service_call', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  lightName: 'transmission_fluid_temperature',
                  state: 'inactive',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'transmission_failure', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  lightName: 'anti_lock_brake_failure',
                  state: 'inactive',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'worn_brake_linings', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  lightName: 'windscreen_washer_fluid',
                  state: 'inactive',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'tire_failure', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'engine_oil_level', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'engine_coolant_level', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'steering_failure', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'esc_indication', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'brake_lights', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'adblue_level', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  lightName: 'fuel_filter_diff_pressure',
                  state: 'inactive',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'seat_belt', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'advanced_braking', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'acc', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'trailer_connected', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'airbag', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: { lightName: 'esc_switched_off', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  lightName: 'lane_departure_warning_off',
                  state: 'inactive',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'diagnostics',
          state: {
            mileage: {
              value: 3000,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            engineOilTemperature: {
              value: 18,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            speed: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            engineRPM: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            fuelLevel: {
              value: 0.8,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            estimatedRange: {
              value: 200,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            washerFluidLevel: {
              value: 'low',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            batteryVoltage: {
              value: 12,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            adblueLevel: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            distanceSinceReset: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            distanceSinceStart: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            fuelVolume: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            antiLockBraking: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            engineCoolantTemperature: {
              value: 23,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            engineTotalOperatingHours: {
              value: 24,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            engineTotalFuelConsumption: {
              value: 600,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            brakeFluidLevel: {
              value: 'low',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            engineTorque: {
              value: 0.2,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            engineLoad: {
              value: 0.1,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            wheelBasedSpeed: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            batteryLevel: {
              value: 0.8,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            checkControlMessages: [
              {
                value: { id: 10, remainingMinutes: 0, text: '', status: '' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            tirePressures: [
              {
                value: { location: 'front_left', pressure: 2.3 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'front_right', pressure: 2.3 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear_right', pressure: 2.3 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear_left', pressure: 2.3 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            tireTemperatures: [
              {
                value: { location: 'front_left', temperature: 40 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'front_right', temperature: 40 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear_right', temperature: 40 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear_left', temperature: 40 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            wheelRpms: [
              {
                value: { location: 'front_left', rpm: 0 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'front_right', rpm: 0 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear_right', rpm: 0 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear_left', rpm: 0 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            troubleCodes: [
              {
                value: { occurences: 0, id: '', ecuId: '', status: '' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            mileageMeters: {
              value: 3000,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'door_locks',
          state: {
            insideLocks: [
              {
                value: { doorLocation: 'front_left', lockState: 'unlocked' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'front_right', lockState: 'unlocked' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'rear_right', lockState: 'unlocked' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'rear_left', lockState: 'unlocked' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
            ],
            locks: [
              {
                value: { doorLocation: 'front_left', lockState: 'unlocked' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'front_right', lockState: 'unlocked' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'rear_right', lockState: 'unlocked' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'rear_left', lockState: 'unlocked' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
            ],
            positions: [
              {
                value: { doorLocation: 'front_left', position: 'closed' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'front_right', position: 'closed' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'rear_right', position: 'closed' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { doorLocation: 'rear_left', position: 'closed' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'engine',
          state: {
            ignition: {
              value: 'off',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            accessoriesIgnition: {
              value: 'off',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'fueling',
          state: {
            gasFlapLock: {
              value: 'unlocked',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            gasFlapPosition: {
              value: 'closed',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'home_charger',
          state: {
            charging: {
              value: 'disconnected',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            authenticationMechanism: {
              value: 'pin',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            plugType: {
              value: 'type_1',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            chargingPower: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            solarCharging: {
              value: 'deactivated',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            hotspotEnabled: {
              value: 'disabled',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            hotspotSSID: {
              value: '',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            wiFiHotspotSecurity: {
              value: 'none',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            wiFiHotspotPassword: {
              value: '',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            authentication: {
              value: 'unauthenticated',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            chargeCurrentDC: {
              value: 0.6,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            maximumChargeCurrent: {
              value: 50,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            minimumChargeCurrent: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            coordinates: {
              value: { latitude: 52.516506, longitude: 13.381815 },
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            priceTariffs: [
              {
                value: { pricingType: 'starting_fee', price: 0, currency: '' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { pricingType: 'per_minute', price: 0, currency: '' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { pricingType: 'per_kwh', price: 0, currency: '' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'honk_horn_flash_lights',
          state: {
            flashers: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.721Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'hood',
          state: {
            position: {
              value: 'closed',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'light_conditions',
          state: {
            outsideLight: {
              value: 10000,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            insideLight: {
              value: 1000,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'lights',
          state: {
            frontExteriorLight: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            rearExteriorLight: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            ambientLight: {
              value: '#0000ff',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            reverseLight: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            emergencyBrakeLight: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            fogLights: [
              {
                value: { location: 'front', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            readingLamps: [
              {
                value: { location: 'front_left', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'front_right', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear_right', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear_left', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            interiorLights: [
              {
                value: { location: 'front', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { location: 'rear', state: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'maintenance',
          state: {
            daysToNextService: {
              value: 400,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            kilometersToNextService: {
              value: 30000,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            cbsReportsCount: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            monthsToExhaustInspection: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            teleserviceAvailability: {
              value: 'pending',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            serviceDistanceThreshold: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            serviceTimeThreshold: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            automaticTeleserviceCallDate: {
              value: new Date('2018-10-22T12:10:33.769Z'),
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            teleserviceBatteryCallDate: {
              value: new Date('2018-10-22T12:10:33.769Z'),
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            nextInspectionDate: {
              value: new Date('2018-10-22T12:10:33.769Z'),
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
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
                timestamp: new Date('2019-03-20T13:12:30.717Z'),
              },
            ],
            brakeFluidChangeDate: {
              value: new Date('2018-10-22T12:10:33.769Z'),
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'mobile',
          state: {
            connection: {
              value: 'disconnected',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'navi_destination',
          state: {
            coordinates: {
              value: { latitude: 52.516506, longitude: 13.381815 },
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            destinationName: {
              value: 'Alexanderplatz, 10178 Berlin, Germany',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'offroad',
          state: {
            routeIncline: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            wheelSuspension: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'parking_brake',
          state: {
            parkingBrake: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'parking_ticket',
          state: {
            parkingTicketState: {
              value: 'ended',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            operatorName: {
              value: '',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            operatorTicketID: {
              value: '',
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            ticketStartTime: {
              value: new Date('2019-03-20T13:12:30.435Z'),
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            ticketEndTime: {
              value: new Date('2019-03-20T13:12:30.435Z'),
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'power_takeoff',
          state: {
            powerTakeoff: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            powerTakeoffEngaged: {
              value: 'not_engaged',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'race',
          state: {
            accelerations: [
              {
                value: { type: 'longitudinal_acceleration', gForce: 0 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { type: 'lateral_acceleration', gForce: 0 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { type: 'front_lateral_acceleration', gForce: 0 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { type: 'rear_lateral_acceleration', gForce: 0 },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            understeering: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            oversteering: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            gasPedalPosition: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            steeringAngle: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            brakePressure: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            yawRate: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            rearSuspensionSteering: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            electronicStabilityProgram: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            brakeTorqueVectorings: [
              {
                value: { axle: 'front_axle', vectoring: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
              {
                value: { axle: 'rear_axle', vectoring: 'inactive' },
                timestamp: new Date('2019-03-20T13:12:30.719Z'),
              },
            ],
            gearMode: {
              value: 'manual',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            selectedGear: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            brakePedalPosition: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            brakePedalSwitch: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            clutchPedalSwitch: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            acceleratorPedalIdleSwitch: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            acceleratorPedalKickdownSwitch: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            vehicleMoving: {
              value: 'not_moving',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'rooftop_control',
          state: {
            dimming: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            position: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            convertibleRoof: {
              value: 'closed',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            sunroofTilt: {
              value: 'closed',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            sunroofState: {
              value: 'closed',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
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
                timestamp: new Date('2019-03-20T13:12:30.712Z'),
              },
              {
                value: {
                  seatPosition: 'front_right',
                  personDetected: 'not_detected',
                },
                timestamp: new Date('2019-03-20T13:12:30.712Z'),
              },
              {
                value: {
                  seatPosition: 'rear_right',
                  personDetected: 'not_detected',
                },
                timestamp: new Date('2019-03-20T13:12:30.712Z'),
              },
              {
                value: {
                  seatPosition: 'rear_left',
                  personDetected: 'not_detected',
                },
                timestamp: new Date('2019-03-20T13:12:30.712Z'),
              },
            ],
            seatbeltsFastened: [
              {
                value: {
                  seatPosition: 'front_left',
                  seatbeltFastened: 'not_fastened',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  seatPosition: 'front_right',
                  seatbeltFastened: 'not_fastened',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  seatPosition: 'rear_right',
                  seatbeltFastened: 'not_fastened',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
              {
                value: {
                  seatPosition: 'rear_left',
                  seatbeltFastened: 'not_fastened',
                },
                timestamp: new Date('2019-03-20T13:12:30.713Z'),
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'start_stop',
          state: {
            startStop: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'tachograph',
          state: {
            driverWorkingStates: [
              {
                value: { driverNumber: 1, workingState: 'resting' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { driverNumber: 2, workingState: 'resting' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
            ],
            driverTimeStates: [
              {
                value: { driverNumber: 1, timeState: 'normal' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { driverNumber: 2, timeState: 'normal' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
            ],
            driverCards: [
              {
                value: { driverNumber: 1, card: 'not_present' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
              {
                value: { driverNumber: 2, card: 'not_present' },
                timestamp: new Date('2019-03-20T13:12:30.720Z'),
              },
            ],
            vehicleMotion: {
              value: 'not_detected',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            vehicleOverspeed: {
              value: 'no_overspeed',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            vehicleDirection: {
              value: 'forward',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
            vehicleSpeed: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'theft_alarm',
          state: {
            theftAlarm: {
              value: 'not_armed',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'vehicle_time',
          state: {
            vehicleTime: {
              value: new Date('2019-03-20T13:12:30.438Z'),
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'trunk',
          state: {
            trunkLock: {
              value: 'locked',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            trunkPosition: {
              value: 'closed',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'usage',
          state: {
            averageWeeklyDistance: {
              value: 300,
              timestamp: new Date('2019-03-20T13:12:30.715Z'),
            },
            averageWeeklyDistanceLongRun: {
              value: 300,
              timestamp: new Date('2019-03-20T13:12:30.715Z'),
            },
            accelerationEvaluation: {
              value: 0.5,
              timestamp: new Date('2019-03-20T13:12:30.715Z'),
            },
            drivingStyleEvaluation: {
              value: 0.5,
              timestamp: new Date('2019-03-20T13:12:30.715Z'),
            },
            drivingModesActivationPeriods: [
              {
                value: { drivingMode: 'regular', period: 0.4 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
              {
                value: { drivingMode: 'eco', period: 0.4 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
              {
                value: { drivingMode: 'sport', period: 0.4 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
              {
                value: { drivingMode: 'sport_plus', period: 0.4 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
              {
                value: { drivingMode: 'eco_plus', period: 0.4 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
            ],
            drivingModesEnergyConsumptions: [
              {
                value: { drivingMode: 'regular', consumption: 33.2 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
              {
                value: { drivingMode: 'eco', consumption: 33.2 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
              {
                value: { drivingMode: 'sport', consumption: 33.2 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
              {
                value: { drivingMode: 'sport_plus', consumption: 33.2 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
              {
                value: { drivingMode: 'eco_plus', consumption: 33.2 },
                timestamp: new Date('2019-03-20T13:12:30.715Z'),
              },
            ],
            lastTripEnergyConsumption: {
              value: 101.3,
              timestamp: new Date('2019-03-20T13:12:30.715Z'),
            },
            lastTripFuelConsumption: {
              value: 22.5,
              timestamp: new Date('2019-03-20T13:12:30.715Z'),
            },
            mileageAfterLastTrip: {
              value: 95632,
              timestamp: new Date('2019-03-20T13:12:30.715Z'),
            },
            lastTripElectricPortion: {
              value: 0.2,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            lastTripAverageEnergyRecuperation: {
              value: 5.68,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            lastTripBatteryRemaining: {
              value: 0.5,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            lastTripDate: {
              value: new Date('2018-10-22T12:10:33.769Z'),
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            averageFuelConsumption: {
              value: 6.2,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
            currentFuelConsumption: {
              value: 8.7,
              timestamp: new Date('2019-03-20T13:12:30.716Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'valet_mode',
          state: {
            valetMode: {
              value: 'deactivated',
              timestamp: new Date('2019-03-20T13:12:30.720Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'vehicle_location',
          state: {
            coordinates: {
              value: { latitude: 52.516506, longitude: 13.381815 },
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            heading: {
              value: 52.520008,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
            altitude: {
              value: 133.5,
              timestamp: new Date('2019-03-20T13:12:30.719Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'weather_conditions',
          state: {
            rainIntensity: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'wi_fi',
          state: {
            wifiEnabled: {
              value: 'disabled',
              timestamp: new Date('2019-03-20T13:12:30.721Z'),
            },
            networkConnected: {
              value: 'disconnected',
              timestamp: new Date('2019-03-20T13:12:30.721Z'),
            },
            networkSSID: {
              value: '',
              timestamp: new Date('2019-03-20T13:12:30.721Z'),
            },
            networkSecurity: {
              value: 'none',
              timestamp: new Date('2019-03-20T13:12:30.721Z'),
            },
          },
        },
        {
          capabilityIdentifier: 'windows',
          state: {
            windowsOpenPercentages: [
              {
                value: { windowLocation: 'front_left', openPercentage: 0 },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
              {
                value: { windowLocation: 'front_right', openPercentage: 0 },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
              {
                value: { windowLocation: 'rear_right', openPercentage: 0 },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
              {
                value: { windowLocation: 'rear_left', openPercentage: 0 },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
              {
                value: { windowLocation: 'hatch', openPercentage: 0 },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
            ],
            windowsPositions: [
              {
                value: {
                  windowLocation: 'front_left',
                  windowPosition: 'closed',
                },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
              {
                value: {
                  windowLocation: 'front_right',
                  windowPosition: 'closed',
                },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
              {
                value: {
                  windowLocation: 'rear_right',
                  windowPosition: 'closed',
                },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
              {
                value: {
                  windowLocation: 'rear_left',
                  windowPosition: 'closed',
                },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
              {
                value: { windowLocation: 'hatch', windowPosition: 'closed' },
                timestamp: new Date('2019-03-20T13:12:30.721Z'),
              },
            ],
          },
        },
        {
          capabilityIdentifier: 'windscreen',
          state: {
            wipers: {
              value: 'inactive',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            wipersIntensity: {
              value: 'level_0',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            windscreenDamage: {
              value: 'no_impact_detected',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            windscreenZoneMatrix: {
              value: { rows: 3, columns: 2 },
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            windscreenDamageZone: {
              value: { rows: 2, columns: 2 },
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            windscreenNeedsReplacement: {
              value: 'unknown',
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            windscreenDamageConfidence: {
              value: 0,
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
            windscreenDamageDetectionTime: {
              value: new Date('2000-01-01T00:00:00.000Z'),
              timestamp: new Date('2019-03-20T13:12:30.717Z'),
            },
          },
        },
      ],
    });
  });
});
