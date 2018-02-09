import PropertyResponse from '../PropertyResponse';
import Property from '../Property';
import { bytesSum, switchDecoder, progressDecoder } from '../helpers';
import { ieee754ToBase10 } from '../encoding';


export default class ChassisSettingsResponse extends PropertyResponse {

    static identifier = [0x00, 0x53];


    constructor(data: Uint8Array) {
        super();

        const properties = [
            new Property(0x01, 'drivingMode').setDecoder(
                 switchDecoder({
                       0x00: 'regular',
                       0x01: 'eco',
                       0x02: 'sport',
                       0x03: 'sport_plus'
                   })
            ),

            new Property(0x02, 'sportChrono').setDecoder(this.activeInactiveDecoder()),

            new Property(0x03, 'springRate').setDecoder(this.springRateDecoder()),

            new Property(0x04, 'chassisPosition').setDecoder(this.chassisPositionDecoder())
        ];

        this.parse(data, properties);
    }


    activeInactiveDecoder() {
        return switchDecoder({
             0x00: 'inactive',
             0x01: 'active'
        });
    }

    chassisPositionDecoder(bytes: Array<Number>) {
        return {
            chassisPosition: bytes[0],
            maximum: bytes[1],
            minimum: bytes[2]
        };
    }

    springRateDecoder(bytes: Array<Number>) {
        const axleOptions = {
            0x00: 'front',
            0x01: 'rear'
        };

        return {
            axle: axleOptions[bytes[0]],
            springRate: bytes[1],
            maximum: bytes[2],
            minimum: bytes[3]
        };
    }
}
