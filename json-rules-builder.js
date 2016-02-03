const downloadEsLintMd = require('./lib/download-eslint-md');
const rulesParser = require('./lib/rules-parser');
const rulesWriter = require('./lib/rules-writer');

downloadEsLintMd()
  .then(rulesParser)
  .then(rulesWriter)
  .catch(err => console.error(err));
