// const { EventEmitter } = require('events');
const gitStatus = require('./libs/gitStatus');
const deployStack = require('./libs/deployStack');


module.exports = (args) => {
  let branchname;

  new Promise(resolve => resolve())
    .then(() => gitStatus())
    .then((newBranchname) => { branchname = newBranchname; })
    .then(() => deployStack(branchname, args.stack, args.params))
    .catch(err => console.error('error:', err.message));
};
