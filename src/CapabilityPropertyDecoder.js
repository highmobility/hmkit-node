import Property from './Property';
import PropertyDecoder from './PropertyDecoder';

/**
 * Capabilities have a 2 byte identifier
 */
export default class CapabilityPropertyDecoder extends PropertyDecoder {
  parseComponents = (
    data: Array<Number>,
    timestamp: Array<Number>,
    error: Array<Number>
  ) => {
    if (this.subProperties.length > 0) {
      const subProperty = this.findSubProperty(data.slice(0, 2));

      if (!!subProperty) {
        if (this.subPropertiesIdentifierNamespace !== null) {
          return {
            [this.namespace]: [
              {
                [this.subPropertiesIdentifierNamespace]:
                  subProperty.identifierValue,
                ...subProperty.parseComponents(
                  data.slice(2, data.length),
                  timestamp,
                  error,
                  false
                ),
              },
            ],
          };
        }

        return {
          [this.namespace]: subProperty.parseComponents(
            data.slice(2, data.length),
            timestamp,
            error,
            false
          ),
        };
      }

      return { [this.namespace]: null };
    }

    return { [this.namespace]: this.decode(data.slice(2, data.length)) };
  };

  findSubProperty = (identifiers: Array<number>) =>
    this.subProperties.find(
      subProperty =>
        Array.isArray(subProperty.identifier) &&
        subProperty.identifier[0] === identifiers[0] &&
        subProperty.identifier[1] === identifiers[1]
    );
}