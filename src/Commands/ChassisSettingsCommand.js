import Command from './Command';

export default class ChassisSettingsCommand {

    static getChassisSettings() {
        return new Command([0x00, 0x53, 0x00]);
    }


    static setDrivingMode(drivingMode: string) {
        const drivingModeOptions = {
            regular: 0x00,
            eco: 0x01,
            sport: 0x02,
            sport_plus: 0x03
        };

        return new Command([0x00, 0x53, 0x02, drivingModeOptions[drivingMode]]);
    }


    static startSportChrono() {
        return new Command([0x00, 0x53, 0x03, 0x00]);
    }

    static stopSportChrono() {
        return new Command([0x00, 0x53, 0x03, 0x01]);
    }

    static resetSportChrono() {
        return new Command([0x00, 0x53, 0x03, 0x02]);
    }


    static setFrontAxleSpringRate(rate: number) {
        return new Command([0x00, 0x53, 0x04, 0x00, rate]);
    }

    static setRearAxleSpringRate(rate: number) {
        return new Command([0x00, 0x53, 0x04, 0x01, rate]);
    }


    static setChassisPosition(position: number) {
        return new Command([0x00, 0x53, 0x05, position]);
    }
}
