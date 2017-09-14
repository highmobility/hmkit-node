import HMKit from '../../src';

const defaultClientCertificate = 'dGVzdEqFnlrGfjCXqCkTwfqzK3ZNj/lhWk0caxnRv8Qt+G6Na+KH6jConA6RufYqNxm+WqehbBcjFSjJIlMBLG11hlRbv2fKE/p+sLzgn8Q3/y3fFvpIGpSHa7cRnnL+t3oLLU+sJfWRqYkwYNty/EqkJ8AEwmH++fW13grveSc5bhtLIAd+biDFKnl3txM4aSneu/jPc/nc';
const defaultClientPrivateKey = 'wTd1J5SfHMLu2ta0zkRFm6rPCFhoKp/ZAzeLNsZ85OU=';

export default function hmkit(
  clientCertificate = defaultClientCertificate,
  clientPrivateKey = defaultClientPrivateKey
) {
  return new HMKit(clientCertificate, clientPrivateKey).staging();
}

export const vehicleSerial = '6940F8C15002CF62E904E085';
export const accessToken = 'dVZ_ILse2ZnvR1Yov-bwmjEadxDFY4WKwLDcYXRW43zN94JIRF930RSHH33wDix-7tsEzK4oGtrkVkU2z0vrtdxGn3P3tHOGTeWNrnvoCer_QgRE1AAJJN96UQHJyuAN2Q';
