import { hexArrayToHex } from 'src/encoding';

export default class Command {
  constructor(command) {
    this.command = command;
  }

  toString() {
    return hexArrayToHex(this.command);
  }
}
