/*
 *  The MIT License
 *
 *  Copyright (c) 2014- High-Mobility GmbH (https://high-mobility.com)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 *
 *  MultiCommand.spec.js
 *
 *  Created by Mikk Õun on 20/01/2020.
 */

import getHmkit, { accessToken } from '../testutils/getHmkit';
import ResponseClass from '../../src/Configuration/ResponseClass';
import describeIf from '../testutils/describeIf';

const hmkit = getHmkit();

describeIf(process.env.TEST_ONLINE, `MultiCommand`, () => {
  it(`should send multi command`, async () => {
    const accessCertificate = await hmkit.downloadAccessCertificate(
      accessToken
    );

    const response = await hmkit.telematics.sendCommand(
      hmkit.commands.MultiCommand.multiCommand({
        multiCommands: {
          ignition: {
            turnIgnitionOnOff: { state: 'on' },
          },
          doors: {
            lockUnlockDoors: { locksState: 'unlocked' },
          },
        },
      }),
      accessCertificate
    );

    expect(response.parse()).toBeInstanceOf(ResponseClass.MultiCommand);

    expect(response.parse()).toMatchObject({
      multiStates: [
        {
          data: {
            doors: {
              brand: {
                data: {
                  value: 'emulator',
                },
              },
              vin: {
                data: {
                  value: expect.any(String),
                },
              },
              insideLocks: expect.any(Array),
              locks: [
                {
                  timestamp: expect.any(Date),
                  data: {
                    location: {
                      value: 'front_left',
                    },
                    lockState: {
                      value: 'unlocked',
                    },
                  },
                },
                {
                  timestamp: expect.any(Date),
                  data: {
                    location: {
                      value: 'front_right',
                    },
                    lockState: {
                      value: 'unlocked',
                    },
                  },
                },
                {
                  timestamp: expect.any(Date),
                  data: {
                    location: {
                      value: 'rear_right',
                    },
                    lockState: {
                      value: 'unlocked',
                    },
                  },
                },
                {
                  timestamp: expect.any(Date),
                  data: {
                    location: {
                      value: 'rear_left',
                    },
                    lockState: {
                      value: 'unlocked',
                    },
                  },
                },
              ],
              positions: expect.any(Array),
              insideLocksState: expect.any(Object),
              locksState: {
                timestamp: expect.any(Date),
                data: {
                  value: 'unlocked',
                },
              },
            },
          },
        },
        {
          data: {
            ignition: {
              brand: {
                data: {
                  value: 'emulator',
                },
              },
              vin: {
                data: {
                  value: expect.any(String),
                },
              },
              state: expect.any(Object),
            },
          },
        },
      ],
    });
  });
});
