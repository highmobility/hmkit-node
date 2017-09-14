const HMKit = require('./lib');

const clientCertificate = 'dGVzdEqFnlrGfjCXqCkTwfqzK3ZNj/lhWk0caxnRv8Qt+G6Na+KH6jConA6RufYqNxm+WqehbBcjFSjJIlMBLG11hlRbv2fKE/p+sLzgn8Q3/y3fFvpIGpSHa7cRnnL+t3oLLU+sJfWRqYkwYNty/EqkJ8AEwmH++fW13grveSc5bhtLIAd+biDFKnl3txM4aSneu/jPc/nc';
const clientPrivateKey = 'wTd1J5SfHMLu2ta0zkRFm6rPCFhoKp/ZAzeLNsZ85OU=';
const accessToken = 'dVZ_ILse2ZnvR1Yov-bwmjEadxDFY4WKwLDcYXRW43zN94JIRF930RSHH33wDix-7tsEzK4oGtrkVkU2z0vrtdxGn3P3tHOGTeWNrnvoCer_QgRE1AAJJN96UQHJyuAN2Q';

const hmkit = new HMKit(clientCertificate, clientPrivateKey).staging();

async function app() {
  const accessCertificate = await hmkit.downloadAccessCertificate(
    accessToken
  );

  const response = await hmkit.telematics.sendCommand(
    accessCertificate.getVehicleSerial(),
    hmkit.commands.EngineCommand.turnOn()
  );

  console.log(response.bytes()); // [0, 53, 1, 1]
  console.log(response.parse()); // EngineResponse { engine: 'on' }
}

// run app
app();
