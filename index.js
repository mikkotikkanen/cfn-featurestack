const deployStack = require('./libs/deployStack');
const getProjectname = require('./libs/getProjectname');
const getBranchname = require('./libs/git/getBranchname');

module.exports = async (args) => {
  try {
    // Resolve project & branch name
    const projectname = await getProjectname();
    const branchname = await getBranchname();

    // Deploy feature stack
    deployStack(`${projectname}-${branchname}`, args);
  } catch (err) {
    console.error('Error:', err.message);
  }
};
