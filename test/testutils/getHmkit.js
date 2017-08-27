import HMKit from '../../src';

const defaultDeviceCertificate =
  'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5';
const defaultDevicePrivateKey = 'jVNDUrJjZnVFYybph7MoMiFpTqi6Bz3w6iG+XqKD1e0=';

export default function hmkit(
  deviceCertificate = defaultDeviceCertificate,
  devicePrivateKey = defaultDevicePrivateKey
) {
  return new HMKit(deviceCertificate, devicePrivateKey).staging();
}

export const vehicleSerial = '356675D0CC76A8FFF5';
