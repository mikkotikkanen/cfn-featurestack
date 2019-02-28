const getPackagename = require('./getPackagename');
const getRemoteBasename = require('./git/getRemoteBasename');

module.exports = () => new Promise(async (resolve, reject) => {
  getPackagename()
    .then(getRemoteBasename)
    .then((projectname) => {
      if (projectname) {
        resolve(projectname);
      } else {
        throw new Error('Could not resolve project name.');
      }
    })
    .catch(reject);
});
