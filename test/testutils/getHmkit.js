import HMKit from '../../src';

const defaultClientCertificate =
  'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5';
const defaultClientPrivateKey = 'jVNDUrJjZnVFYybph7MoMiFpTqi6Bz3w6iG+XqKD1e0=';

export default function hmkit(
  clientCertificate = defaultClientCertificate,
  clientPrivateKey = defaultClientPrivateKey
) {
  return new HMKit(clientCertificate, clientPrivateKey).staging();
}

export const vehicleSerial = '356675D0CC76A8FFF5';
export const accessToken =
  'sFy5sjP_AX_EKfumK3cM2rX4RBinEavnidzwgUsSZOM5JwaXvnKIC37CyNRc1Rdb04o33EwsvNSzdjBnBXK0RjHhdFukonlJqczVZjl7B4EGlK1vFNhU9LA7vDgzn3ctGQ';
