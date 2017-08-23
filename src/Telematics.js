import SdkNodeBindings from './../sdk-node-bindings/lib/binding.js';
import ApiClient from 'src/ApiClient';
import Response from 'src/Responses/Response';
const client = new ApiClient();
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

  downloadAccessCertificate(accessToken) {
    const byteSignature = SdkNodeBindings.generateSignature(
      new Uint8Array(Buffer.from(accessToken)).buffer
    );
    const signature = byteArrayToBase64(byteSignature);

    console.log({
      serial_number: this.hmkit.getDeviceSerial(),
      access_token: accessToken,
      signature,
    });
    return client.post(
      `${this.hmkit.apiUrl}access_certificates`,
      {
        body: JSON.stringify({
          serial_number: this.hmkit.getDeviceSerial(),
          access_token: accessToken,
          signature,
        }),
      }
    );
  }

  async getNonce() {
    const result = await client.post(
      `${this.hmkit.apiUrl}nonces`,
      {
        body: JSON.stringify({
          serial_number: this.hmkit.getDeviceSerial(),
        }),
      }
    );

    return result.body.nonce;
  }

  onTelematicsSendData = async (issuer, serial, data) => {
    const payload = {
      serial_number: uint8ArrayToHex(new Uint8Array(serial)).toUpperCase(),
      issuer: uint8ArrayToHex(new Uint8Array(issuer)).toUpperCase(),
      data: byteArrayToBase64(data),
    };

    this.promise = client.post(
      `${this.hmkit.apiUrl}telematics_commands`,
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

  async sendCommand(serial, data) {
    const nonce = await this.getNonce(serial);

    SdkNodeBindings.sendTelematicsCommand(
      hexToUint8Array(serial).buffer,
      base64ToUint8(nonce).buffer,
      hexToUint8Array(data.toString()).buffer
    );

    let result;
    try {
      result = await this.promise;
    } catch (e) {
      console.log('caught exception', e);
    }

    SdkNodeBindings.telematicsDataReceived(
      base64ToUint8(result.body.response_data).buffer
    );

    return new Response(this.response.incomingCommandData);
  }
}
