import Response from './Responses/Response';
import {
  base64ToUint8,
  byteArrayToBase64,
  uint8ArrayToHex,
  hexToUint8Array,
} from './encoding';

export default class Telematics {
  constructor(hmkit) {
    this.hmkit = hmkit;
  }

  getNonce = () =>
    this.hmkit.apiClient
      .post(`${this.hmkit.api.getUrl()}nonces`, {
        body: JSON.stringify({
          serial_number: this.hmkit.clientCertificate.getSerial(),
        }),
      })
      .then(
        result => result.body.nonce,
        () => {
          throw new Error('Failed to fetch nonce.');
        }
      );

  onTelematicsSendData = async (issuer, ser, dt) =>
    await this.hmkit.apiClient
      .post(`${this.hmkit.api.getUrl()}telematics_commands`, {
        body: JSON.stringify({
          serial_number: uint8ArrayToHex(new Uint8Array(ser)).toUpperCase(),
          issuer: uint8ArrayToHex(new Uint8Array(issuer)).toUpperCase(),
          data: byteArrayToBase64(dt),
        }),
      })
      .then(
        res => res.body.response_data,
        err => {
          throw err;
        }
      );

  onTelematicsCommandIncoming = (ser, id, dt) => ({
    incomingCommandSerial: uint8ArrayToHex(new Uint8Array(ser)).toUpperCase(),
    incomingCommandId: uint8ArrayToHex(new Uint8Array(id)).toUpperCase(),
    incomingCommandData: new Uint8Array(dt),
  });

  sendCommand = async (serial, data) => {
    const nonce = await this.getNonce(serial);

    const result = await this.hmkit.crypto.sendTelematicsCommand(
      hexToUint8Array(serial).buffer,
      base64ToUint8(nonce).buffer,
      hexToUint8Array(data.toString()).buffer,
      this.onTelematicsSendData
    );

    const response = await this.hmkit.crypto.telematicsDataReceived(
      base64ToUint8(result).buffer,
      this.onTelematicsCommandIncoming
    );

    if (response && response.incomingCommandData) {
      return new Response(response.incomingCommandData);
    }

    throw new Error('Failed to read incoming data.');
  };
}
