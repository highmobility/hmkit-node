import Command from './Command';
import BaseCommand from './BaseCommand';

export default class MultiCommand extends BaseCommand {
  /**
   * @function send
   */
  static send(commands: Array<Command>) {
    return new Command([
      0x00,
      0x13,
      0x02,
      ...commands.reduce(
        (allBytes, { command }) =>
          allBytes.concat(...this.buildProperty(0x01, command)),
        []
      ),
    ]);
  }
}
