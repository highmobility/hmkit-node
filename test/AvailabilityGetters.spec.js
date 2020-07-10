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
 *  AvailabilityGetters.spec.js
 *
 *  Created by Matis Lepik on 10/07/2020.
 */

import getHmkit from './testutils/getHmkit';
import {
  AUTO_API_LEVEL,
  GET_AVAILABILITY_TYPE,
} from '../src/Utils/CommandUtils';
import capabilitiesConfiguration from '../src/Configuration/capabilities.json';

const hmkit = getHmkit();

describe('Availability getters', () => {
  // We are hard-coding a test for Charging until we get examples from the auto-api docs
  const capability = hmkit.commands.Charging;
  const { identifier } = capability;
  const capabilityConfiguration = getCapabilityConfiguration(identifier);

  it(`Should convert an availability getter command with no arguments into a corresponding Uint8Array`, () => {
    expect(capability.getAvailability().command).toEqual([
      AUTO_API_LEVEL,
      capabilityConfiguration.identifier.msb,
      capabilityConfiguration.identifier.lsb,
      GET_AVAILABILITY_TYPE,
    ]);
  });

  it(`Should convert an availability getter command with a single property into a corresponding Uint8Array`, () => {
    // Test with single properties
    capabilityConfiguration.properties.forEach(property => {
      expect(
        capability.getAvailability([property.name_cased]).command
      ).toEqual([
        AUTO_API_LEVEL,
        capabilityConfiguration.identifier.msb,
        capabilityConfiguration.identifier.lsb,
        GET_AVAILABILITY_TYPE,
        property.id,
      ]);
    });
  });

  it('Should convert an availability getter command with all properties into a corresponding Uint8Array', () => {
    expect(
      capability.getAvailability(
        capabilityConfiguration.properties.map(x => x.name_cased)
      ).command
    ).toEqual([
      AUTO_API_LEVEL,
      capabilityConfiguration.identifier.msb,
      capabilityConfiguration.identifier.lsb,
      GET_AVAILABILITY_TYPE,
      ...capabilityConfiguration.properties.map(x => x.id),
    ]);
  });
});

function getCapabilityConfiguration({ msb: msbToFind, lsb: lsbToFind }) {
  return Object.values(capabilitiesConfiguration).find(capabilityConf => {
    const { msb, lsb } = capabilityConf.identifier || {};
    return msb === msbToFind && lsb === lsbToFind;
  });
}
