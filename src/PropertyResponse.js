import PropertyDecoder from './PropertyDecoder';
import { bytesSum, timestampDecoder, parsePropertyComponents } from './helpers';
import mergeWith from 'lodash/mergeWith';

export default class PropertyResponse {
  /*
   * parse()
   *
   * data - incoming response data
   * properties - capability properties that should be extracted from response
   *
   * This parses all configured properties and adds them to "this" by their namespace.
   * Properties that do not have value will be ignored.
   */
  parse(
    data: Uint8Array,
    properties: Array<PropertyDecoder>,
    config: { withUniversalProperties: Boolean } = {}
  ) {
    this.parseProperties(
      data,
      config.withUniversalProperties
        ? this.addUniversalProperties(properties)
        : properties
    ).forEach(parsedProp => {
      mergeWith(this, parsedProp, this.customiser);
    });
  }

  addUniversalProperties(properties: Array<PropertyDecoder>) {
    const timestampProperty = new PropertyDecoder(0xa2, 'date').setDecoder(
      timestampDecoder
    );

    return properties.concat(timestampProperty);
  }

  // TODO: Improve this temp shieeeet
  customiser(objValue, srcValue) {
    if (Array.isArray(objValue)) {
      return objValue.concat(srcValue);
    }

    return srcValue;
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
   * TODO: Maybe split this function into more readable chunks. This function does too much at the moment.
   */
  parseProperties(data: Uint8Array, properties: Array<PropertyDecoder>) {
    const parsedProperties = [];
    const propertiesData = [...data.slice(3, data.length)];

    if (propertiesData.length > 0) {
      let counter = 0;

      while (counter < propertiesData.length) {
        const identifier = propertiesData[counter];
        const propertyComponentsLength = bytesSum(
          propertiesData.slice(counter + 1, counter + 3)
        );
        const propertyComponentsData = propertiesData.slice(
          counter + 3,
          counter + 3 + propertyComponentsLength
        );

        const property = this.findProperty(identifier, properties);

        if (!!property) {
          const componentBytes = parsePropertyComponents(
            propertyComponentsData
          );

          const parsedProperty = property.parseComponents(
            componentBytes.data,
            componentBytes.time,
            componentBytes.error
          );

          if (parsedProperty !== undefined)
            parsedProperties.push(parsedProperty);
        }

        counter += 3 + propertyComponentsLength;
      }
    }

    return parsedProperties;
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
  findProperty(identifier: Number, properties: Array<PropertyDecoder>) {
    return properties.find(property => property.identifier === identifier);
  }
}
