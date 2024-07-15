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
 *  ResponseClass.js
 *
 *  Created by Mikk Õun on 16/01/2020.
 */

import capabilitiesConfiguration from '../Configuration/capabilities.json';
import { capitalize } from '../Utils/Helpers';
import EmptyResponse from '../Responses/EmptyResponse';

const ResponseClasses = Object.values(capabilitiesConfiguration).reduce(
  (responseClasses, capabilityConf) => {
    const capitalizedName = capitalize(capabilityConf.name_cased);
    const { identifier } = capabilityConf;

    if (capabilityConf.state === undefined) {
      return {
        ...responseClasses,
        [capitalizedName]: EmptyResponse,
      };
    }

    const customClass = class {};

    Object.defineProperty(customClass, 'name', {
      value: `${capitalizedName}Response`,
    });

    if (identifier) {
      Object.defineProperty(customClass, 'msb', {
        value: identifier.msb,
      });

      Object.defineProperty(customClass, 'lsb', {
        value: identifier.lsb,
      });
    }

    return {
      ...responseClasses,
      [capitalizedName]: customClass,
    };
  },
  {}
);

export default ResponseClasses;
