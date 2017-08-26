import ApiClient from './ApiClient';
import Response from './Responses/Response';
const client = new ApiClient();
import {
  base64ToUint8,
  byteArrayToBase64,
  uint8ArrayToHex,
  hexToUint8Array,
} from './encoding';
import AccessCertificate from './AccessCertificate';

export default class Telematics {
  constructor(hmkit) {
    this.hmkit = hmkit;
  }

  downloadAccessCertificate = async accessToken => {
    const byteSignature = this.hmkit.crypto.generateSignature(
      new Uint8Array(Buffer.from(accessToken)).buffer
    );
    const signature = byteArrayToBase64(byteSignature);

    const {
      body: { device_access_certificate: rawAccessCertificate },
    } = await client.post(`${this.hmkit.api.getUrl()}access_certificates`, {
      body: JSON.stringify({
        serial_number: this.hmkit.deviceCertificate.getSerial(),
        access_token: accessToken,
        signature,
      }),
    });

    const accessCertificate = new AccessCertificate(
      base64ToUint8(rawAccessCertificate)
    );

    this.hmkit.storage.add(
      'access_certificates',
      accessCertificate.getVehicleSerial(),
      rawAccessCertificate
    );

    return accessCertificate;
  };

  getNonce = async () => {
    const result = await client.post(`${this.hmkit.api.getUrl()}nonces`, {
      body: JSON.stringify({
        serial_number: this.hmkit.deviceCertificate.getSerial(),
      }),
    });

    return result.body.nonce;
  };

  onTelematicsSendData = async (issuer, serial, data) => {
    const payload = {
      serial_number: uint8ArrayToHex(new Uint8Array(serial)).toUpperCase(),
      issuer: uint8ArrayToHex(new Uint8Array(issuer)).toUpperCase(),
      data: byteArrayToBase64(data),
    };

    this.promise = client.post(
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
