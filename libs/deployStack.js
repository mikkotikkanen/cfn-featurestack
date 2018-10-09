const cfnDeploy = require('cfn-deploy');


module.exports = (branchname, template, parameters = []) => new Promise((resolve, reject) => {
  const eventStream = cfnDeploy({
    stackName: branchname,
    template,
    parameters: parameters.push({ FeatureStack: true }),
  });

  eventStream.on('EXECUTING_CHANGESET', () => {
    console.log('Deploying the featurestack...');
  });
  eventStream.on('COMPLETE', () => {
    console.log('Featurestack complete.');
    resolve();
  });
  eventStream.on('ERROR', (err) => {
    console.log('Deploy error.', err.message);
    reject(new Error(err.message));
  });
});
