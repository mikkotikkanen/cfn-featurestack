const fs = require('fs');
const path = require('path');
const gitStatus = require('./libs/gitStatus');
const deployStack = require('./libs/deployStack');

module.exports = (args) => {
  let branchname = '';

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
  } else {
    projectname = path.basename(process.cwd());
  }

  // Make sure we have everything
  if (!projectname) {
    throw new Error('Could not resolve project name');
  }

  const stackname = `${projectname}-${branchname}`;

  new Promise(resolve => resolve())
    .then(() => gitStatus())
    .then((newBranchname) => { branchname = newBranchname; })
    .then(() => deployStack(stackname, args))
    .catch(err => console.error('Error:', err.message));
};
