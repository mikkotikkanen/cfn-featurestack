const cfnDeploy = require('cfn-deploy');

module.exports = (stackname = '', args) => new Promise((resolve, reject) => {
  const newArgs = args;
  newArgs.stackname = stackname;

  // Make sure parameters is an array and add IsFeatureStack paramter
  if (!Array.isArray(newArgs.parameters)) {
    newArgs.parameters = [newArgs.parameters];
  }
  newArgs.parameters = newArgs.parameters.concat([{ IsFeatureStack: 'true' }]);

  // Make sure tags is an array and add featurestack tag
  newArgs.tags = newArgs.tags || [];
  if (!Array.isArray(newArgs.tags)) {
    newArgs.tags = [newArgs.tags];
  }
  newArgs.tags = newArgs.tags.concat([{ featurestack: 'true' }]);


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
