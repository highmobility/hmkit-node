# Documentation

## Example use

```
import HMKit from 'hmkit';
const hmkit = new HMKit(
  // client certificate,
  // client private key
);

// TODO: somehow access certificates are loaded in

async function app() {
  const response = await hmkit.telematics.sendCommand(
    'XXXXXXXXXXXXXXXXXX', // car serial
    hmkit.commands.EngineCommand.turnOn()
  );
  
  console.log(response.raw()); // "00350101"
  console.log(response.bytes()); // [0, 53, 1, 1]
  console.log(response.parse()); // EngineResponse { engine: 1 }
}

// run app
app();
```
