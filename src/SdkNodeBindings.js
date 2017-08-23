import fs from 'fs';

export default function getSdkNodeBindings() {
  if (fs.existsSync('../sdk-node-bindings/lib/binding.js')) {
    return require('../sdk-node-bindings/lib/binding.js');
  }

  if (process.platform === 'darwin') {
    return require('bindings/macos');
  }

  throw new Error('Native "hmkit" addon missing for your platform.');
};
