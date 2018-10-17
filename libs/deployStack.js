const cfnDeploy = require('cfn-deploy');

module.exports = (stackname = '', args) => new Promise((resolve, reject) => {
  const newArgs = args;
  newArgs.stackname = stackname;

  // Add FeatureStack parameter
  newArgs.parameters = newArgs.parameters.concat([{ FeatureStack: true }]);

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
    console.log('Deploy error.', err.message);
    reject(new Error(err.message));
  });
});
