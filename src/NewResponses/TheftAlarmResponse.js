import CapabilityResponse from './CapabilityResponse';
import Property from './Property';
import { switchDecoder } from '../helpers';

export default class TheftAlarmResponse extends CapabilityResponse {
  constructor(data: Uint8Array) {
    super();

    const properties = [
      new Property(0x01, 'alarmState').setDecoder(
        switchDecoder({
          0x00: 'not_armed',
          0x01: 'armed',
          0x02: 'triggered'
        })
      )
    ];

    this.parseState(data, properties);
  }
}
