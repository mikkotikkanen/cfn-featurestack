const simpleGit = require('simple-git')('.');

module.exports = () => new Promise((resolve, reject) => {
  simpleGit
    .silent(true)
    .status((err, status) => {
      if (err) {
        return reject(err);
      }

      // No feature branch from master
      if (status.current === 'master') {
        return reject(new Error('Cannot create featurestack from the branch "master".'));
      }

      return resolve(status.current);
    });
});
