'use strict';
const request = require('request');
const mdUrl = 'https://raw.githubusercontent.com/eslint/eslint/master/docs/rules/README.md';

module.exports = () => new Promise((resolve, reject) =>
  request(mdUrl, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      return resolve(body);
    }
    reject(err || new Error('Unhandled error'));
  })
);
