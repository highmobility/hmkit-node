import Response from '../../src/Responses/Response';
import CapabilitiesResponse from '../../src/Responses/CapabilitiesResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`CapabilitiesResponse`, () => {
  it(`should return CapabilitiesResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '00100101000300490001000a00230001121314151617010008005300011213141501000a002400011213141516170100050062000112010004006100010100040033000101000500200001120100050035000112010005004000011201000300510001000900600001121314151601000600260001121301000400540001010005003600011201000400340001010004003700010100050031000112010005003800021101000400520001010005005800011201000600470001020301000500650001020100040057000101000500250001120100040056000101000500630001120100040064000101000300440001000500460001120100040050000101000500210001120100050028000112010004003000010100030043000100030022020100040055000101000700590001020304010005004500011201000700420001121314a20008120a1f101e180078'
      )
    );

    expect(response.parse()).toBeInstanceOf(CapabilitiesResponse);
    expect(response.parse()).toEqual({
      capabilities: [
        {
          capabilityIdentifier: 'door_locks',
          supportedMessageTypes: [
            'get_lock_state',
            'lock_state',
            'lock_unlock_doors',
          ],
        },
        {
          capabilityIdentifier: 'trunk',
          supportedMessageTypes: [
            'get_trunk_state',
            'trunk_state',
            'control_trunk',
          ],
        },
        {
          capabilityIdentifier: 'wake_up',
          supportedMessageTypes: ['wake_up'],
        },
        {
          capabilityIdentifier: 'charging',
          supportedMessageTypes: [
            'get_charge_state',
            'charge_state',
            'start_stop_charging',
            'set_charge_limit',
            'open_close_charging_port',
            'set_charge_mode',
            'set_charging_timers',
            'set_reduction_of_charging_current_times',
          ],
        },
        {
          capabilityIdentifier: 'climate',
          supportedMessageTypes: [
            'get_climate_state',
            'climate_state',
            'change_starting_times',
            'start_stop_hvac',
            'start_stop_defogging',
            'start_stop_defrosting',
            'start_stop_ionising',
            'set_temperature_settings',
          ],
        },
        {
          capabilityIdentifier: 'rooftop_control',
          supportedMessageTypes: [
            'get_rooftop_state',
            'rooftop_state',
            'control_rooftop',
          ],
        },
        {
          capabilityIdentifier: 'honk_horn_flash_lights',
          supportedMessageTypes: [
            'get_flashers_state',
            'flashers_state',
            'honk_flash',
            'activate_deactivate_emergency_flashers',
          ],
        },
        {
          capabilityIdentifier: 'valet_mode',
          supportedMessageTypes: [
            'get_valet_mode',
            'valet_mode',
            'activate_deactivate_valet_mode',
          ],
        },
        {
          capabilityIdentifier: 'vehicle_location',
          supportedMessageTypes: ['get_vehicle_location', 'vehicle_location'],
        },
        {
          capabilityIdentifier: 'navi_destination',
          supportedMessageTypes: [
            'get_navi_destination',
            'navi_destination',
            'set_navi_destination',
          ],
        },
        {
          capabilityIdentifier: 'diagnostics',
          supportedMessageTypes: ['get_diagnostics_state', 'diagnostics_state'],
        },
        {
          capabilityIdentifier: 'maintenance',
          supportedMessageTypes: ['get_maintenance_state', 'maintenance_state'],
        },
        {
          capabilityIdentifier: 'engine',
          supportedMessageTypes: [
            'get_ignition_state',
            'ignition_state',
            'turn_ignition_on_off',
          ],
        },
        {
          capabilityIdentifier: 'lights',
          supportedMessageTypes: [
            'get_lights_state',
            'lights_state',
            'control_lights',
          ],
        },
        {
          capabilityIdentifier: 'messaging',
          supportedMessageTypes: ['message_received', 'send_message'],
        },
        {
          capabilityIdentifier: 'notifications',
          supportedMessageTypes: [
            'notification',
            'clear_notification',
            'notification_action',
          ],
        },
        {
          capabilityIdentifier: 'fueling',
          supportedMessageTypes: [
            'get_gas_flap_state',
            'gas_flap_state',
            'open_close_gas_flap',
          ],
        },
        {
          capabilityIdentifier: 'windscreen',
          supportedMessageTypes: [
            'get_windscreen_state',
            'windscreen_state',
            'set_windscreen_damage',
            'set_windscreen_replacement_needed',
            'control_wipers',
          ],
        },
        {
          capabilityIdentifier: 'video_handover',
          supportedMessageTypes: ['video_handover'],
        },
        {
          capabilityIdentifier: 'text_input',
          supportedMessageTypes: ['text_input'],
        },
        {
          capabilityIdentifier: 'windows',
          supportedMessageTypes: [
            'get_windows_state',
            'windows_state',
            'control_windows',
          ],
        },
        {
          capabilityIdentifier: 'theft_alarm',
          supportedMessageTypes: [
            'get_theft_alarm_state',
            'theft_alarm_state',
            'set_theft_alarm_state',
          ],
        },
        {
          capabilityIdentifier: 'parking_ticket',
          supportedMessageTypes: [
            'get_parking_ticket',
            'parking_ticket',
            'start_parking',
            'end_parking',
          ],
        },
        {
          capabilityIdentifier: 'browser',
          supportedMessageTypes: ['load_url'],
        },
        {
          capabilityIdentifier: 'vehicle_time',
          supportedMessageTypes: ['get_vehicle_time', 'vehicle_time'],
        },
        {
          capabilityIdentifier: 'graphics',
          supportedMessageTypes: ['display_image'],
        },
        {
          capabilityIdentifier: 'offroad',
          supportedMessageTypes: ['get_offroad_state', 'offroad_state'],
        },
        {
          capabilityIdentifier: 'chassis_settings',
          supportedMessageTypes: [
            'get_chassis_settings',
            'chassis_settings',
            'set_driving_mode',
            'start_stop_sports_chrono',
            'set_spring_rates',
            'set_chassis_position',
          ],
        },
        {
          capabilityIdentifier: 'light_conditions',
          supportedMessageTypes: ['get_light_conditions', 'light_conditions'],
        },
        {
          capabilityIdentifier: 'weather_conditions',
          supportedMessageTypes: [
            'get_weather_conditions',
            'weather_conditions',
          ],
        },
        {
          capabilityIdentifier: 'seats',
          supportedMessageTypes: ['get_seats_state', 'seats_state'],
        },
        {
          capabilityIdentifier: 'race',
          supportedMessageTypes: ['get_race_state', 'race_state'],
        },
        {
          capabilityIdentifier: 'parking_brake',
          supportedMessageTypes: [
            'get_parking_brake_state',
            'parking_brake_state',
            'set_parking_brake',
          ],
        },
        {
          capabilityIdentifier: 'wi_fi',
          supportedMessageTypes: [
            'get_wi_fi_state',
            'wi_fi_state',
            'connect_to_network',
            'forget_network',
            'enable_disable_wi_fi',
          ],
        },
        {
          capabilityIdentifier: 'home_charger',
          supportedMessageTypes: [
            'get_home_charger_state',
            'home_charger_state',
            'set_charge_current',
            'set_price_tariffs',
            'activate_deactivate_solar_charging',
            'enable_disable_wi_fi_hotspot',
            'authenticate_expire',
          ],
        },
        {
          capabilityIdentifier: 'dashboard_lights',
          supportedMessageTypes: ['get_dashboard_lights', 'dashboard_lights'],
        },
        {
          capabilityIdentifier: 'cruise_control',
          supportedMessageTypes: [
            'get_cruise_control_state',
            'cruise_control_state',
            'activate_deactivate_cruise_control',
          ],
        },
        {
          capabilityIdentifier: 'start_stop',
          supportedMessageTypes: [
            'get_start_stop_state',
            'start_stop_state',
            'activate_deactivate_start_stop',
          ],
        },
        {
          capabilityIdentifier: 'tachograph',
          supportedMessageTypes: ['get_tachograph_state', 'tachograph_state'],
        },
        {
          capabilityIdentifier: 'power_takeoff',
          supportedMessageTypes: [
            'get_power_takeoff_state',
            'power_takeoff_state',
            'activate_deactivate_power_takeoff',
          ],
        },
      ],
    });
  });
});
