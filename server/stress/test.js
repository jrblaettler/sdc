const http = require('k6/http');
const { check, sleep } = require('k6');

export const options = {
  stages: [
    { duration: '20s', target: 300 },
    { duration: '20s', target: 400 },
    { duration: '20s', target: 500 },
    { duration: '20s', target: 600 },
    { duration: '20s', target: 1000 },
    { duration: '10s', target: 1200 },
    { duration: '10s', target: 1400 },
    { duration: '30s', target: 700 },
    { duration: '45s', target: 200 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  let res = http.get('http://localhost:1337/api/products/1/styles');
  sleep(1);
  check(res, {
    'status was 200': r => r.status === 200,
  });
}
