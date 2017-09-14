const HMKit = require('./lib');

const clientCertificate =
  'dGVzdDRbiGWyUEqp6/BYf5skRhEFhuDbabgxKubaSrtF6KhjQFvKADHfO9+LhYq9TdJ4yzswsShrIEMQ6Ezu63NPtTXU+uKShsFzAXeNhTyO7tGcwLItGRrELb4lxXE22oGxuLgLsqQD5qS8EqTkEcgdF8UNUMhZce3bQtXRrBPJAdeC70BCggV5TOlVepKNBkzTU5sFubdH';
const clientPrivateKey = '7qzkS+bF8n84E2HnLZ/AKGMfyVcRt8L6PeXXiLaRHkM=';
const accessToken = '1-c1w9toXnTiLIMX43FfGF2Zn744hthep3WHCkFJO8Z9akKC--yfkkWIC1afZfVG-A9V8Pu6D2ORSkxt1gXnPo899mBeoRVDHz0i34ru9QCDGD9YGvpGrwTFdiZ05DiiaQ';

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
