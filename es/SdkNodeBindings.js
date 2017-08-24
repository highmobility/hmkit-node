import fs from 'fs';
import path from 'path';

export default function getSdkNodeBindings() {
  if (fs.existsSync(path.resolve(__dirname, '..', 'sdk-node-bindings', 'lib', 'binding.js'))) {
    return require('../sdk-node-bindings/lib/binding.js');
  } else if (process.platform === 'darwin') {
    return require('../bindings/macos');
  } else if (process.platform === 'linux') {
    return require('../bindings/ubuntu');
  }

  throw new Error('Native "hmkit" addon missing for your platform.');
};