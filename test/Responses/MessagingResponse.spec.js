import Response from '../../src/Responses/Response';
import MessagingResponse from '../../src/Responses/MessagingResponse';
import { hexToUint8Array } from '../../src/encoding';

describe(`MessageResponse`, () => {
  it(`should return MessageResponse`, () => {
    const response = new Response(hexToUint8Array('0037010e2b31203535352d3535352d353535000d48656c6c6f20796f7520746f6f'));

    expect(response.parse()).toBeInstanceOf(MessagingResponse);
  });

         it(`should contain correct text`, () => {
            const response = new Response(hexToUint8Array('0037010e2b31203535352d3535352d353535000d48656c6c6f20796f7520746f6f'));

            expect(response.parse()).toEqual({
                                               handle: '+1 555-555-555',
                                               text: 'Hello you too'
                                               });
            });
});
