import Response from '../../src/Responses/Response';
import CapabilitiesResponse from '../../src/Responses/CapabilitiesResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`CapabilitiesResponse`, () => {
  it(`should return CapabilitiesResponse`, () => {
    const response = new Response(
      hexToUint8Array(
        '001001010005002000010201000500210001020100060023000102030100090024000102030405060100050025000102010006002600010203010007002700010203040100050028000102010003002902010004003000010100050031000102'
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
            'open_close_trunk',
          ],
        },
        {
          capabilityIdentifier: 'charging',
          supportedMessageTypes: [
            'get_charge_state',
            'charge_state',
            'start_stop_charging',
            'set_charge_limit',
          ],
        },
        {
          capabilityIdentifier: 'climate',
          supportedMessageTypes: [
            'get_climate_state',
            'climate_state',
            'set_climate_profile',
            'start_stop_hvac',
            'start_stop_defogging',
            'start_stop_defrosting',
            'start_stop_ionising',
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
          capabilityIdentifier: 'remote_control',
          supportedMessageTypes: [
            'get_control_mode',
            'control_mode',
            'start_control_mode',
            'stop_control_mode',
            'control_command',
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
          capabilityIdentifier: 'heart_rate',
          supportedMessageTypes: ['send_heart_rate'],
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
      ],
    });
  });
});
