const path = require('path');
const simpleGit = require('simple-git/promise')('.');

module.exports = (resolvedName = '') => new Promise((resolve, reject) => {
  // If we already have resolved the name, pass it onwards
  if (resolvedName) {
    return resolve(resolvedName);
  }

  return simpleGit
    .silent(true)
    .getRemotes(true)
    .then((remotes) => {
      // Find origin remote
      const origin = remotes.find(item => item.name === 'origin');

      // If we have origin remote, get basename of the fetch git url
      if (origin) {
        const basename = path.basename(origin.refs.fetch, '.git');
        resolve(basename);
      } else {
        // If we have nothing, resolve empty and let others try
        resolve();
      }
    })
    .catch(err => reject(err));
});
