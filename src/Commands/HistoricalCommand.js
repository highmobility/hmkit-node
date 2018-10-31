import Command from './Command';
import BaseCommand from './BaseCommand';
import { dateToBytes } from '../encoding';
import CAPABILITY_IDENTIFIERS from '../CAPABILITY_IDENTIFIERS';

export default class HistoricalCommand extends BaseCommand {
  /**
   * @function getStates
   *
   * @property {String} capability (string: 'door_locks | trunk | wake_up | charging | climate | rooftop_control | honk_horn_flash_lights | remote_control | valet_mode | heart_rate | vehicle_location | navi_destination | diagnostics | maintenance | engine | lights | messaging | notifications | fueling | driver_fatigue | windscreen | video_handover | text_input | windows | theft_alarm | parking_ticket | keyfob_position | browser | vehicle_time | graphics | offroad | chassis_settings | light_conditions | weather_conditions | seats | race | parking_brake | wi_fi | home_charger | dashboard_lights | cruise_control | start_stop | tachograph | power_takeoff | mobile | hood | usage') Capability
   * @property {Date} startDate (date) Start date (optional)
   * @property {Date} endDate (date) End date (optional)
   */
  static getStates(capability: String, startDate: Date, endDate: Date) {
    const capabilityConf = Object.entries(CAPABILITY_IDENTIFIERS).find(
      ([namespace]) => namespace === capability
    );

    if (capabilityConf !== undefined) {
      const startDateBytes = !!startDate
        ? this.buildProperty(0x02, dateToBytes(startDate))
        : [];
      const endDateBytes = !!endDate
        ? this.buildProperty(0x03, dateToBytes(endDate))
        : [];

      return new Command([
        0x00,
        0x12,
        0x00,
        ...this.buildProperty(0x01, capabilityConf[1].identifier),
        ...startDateBytes,
        ...endDateBytes,
      ]);
    }

    return new Command([0x00, 0x12, 0x00]);
  }
}
