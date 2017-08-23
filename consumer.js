const HMKit = require('./build/bundle');

const defaultDeviceCertificate =
  'dGVzdPZ/oYYWgKrJFhGOCcX/U8uWPy3SVh1dVY8r3vb0yFLi8kA1duKvysIPprpqbQw089Z33MdPuFGQU9Le509pmeAcnqiqOrrnVQHC+o+4tdUVLijFkBys6WliZSqwVY7KOu5SXSBY1PU8ophRJKm7X+r26qspCawv1S43ZboFGoyCxIpRUwsi0zsV3Daskx05USIR50X5';
const defaultDevicePrivateKey = 'jVNDUrJjZnVFYybph7MoMiFpTqi6Bz3w6iG+XqKD1e0=';
const defaultIssuerPublicKey =
  'w9D0H6D18iXHXFN/mdTL3R22EjJFoEO4fTpHf5KYerqHz+d6JXJ7ClRpDpgJ7XXrJxBFsNHehdozBFSW9mXilg==';

const hmkit = new HMKit(defaultDeviceCertificate, defaultDevicePrivateKey, defaultIssuerPublicKey);

async function app() {
  const response = await hmkit.telematics.sendCommand(
    '356675D0CC76A8FFF5', // car serial
    hmkit.commands.EngineCommand.turnOn()
  );

  console.log(response.bytes()); // [0, 53, 1, 1]
  console.log(response.parse()); // EngineResponse { engine: 1 }
}

// run app
app();
