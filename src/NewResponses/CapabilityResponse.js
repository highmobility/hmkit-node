import Property from './Property';
import { bytesSum } from '../helpers';

export default class CapabilityResponse {
  static STATE_IDENTIFIER = 0x01; // TODO: Is this needed? Maybe validate the third byte since getState should always have 0x01 identifier.

  /*
   * parseState()
   *
   * data - incoming response data
   * properties - capability properties that should be extracted from response
   *
   * This parses all configured properties and adds them to "this" by their namespace.
   * Properties that do not have value will be ignored.
   */
  parseState(data: Uint8Array, properties: Array<Property>) {
    this.parseProperties(data, properties)
      .filter(property => property.value !== null && property.value !== undefined)
      .forEach(property => {
        this[property.namespace] = property.value;
      });
  }

  /*
   * parseProperties()
   *
   * data - incoming response data
   * properties - capability properties that should be extracted from response
   *
   * Parses data and sets decoded values for each property that is specified in response.
   * Returns properties with values. If property data was not in the response data then property will not have a value.
   *
   * TODO: Add data length validation and individual property length validation
   */
  parseProperties(data: Uint8Array, properties: Array<Property>) {
    const propertiesData = data.slice(5, data.length);

    if (propertiesData !== null) {
      let counter = 0;
      while (counter < propertiesData.length) {
        const identifier = propertiesData[counter];
        const propertyDataLength = bytesSum(propertiesData.slice(counter + 1, counter + 3));
        const propertyData = propertiesData.slice(counter + 3, counter + 3 + propertyDataLength);

        const property = this.findProperty(identifier, properties);

        if (!!property) {
          property.parseValue(propertyData);
        }

        counter += 3 + propertyDataLength;
      }
    }

    return properties;
  }

  /*
   * findProperty()
   *
   * identifier - property identifier
   * properties - list of properties where to search from
   *
   * Simple array find helper to keep the code cleaner.
   * Returns property with correct identifier or null if property was not found.
   * If property is not found, parent function should definitely throw/show error.
   */
  findProperty(identifier: Number, properties: Array<Property>) {
    return properties.find(property => property.identifier === identifier);
  }
}
