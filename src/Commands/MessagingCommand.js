import Command from './Command';
import { intToTwoBytes, stringToBytes } from '../encoding';

export default class MessagingCommand {
  static messageReceived(handle: string, text: string) {
    const handleBytes = stringToBytes(handle);
    const textBytes = stringToBytes(text);

    return new Command([
      0x00,
      0x37,
      0x00,
      0x01,
      ...intToTwoBytes(handleBytes.length),
      ...handleBytes,
      0x02,
      ...intToTwoBytes(textBytes.length),
      ...textBytes,
    ]);
  }
}
