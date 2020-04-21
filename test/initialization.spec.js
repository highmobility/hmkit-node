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
 *  initialization.spec.js
 *
 *  Created by Mikk Õun on 08/08/2018.
 */

import getHmkit from './testutils/getHmkit';
import HMKit from '../src/HMKit';

describe(`SDK initialization`, () => {
  it(`should initialize`, () => {
    const hmkit = getHmkit();
    expect(hmkit).toBeInstanceOf(HMKit);
  });

  it(`should fail initialization on invalid clientPrivateKey`, () => {
    expect(
      () =>
        new HMKit(
          `dGVzdPgHaDBRAF4h4d9JHcQ1eVzCyk/SLBOHolRd4EmW7eHCKdSF3caxbvERbWg2qYAlYB2vhNjat1sGsR5C+4H0c1/yveGvs6B3YRTBf2v5IBG7y27G6vzh9z/grTD2VZA75LZ6elUHXhDh+mZC26AYm+aCP95KCc3M/VdN11TTDJKuENtsRDHKqpH0fUgl4pgVuVaaJHRs`,
          `5Pcl+Pa0CDThT9gmLv0HmCJDVvE1SXrjzcbpxeUU=`
        )
    ).toThrow();
  });
});
