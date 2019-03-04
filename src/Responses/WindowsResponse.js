import PropertyResponse from '../PropertyResponse';
import PropertyDecoder from '../PropertyDecoder';
import OptionalPropertyDecoder from '../OptionalPropertyDecoder';
import { progressDecoder, switchDecoder } from '../helpers';

export default class WindowsResponse extends PropertyResponse {
  static identifier = [0x00, 0x45];

  /**
   * @property {Array} windowsOpenPercentages Windows open percentages ([{ windowLocation: (string: 'front_left|front_right|rear_right|rear_left|hatch'), openPercentage: (number) }])
   * @property {Array} windowsPositions Windows positions ([{ windowLocation: (string: 'front_left|front_right|rear_right|rear_left|hatch'), windowPosition: (string: 'closed|opened|intermediate') }])
   *
   * @example WindowsResponse
    {
      windowsOpenPercentages: [{
        data: {
          windowLocation: 'front_left',
          openPercentage: 0.6,
        },
      }, {
        data: {
          windowLocation: 'front_right',
          openPercentage: 0.6,
        },
      }, {
        data: {
          windowLocation: 'rear_right',
          openPercentage: 0.6,
        },
      }, {
        data: {
          windowLocation: 'rear_left',
          openPercentage: 0.6,
        },
      }, {
        data: {
          windowLocation: 'hatch',
          openPercentage: 0.6,
        },
      }],
      windowsPositions: [{
        data: {
          windowLocation: 'front_left',
          windowPosition: 'closed',
        },
      }, {
        data: {
          windowLocation: 'front_right',
          windowPosition: 'closed',
        },
      }, {
        data: {
          windowLocation: 'rear_right',
          windowPosition: 'closed',
        },
      }, {
        data: {
          windowLocation: 'rear_left',
          windowPosition: 'closed',
        },
      }, {
        data: {
          windowLocation: 'hatch',
          windowPosition: 'closed',
        },
      }],
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new PropertyDecoder(
        0x02,
        'windowsOpenPercentages'
      ).setOptionalSubProperties('windowLocation', [
        new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(
          this.openPercentageDecoder
        ),
        new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(
          this.openPercentageDecoder
        ),
        new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(
          this.openPercentageDecoder
        ),
        new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(
          this.openPercentageDecoder
        ),
        new OptionalPropertyDecoder(0x04, 'hatch').setDecoder(
          this.openPercentageDecoder
        ),
      ]),

      new PropertyDecoder(0x03, 'windowsPositions').setOptionalSubProperties(
        'windowLocation',
        [
          new OptionalPropertyDecoder(0x00, 'front_left').setDecoder(
            this.positionDecoder
          ),
          new OptionalPropertyDecoder(0x01, 'front_right').setDecoder(
            this.positionDecoder
          ),
          new OptionalPropertyDecoder(0x02, 'rear_right').setDecoder(
            this.positionDecoder
          ),
          new OptionalPropertyDecoder(0x03, 'rear_left').setDecoder(
            this.positionDecoder
          ),
          new OptionalPropertyDecoder(0x04, 'hatch').setDecoder(
            this.positionDecoder
          ),
        ]
      ),
    ];

    this.parse(data, properties, config);
  }

  openPercentageDecoder(bytes: Array<Number>) {
    return {
      openPercentage: progressDecoder(bytes),
    };
  }

  positionDecoder(bytes: Array<Number>) {
    const posDecoder = switchDecoder({
      0x00: 'closed',
      0x01: 'opened',
      0x02: 'intermediate',
    });

    return {
      windowPosition: posDecoder(bytes),
    };
  }
}
