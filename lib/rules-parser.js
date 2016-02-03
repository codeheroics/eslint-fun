'use strict';

module.exports = function parseMd(mdFile) {
  const fileArray = mdFile.split('\n');

  let category = null;

  return fileArray.reduce((array, line) => {
    line = line.trim();
    if (!line) return array;

    if (line.startsWith('## ')) {
      category = line.substr(3);
      return array;
    }

    if (!line.startsWith('* ')) return array;
    const fullMatch = line.match(/\[(.+)\]\(.*\.md\) - (.+)/);
    if (!fullMatch) return array;

    const name = fullMatch[1];
    const fullDescription = fullMatch[2];

    const isRecommended = !!fullDescription.match('(recommended)');
    const isFixable = !!fullDescription.match('(fixable)');
    const replacement = (fullDescription.match(/replaced by \[(.+)\]\(.*\.md\)\)/i) || [])[1];
    const description = fullDescription.replace(' (recommended)', '').replace(' (fixable)', '').replace(/ \(replaced by (.+)\)/i, '');

    return array.concat(Object.assign(
      {},
      { name, description, isRecommended, isFixable, category },
      replacement ? { replacement } : {} )
    );
  }, []);
};
