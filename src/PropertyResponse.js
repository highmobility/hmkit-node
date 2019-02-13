import Property from './Property';
import { bytesSum } from './helpers';

const PROPERTY_DATA_ID = 0x01;
const PROPERTY_TIMESTAMP_ID = 0x02;
const PROPERTY_FAILURE_ID = 0x03;

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
  parse(data: Uint8Array, properties: Array<Property>) {
    this.bindProperties(
      this.parseProperties(data, properties).filter(
        property =>
          (property.value !== null && property.value !== undefined) ||
          property.subProperties.length > 0
      )
    );
  }

  /*
   * bindProperties()
   *
   * properties - parsed properties with values that will be binded.
   *
   * Binds properties to "this" by their namespace.
   * This function can be used in extending class to override binding.
   */
  bindProperties(properties: Array<Property>) {
    properties.forEach(property => {
      this[property.namespace] = property.getValue();
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
   * TODO: Maybe split this function into more readable chunks. This function does too much at the moment.
   */
  parseProperties(data: Uint8Array, properties: Array<Property>) {
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
          let componentCounter = 0;

          while (componentCounter < propertyComponentsData.length) {
            const componentIdentifier =
              propertyComponentsData[componentCounter];
            const propertyComponentLength = bytesSum(
              propertyComponentsData.slice(
                componentCounter + 1,
                componentCounter + 3
              )
            );

            const propertyComponentData = propertyComponentsData.slice(
              componentCounter + 3,
              componentCounter + 3 + propertyComponentLength
            );

            switch (componentIdentifier) {
              case PROPERTY_DATA_ID: {
                property.parseValue(propertyComponentData);
                break;
              }
              case PROPERTY_TIMESTAMP_ID: {
                // TODO: Handle proeprty timestamp
                break;
              }
              case PROPERTY_FAILURE_ID: {
                // TODO: Handle property failure
                break;
              }
              default:
                break;
            }

            componentCounter += 3 + propertyComponentLength;
          }
        }

        counter += 3 + propertyComponentsLength;
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
