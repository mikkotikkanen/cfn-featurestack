const cfnDeploy = require('cfn-deploy');

module.exports = (stackname = '', args) => new Promise((resolve, reject) => {
  const newArgs = args;
  newArgs.stackName = stackname;

  // Make sure parameters are an array
  if (!Array.isArray(newArgs.parameters)) {
    newArgs.parameters = [newArgs.parameters];
  }

  // Add FeatureStack parameter
  newArgs.parameters = newArgs.parameters.concat([{ IsFeatureStack: 'true' }]);

  // Run deploy
  const eventStream = cfnDeploy(newArgs);
  eventStream.on('EXECUTING_CHANGESET', () => {
    console.log('Deploying featurestack...');
  });
  eventStream.on('COMPLETE', () => {
    console.log('Featurestack complete.');
    resolve();
  });
  eventStream.on('ERROR', (err) => {
    reject(new Error(err));
  });
});
