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

  onTelematicsSendData = (issuer, serial, data) => {
    const payload = {
      serial_number: uint8ArrayToHex(new Uint8Array(serial)).toUpperCase(),
      issuer: uint8ArrayToHex(new Uint8Array(issuer)).toUpperCase(),
      data: byteArrayToBase64(data),
    };

    this.promise = this.hmkit.apiClient.post(
      `${this.hmkit.api.getUrl()}telematics_commands`,
      {
        body: JSON.stringify(payload),
      }
    );
  };

  onTelematicsCommandIncoming = (serial, id, data) => {
    this.response = {
      incomingCommandSerial: uint8ArrayToHex(
        new Uint8Array(serial)
      ).toUpperCase(),
      incomingCommandId: uint8ArrayToHex(new Uint8Array(id)).toUpperCase(),
      incomingCommandData: new Uint8Array(data),
    };
  };

  sendCommand = async (serial, data) => {
    const nonce = await this.getNonce(serial);

    this.hmkit.crypto.sendTelematicsCommand(
      hexToUint8Array(serial).buffer,
      base64ToUint8(nonce).buffer,
      hexToUint8Array(data.toString()).buffer
    );

    if (!this.promise) {
      throw new Error('Failed to send telematics command.');
    }

    const result = await this.promise.then(
      res => res.body.response_data,
      err => {
        this.promise = null;
        throw new Error(err.json.message);
      }
    );

    this.promise = null;

    this.hmkit.crypto.telematicsDataReceived(base64ToUint8(result).buffer);

    if (this.response && this.response.incomingCommandData) {
      return new Response(this.response.incomingCommandData);
    }

    throw new Error('Failed to read incoming data.');
  };
}
