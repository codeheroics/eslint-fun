'use strict';
const fs = require('fs');

module.exports = function rulesWriter(rules) {
  rules.forEach(
    rule => fs.writeFileSync(`rules/${rule.name}.json`, JSON.stringify(rule, null, 2), 'utf8')
  );

  const requires = rules.map(rule => `require('./${rule.name}.json')`);
  const indexFileContent = `module.exports = [
  ${requires.join(',\n  ')}
];
`;
  fs.writeFileSync(`rules/index.js`, indexFileContent, 'utf8');
};
