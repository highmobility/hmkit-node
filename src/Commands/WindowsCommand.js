import Command from './Command';
import BaseCommand from './BaseCommand';
import { percentageToDouble } from '../encoding';

export default class WindowsCommand extends BaseCommand {
  /**
   * @function getState
   */
  static getState() {
    return new Command([0x00, 0x45, 0x00]);
  }

  /**
   * @function control
   *
   * @property {Array<Object>} windowsOpenPercentages Windows open percentages [{ windowLocation: (string: 'front_left|front_right|rear_right|rear_left|hatch'), openPercentage: (number) }]
   * @property {Array<Object>} windowsPositions Windows positions [{ windowLocation: (string: 'front_left|front_right|rear_right|rear_left|hatch'), windowPosition: (string: 'closed|opened|intermediate') }]
   *
   * @example control
    const response = await hmkit.telematics.sendCommand(
      vehicleSerial,
      hmkit.commands.WindowsCommand.control(
        [{
          windowLocation: 'front_right',
          openPercentage: 0.5,
        }, {
          windowLocation: 'rear_right',
          openPercentage: 0.5,
        }, {
          windowLocation: 'front_left',
          openPercentage: 0.5,
        }, {
          windowLocation: 'rear_left',
          openPercentage: 0.5,
        }, {
          windowLocation: 'hatch',
          openPercentage: 0.5,
        }],

        [{
          windowLocation: 'front_right',
          windowPosition: 'open',
        }, {
          windowLocation: 'rear_right',
          windowPosition: 'open',
        }, {
          windowLocation: 'front_left',
          windowPosition: 'close',
        }, {
          windowLocation: 'rear_left',
          windowPosition: 'close',
        }, {
          windowLocation: 'hatch',
          windowPosition: 'open',
        }]
      )
    );
   */
  static control(
    openPercentages: Array<Object>,
    windowPositions: Array<Object>
  ) {
    return new Command([
      0x00,
      0x45,
      0x12,
      ...this.getWindowOpenPercentageBytes(openPercentages),
      ...this.getWindowPositionBytes(windowPositions),
    ]);
  }

  static getWindowOpenPercentageBytes(openPercentages: Array<Object>) {
    if (!!openPercentages && Array.isArray(openPercentages)) {
      return [].concat(
        ...openPercentages.map(({ windowLocation, openPercentage }) =>
          this.buildProperty(0x01, [
            this.getWindowLocationByte(windowLocation),
            ...percentageToDouble(openPercentage),
          ])
        )
      );
    }

    return [];
  }

  static getWindowPositionBytes(windowPositions: Array<Object>) {
    if (!!windowPositions && Array.isArray(windowPositions)) {
      return [].concat(
        ...windowPositions.map(({ windowLocation, windowPosition }) =>
          this.buildProperty(0x02, [
            this.getWindowLocationByte(windowLocation),
            this.getWindowOpenCloseByte(windowPosition),
          ])
        )
      );
    }

    return [];
  }

  static getWindowLocationByte(position) {
    switch (position) {
      case 'front_right':
        return 0x01;
      case 'rear_right':
        return 0x02;
      case 'rear_left':
        return 0x03;
      case 'hatch':
        return 0x04;
      default:
        return 0x00;
    }
  }

  static getWindowOpenCloseByte(openClose) {
    switch (openClose) {
      case 'open':
        return 0x01;
      default:
        return 0x00;
    }
  }
}
