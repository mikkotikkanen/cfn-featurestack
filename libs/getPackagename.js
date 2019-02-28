const fs = require('fs');

module.exports = (resolvedName = '') => new Promise(async (resolve) => {
  // If we already have resolved the name, pass it onwards
  if (resolvedName) {
    return resolve(resolvedName);
  }

  // Resolve project name
  let projectname = '';
  if (fs.existsSync('./package.json')) {
    const stringPackageJson = fs.readFileSync('./package.json', { encoding: 'utf8' });
    try {
      const packageJson = JSON.parse(stringPackageJson);
      projectname = packageJson.name;
    } catch (err) {
      throw err;
    }
  }

  return resolve(projectname);
});
