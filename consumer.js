const HMKit = require('./lib');

const clientCertificate =
  'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5';
const clientPrivateKey = 'jVNDUrJjZnVFYybph7MoMiFpTqi6Bz3w6iG+XqKD1e0=';
const accessToken = 'sFy5sjP_AX_EKfumK3cM2rX4RBinEavnidzwgUsSZOM5JwaXvnKIC37CyNRc1Rdb04o33EwsvNSzdjBnBXK0RjHhdFukonlJqczVZjl7B4EGlK1vFNhU9LA7vDgzn3ctGQ';

const hmkit = new HMKit(clientCertificate, clientPrivateKey).staging();

async function app() {
  const accessCertificate = await hmkit.downloadAccessCertificate(
    accessToken
  );
  //
  // const response = await hmkit.telematics.sendCommand(
  //   accessCertificate.getVehicleSerial(),
  //   hmkit.commands.EngineCommand.turnOn()
  // );

  // console.log(response.bytes()); // [0, 53, 1, 1]
  // console.log(response.parse()); // EngineResponse { engine: 1 }
}

// run app
app();
