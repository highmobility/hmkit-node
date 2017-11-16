import { CAPABILITY } from "../capabilities";
import { intToHex } from "../encoding";

export default class CapabilitiesResponse {
  static identifier = [0x00, 0x10];

  constructor(bytes) {
    this.parseCapabilities(bytes);
  }

  parseCapabilities(bytes) {
    const capabilitiesData = bytes.slice(3, bytes.length);

    const capabilitiesLength = capabilitiesData[0];

    const capabilityIndexes = this.findCapabilityIndexes(capabilitiesData);
    const capabilityTokens = this.getCapabilityTokens(
      capabilityIndexes,
      capabilitiesData
    );

    if (capabilityTokens.length !== capabilitiesLength) {
      this.error = "Failed to parse all capabilities.";
    } else {
      this.mapCapabilities(capabilityTokens);
    }
  }

  /*
   * mapCapabilities()
   *
   * capabilityTokens - Array of capability configurations. Each array in tokens array represents one capability.
   *                    First two bytes represent capability's MSB and LSB.
   *                    Example: [[0x00, 0x20, 0x00, ...otherRights], ...otherCapabilities]
   *
   * Takes parsed capability tokens and maps them to this response with correct namespace.
   */
  mapCapabilities(capabilityTokens) {
    capabilityTokens.forEach(token => {
      const capabilityToMap = Object.values(CAPABILITY).find(
        capability => token[0] === 0x00 && token[1] === capability.LSB
      );

      if (!capabilityToMap) {
        this.error = `Unconfigured capability, failed to parse (0x${intToHex(
          token[0]
        )} 0x${intToHex(token[1])}).`;
        return;
      }

      const capabilityData = token.slice(3, token.length);

      if (capabilityData.length !== token[2]) {
        this.error = `Invalid configuration length ${token[2]} instead of ${capabilityData.length}. ${capabilityToMap.LABEL} (0x${intToHex(
          token[0]
        )} 0x${intToHex(token[1])}).`;
        return;
      }

      this.mapCapabilityAvailability(capabilityToMap, capabilityData);
    });
  }

  mapCapabilityAvailability(capabilityToMap, capabilityData) {
    this[capabilityToMap.NAMESPACE] = {};

    capabilityData.forEach((availability, index) => {
      const availabilityValues = Object.values(capabilityToMap.AVAILABILITY);
      const availabilityNamespaces = Object.keys(capabilityToMap.AVAILABILITY);

      if (
        availabilityValues.length > index &&
        Object.values(availabilityValues[index]).length > availability
      ) {
        if (availabilityNamespaces.length === 1) {
          this[capabilityToMap.NAMESPACE] = Object.values(
            availabilityValues[index]
          )[availability];
        } else {
          this[capabilityToMap.NAMESPACE][
            availabilityNamespaces[index]
          ] = Object.values(availabilityValues[index])[availability];
        }
      } else {
        this.error = `Invalid capability configuration. (0x00 0x${intToHex(
          capabilityToMap.LSB
        )}).`;
      }
    });
  }

  /*
   * findCapabilityIndexes()
   *
   * encodedCapabilitiesArray - data part extracted from response bytes. Example with two capabilities - [0x00, 0x20, 0x01, 0x00, 0x21, 0x00]
   *
   * Helper function to parse capabilities config fetched from emulator API call.
   * Input is uint8array and it returns array of indexes where different capabilities config starts and ends.
   * (from hm-emulator - scripts/utils/capability.js)
   */
  findCapabilityIndexes(encodedCapabilitiesArray) {
    const capabilityIndexes = [];

    encodedCapabilitiesArray.forEach((capability, index) => {
      if (capability === 0x00 && encodedCapabilitiesArray[index + 1] >= 0x20) {
        capabilityIndexes.push(index);
      }
    });

    capabilityIndexes.push(encodedCapabilitiesArray.length);

    return capabilityIndexes;
  }

  /*
   * getCapabilityTokens()
   *
   * capabilityIndexes - Array of indexes where one capability data ends and another capability data starts.
   * encodedCapabilitiesArray - data part extracted from response bytes.
   *
   * Extracts different capabilities config from one long capabilities config array.
   * (from hm-emulator - scripts/utils/capability.js)
   */
  getCapabilityTokens(capabilityIndexes, encodedCapabilitiesArray) {
    const capabilityTokens = [];

    capabilityIndexes.forEach((capabilityIndex, index) => {
      if (index < capabilityIndexes.length - 1) {
        capabilityTokens.push(
          encodedCapabilitiesArray.slice(
            capabilityIndex,
            capabilityIndexes[index + 1]
          )
        );
      }
    });

    return capabilityTokens;
  }
}
