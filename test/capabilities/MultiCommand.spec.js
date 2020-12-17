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
        multiCommands: [
          hmkit.commands.RooftopControl.controlRooftop({
            dimming: 1,
            position: 0.5,
            convertibleRoofState: 'open',
            sunroofTiltState: 'half_tilted',
            sunroofState: 'open',
          }),
          hmkit.commands.Ignition.turnIgnitionOnOff({
            status: 'off',
          }),
        ],
      }),
      accessCertificate
    );

    expect(response.parse()).toBeInstanceOf(ResponseClass.MultiCommand);

    expect(response.parse()).toEqual({
      multiStates: [
        {
          value: {
            ignition: {
              status: {
                value: 'off',
                timestamp: expect.any(Date),
              },
              accessoriesStatus: {
                value: expect.any(String),
                timestamp: expect.any(Date),
              },
              state: {
                value: expect.any(String),
                timestamp: expect.any(Date),
              },
            },
          },
        },
        {
          value: {
            rooftopControl: {
              dimming: {
                value: 1,
                timestamp: expect.any(Date),
              },
              position: {
                value: 0.5,
                timestamp: expect.any(Date),
              },
              convertibleRoofState: {
                value: 'open',
                timestamp: expect.any(Date),
              },
              sunroofTiltState: {
                value: 'half_tilted',
                timestamp: expect.any(Date),
              },
              sunroofState: {
                value: 'open',
                timestamp: expect.any(Date),
              },
              sunroofRainEvent: {
                value: 'no_event',
                timestamp: expect.any(Date)
              }
            },
          },
        },
      ],
    });
  });
});
