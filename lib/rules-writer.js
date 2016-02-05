'use strict';
const fs = require('fs');
const finalDirectory = 'website/rules';

module.exports = function rulesWriter(rules) {
  rules.forEach(
    rule => fs.writeFileSync(
      `${finalDirectory}/${rule.name}.json`,
      JSON.stringify(rule, null, 2),
      'utf8'
    )
  );

  const requires = rules.map(rule => `require('./${rule.name}.json')`);
  const indexFileContent = `module.exports = [
  ${requires.join(',\n  ')}
];
`;
  fs.writeFileSync(`${finalDirectory}/index.js`, indexFileContent, 'utf8');
};
