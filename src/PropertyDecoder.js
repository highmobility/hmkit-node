import Property from './Property';
import { timestampDecoder } from './helpers';

export default class PropertyDecoder {
  constructor(identifier: number, namespace: string) {
    this.identifier = identifier;
    this.namespace = namespace;
    this.value = undefined;
    this.isArray = false;
    this.subProperties = [];
    this.subPropertiesIdentifierNamespace = null;
  }

  array = () => {
    this.isArray = true;
    return this;
  };

  parseComponents = (
    data: Array<Number>,
    timestamp: Array<Number>,
    error: Array<Number>,
    isRoot = true
  ) => {
    if (this.subProperties.length > 0) {
      const subProperty = this.findSubProperty(data[0]);

      if (!!subProperty) {
        if (this.subPropertiesIdentifierNamespace !== null) {
          return {
            [this.namespace]: [
              this.handlePropertyWrap(
                {
                  [this.subPropertiesIdentifierNamespace]:
                    subProperty.identifierValue,
                  ...subProperty.parseComponents(
                    data.slice(1, data.length),
                    timestamp,
                    error,
                    false
                  ),
                },
                timestamp,
                error,
                isRoot
              ),
            ],
          };
        }

        return this.handlePropertyWrap(
          subProperty.parseComponents(
            data.slice(1, data.length),
            timestamp,
            error,
            false
          ),
          timestamp,
          error,
          isRoot
        );
      }

      return undefined;
    } else if (this.isArray) {
      return {
        [this.namespace]: [
          this.handlePropertyWrap(this.decode(data), timestamp, error, isRoot),
        ],
      };
    } else if (this.namespace) {
      return {
        [this.namespace]: this.handlePropertyWrap(
          this.decode(data),
          timestamp,
          error,
          isRoot
        ),
      };
    }

    return this.handlePropertyWrap(this.decode(data), timestamp, error, isRoot);
  };

  handlePropertyWrap = (decodedValue, timestamp, error, isRoot) =>
    isRoot
      ? new Property(
          decodedValue,
          timestamp ? timestampDecoder(timestamp) : undefined,
          error
        )
      : decodedValue;

  decode = (data: Array<number>) => {
    if (!!this.decoder) {
      return this.decoder(data);
    } else if (data.length === 1) {
      return data[0];
    }

    return data;
  };

  setDecoder = (decoder: Function) => {
    this.decoder = decoder;
    return this;
  };

  setOptionalSubProperties = (
    identifierNamespace: String,
    subProperties: Array<OptionalProperty>
  ) => {
    this.subProperties.push(...subProperties);
    this.subPropertiesIdentifierNamespace = identifierNamespace;
    return this;
  };

  findSubProperty = (identifier: number) =>
    this.subProperties.find(
      supProperty => supProperty.identifier === identifier
    );
}
