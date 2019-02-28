const deployStack = require('./libs/deployStack');
const getProjectname = require('./libs/getProjectname');
const getBranchname = require('./libs/git/getBranchname');

module.exports = (args) => {
  let projectname = '';
  let branchname = '';

  new Promise(resolve => resolve())

    // Resolve project name
    .then(getProjectname)
    .then((newProjectname) => { projectname = newProjectname; })

    // Resolve branch name
    .then(() => getBranchname())
    .then((newBranchname) => { branchname = newBranchname; })

    // Deploy feature stack
    .then(() => deployStack(`${projectname}-${branchname}`, args))
    .catch(err => console.error('Error:', err.message));
};
