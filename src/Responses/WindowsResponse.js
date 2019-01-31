import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import OptionalProperty from '../OptionalProperty';
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
        windowLocation: 'front_left',
        openPercentage: 0
      }, {
        windowLocation: 'front_right',
        openPercentage: 0
      }, {
        windowLocation: 'rear_right',
        openPercentage: 0
      }, {
        windowLocation: 'rear_left',
        openPercentage: 0
      }, {
        windowLocation: 'hatch',
        openPercentage: 0
      }],
      windowsPositions: [{
        windowLocation: 'front_left',
        windowPosition: 'closed'
      }, {
        windowLocation: 'front_right',
        windowPosition: 'closed'
      }, {
        windowLocation: 'rear_right',
        windowPosition: 'closed'
      }, {
        windowLocation: 'rear_left',
        windowPosition: 'closed'
      }, {
        windowLocation: 'hatch',
        windowPosition: 'closed'
      }]
    }
   */
  constructor(data: Uint8Array, config: Object) {
    super();

    const properties = [
      new Property(0x02, 'windowsOpenPercentages').setOptionalSubProperties(
        'windowLocation',
        [
          new OptionalProperty(0x00, 'front_left').setDecoder(
            this.openPercentageDecoder
          ),
          new OptionalProperty(0x01, 'front_right').setDecoder(
            this.openPercentageDecoder
          ),
          new OptionalProperty(0x02, 'rear_right').setDecoder(
            this.openPercentageDecoder
          ),
          new OptionalProperty(0x03, 'rear_left').setDecoder(
            this.openPercentageDecoder
          ),
          new OptionalProperty(0x04, 'hatch').setDecoder(
            this.openPercentageDecoder
          ),
        ]
      ),

      new Property(0x03, 'windowsPositions').setOptionalSubProperties(
        'windowLocation',
        [
          new OptionalProperty(0x00, 'front_left').setDecoder(
            this.positionDecoder
          ),
          new OptionalProperty(0x01, 'front_right').setDecoder(
            this.positionDecoder
          ),
          new OptionalProperty(0x02, 'rear_right').setDecoder(
            this.positionDecoder
          ),
          new OptionalProperty(0x03, 'rear_left').setDecoder(
            this.positionDecoder
          ),
          new OptionalProperty(0x04, 'hatch').setDecoder(this.positionDecoder),
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
