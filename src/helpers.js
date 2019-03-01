import {
  ieee754DoubleToBase10,
  ieee754ToBase10,
  pad,
  uint8toInt8,
  PROPERTY_DATA_ID,
  PROPERTY_TIMESTAMP_ID,
  PROPERTY_FAILURE_ID,
} from './encoding';

export function parsePropertyComponents(propertyComponentsData: Array<Number>) {
  let componentCounter = 0;
  const componentBytes = {};

  while (componentCounter < propertyComponentsData.length) {
    const componentIdentifier = propertyComponentsData[componentCounter];
    const propertyComponentLength = bytesSum(
      propertyComponentsData.slice(componentCounter + 1, componentCounter + 3)
    );

    const propertyComponentData = propertyComponentsData.slice(
      componentCounter + 3,
      componentCounter + 3 + propertyComponentLength
    );

    switch (componentIdentifier) {
      case PROPERTY_DATA_ID: {
        componentBytes.data = propertyComponentData;
        break;
      }
      case PROPERTY_TIMESTAMP_ID: {
        componentBytes.time = propertyComponentData;
        break;
      }
      case PROPERTY_FAILURE_ID: {
        componentBytes.error = propertyComponentData;
        break;
      }
      default:
        break;
    }

    componentCounter += 3 + propertyComponentLength;
  }

  return componentBytes;
}

export function bytesSum(bytes: Array<Number>) {
  const hex = bytes
    .map(decimal => pad(decimal.toString(16), 2))
    .reduce((memo, i) => memo + i, '');
  return Number(`0x${hex}`);
}

export function uint8Decoder(bytes: Array<Number>) {
  return uint8toInt8(bytesSum(bytes));
}

export function chunkArray(array: Array<any>, chunkCount: number = 2) {
  const sets = [];
  const chunkSize = array.length / chunkCount;
  let i = 0;

  while (i < chunkCount) {
    sets[i] = array.splice(0, chunkSize);
    i++;
  }

  return sets;
}

export function switchDecoder(options: Object) {
  return (bytes: Array<Number>) =>
    bytes.length > 0 && bytes[0] in options ? options[bytes[0]] : null;
}

export function timestampDecoder(bytes: Array<Number>) {
  return new Date(bytesSum(bytes));
}

export function coordinatesDecoder(data: Array<Number>) {
  return {
    latitude: getRoundedIeee754DoubleToBase10(6)(
      data.slice(0, data.length / 2)
    ),
    longitude: getRoundedIeee754DoubleToBase10(6)(data.slice(data.length / 2)),
  };
}

export function getRoundedIeee754ToBase10(precision): number {
  const precisionMultiplier = Math.pow(10, precision);

  return (...args) => {
    const unrounded = ieee754ToBase10(...args);
    return Math.round(unrounded * precisionMultiplier) / precisionMultiplier;
  };
}

export function getRoundedIeee754DoubleToBase10(precision): number {
  const precisionMultiplier = Math.pow(10, precision);

  return (...args) => {
    const unrounded = ieee754DoubleToBase10(...args);
    return Math.round(unrounded * precisionMultiplier) / precisionMultiplier;
  };
}

export function matrixZoneDecoder(bytes: Array<Number>) {
  return {
    rows: (bytes[0] & 0xf0) >> 4,
    columns: bytes[0] & 0x0f,
  };
}

export function progressDecoder(bytes: Array<Number>) {
  return Math.round(ieee754DoubleToBase10(bytes) * 100) / 100;
}

export function activeInactiveDecoder() {
  return switchDecoder({
    0x00: 'inactive',
    0x01: 'active',
  });
}

export function isArray(value: Any) {
  return (
    (value.BYTES_PER_ELEMENT &&
      Object.prototype.toString.call(value.buffer) ===
        `[object ArrayBuffer]`) ||
    Array.isArray(value)
  );
}
