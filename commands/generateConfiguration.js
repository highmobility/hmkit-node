/*
 *  The MIT License
 *
 *  Copyright (c) 2014- High-Mobility GmbH (https://high-mobility.com)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 *  generateConfiguration.js
 *
 *  Created by Mikk Õun on 20/01/2020.
 */

const YAML = require('yamljs');
const fs = require('fs');

const CAPABILITY_CONFIGURATION_FILES = [
  'browser.yml',
  'capabilities.yml',
  'charging.yml',
  'chassis_settings.yml',
  'climate.yml',
  'cruise_control.yml',
  'dashboard_lights.yml',
  'diagnostics.yml',
  'doors.yml',
  'driver_fatigue.yml',
  'engine.yml',
  'failure_message.yml',
  'firmware_version.yml',
  'fueling.yml',
  'graphics.yml',
  'heart_rate.yml',
  'historical.yml',
  'home_charger.yml',
  'honk_horn_flash_lights.yml',
  'hood.yml',
  'ignition.yml',
  'keyfob_position.yml',
  'light_conditions.yml',
  'lights.yml',
  'maintenance.yml',
  'messaging.yml',
  'mobile.yml',
  'multi_command.yml',
  'navi_destination.yml',
  'notifications.yml',
  'offroad.yml',
  'parking_brake.yml',
  'parking_ticket.yml',
  'power_takeoff.yml',
  'race.yml',
  'remote_control.yml',
  'rooftop_control.yml',
  'seats.yml',
  'tachograph.yml',
  'text_input.yml',
  'theft_alarm.yml',
  'trunk.yml',
  'usage.yml',
  'valet_mode.yml',
  'vehicle_location.yml',
  'vehicle_status.yml',
  'vehicle_time.yml',
  'video_handover.yml',
  'wake_up.yml',
  'weather_conditions.yml',
  'wi_fi.yml',
  'windows.yml',
  'windscreen.yml'
];

const CUSTOM_TYPES_FILE_PATH = `misc/custom_types.yml`;
const UNIT_TYPES_FILE_PATH = 'misc/unit_types.yml';
const CAPABILITIES_DESTINATION_FILE = `${__dirname}/../src/Configuration/capabilities.json`;
const tokenRegex = new RegExp(`types.`);

function autoApiPath(path) {
  return `${__dirname}/../../auto-api/${path}`;
}

function parseConfigurationFiles() {
  const customTypes = parseCustomTypesFile();
  const unitTypes = parseUnitTypesFile();

  const parsedCapabilities = CAPABILITY_CONFIGURATION_FILES.reduce(
    (configurationObject, fileName) => {
      const filePath = autoApiPath(`capabilities/${fileName}`);
      const capability = parseYmlFile(filePath);

      const mappedCapabilityConf = mapStateProps({
        ...capability,
        properties: buildCapabilityProperties(capability, customTypes, unitTypes),
      });

      return {
        ...configurationObject,
        [mappedCapabilityConf.name]: mappedCapabilityConf
      };
    },
    {}
  );

  fs.writeFileSync(
    CAPABILITIES_DESTINATION_FILE,
    JSON.stringify(parsedCapabilities, null, 2)
  );

  console.log('Successfully updated capabilities configuration.');
}

function buildCapabilityProperties(capability, customTypes, unitTypes) {
  return capability.properties.map((property) =>
    buildCapabilityProperty(property, customTypes, unitTypes)
  );
}

function mapStateProps(capability) {
  if (capability.state && capability.state === 'all') {
    return {
      ...capability,
      state: capability.properties.map(({ id }) => id)
    };
  }

  return capability;
}

function buildCapabilityProperty(property, customTypes, unitTypes) {
  const newProperty = { ...property };
  if (newProperty.unit) {
    newProperty.unit = { ...unitTypes[property.unit] };
  }

  if (property.type.indexOf('types.') === 0) {
    const customTypeKey = property.type.replace(tokenRegex, '');

    const customType = customTypes[customTypeKey];

    if (customType.items) {
      const mappedItems = customType.items.map((propItem) =>
        buildCapabilityProperty(propItem, customTypes, unitTypes)
      );

      return {
        ...customType,
        ...newProperty,
        customType: customTypeKey,
        type: customType.type,
        items: mappedItems
      };
    }

    return {
      ...customType,
      ...newProperty,
      customType: customTypeKey,
      type: customType.type
    };
  }

  return newProperty;
}

function parseCustomTypesFile() {
  const filePath = autoApiPath(CUSTOM_TYPES_FILE_PATH);

  return parseYmlFile(filePath).types.reduce(
    (allTypes, type) => ({
      ...allTypes,
      [type.name]: type
    }),
    {}
  );
}

function parseUnitTypesFile() {
  const filePath = autoApiPath(UNIT_TYPES_FILE_PATH);

  return parseYmlFile(filePath).measurement_types.reduce(
    (allTypes, type) => ({
      ...allTypes,
      [type.name]: type
    }),
    {}
  );
}

function parseYmlFile(filePath) {
  const file = fs.readFileSync(
    filePath,
    'utf8'
  );

  return YAML.parse(file);
}

parseConfigurationFiles();
