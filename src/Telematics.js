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

  getNonce = async () => {
    const result = await this.hmkit.apiClient.post(
      `${this.hmkit.api.getUrl()}nonces`,
      {
        body: JSON.stringify({
          serial_number: this.hmkit.deviceCertificate.getSerial(),
        }),
      }
    );

    return result.body.nonce;
  };

  onTelematicsSendData = async (issuer, serial, data) => {
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

  onTelematicsCommandIncoming = async (serial, id, data) => {
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

    const result = await this.promise;

    this.hmkit.crypto.telematicsDataReceived(
      base64ToUint8(result.body.response_data).buffer
    );

    return new Response(this.response.incomingCommandData);
  };
}
