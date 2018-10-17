#!/usr/bin/env node
const yargs = require('yargs');
const updateNotifier = require('update-notifier');
const pckg = require('../package.json');
const index = require('../index');


yargs
  .version(false) // Set custom version option to avoid "[boolean]" flag
  .option('version', {
    describe: 'Show version number',
  })
  .help(false) // Set custom help option to avoid "[boolean]" flag
  .option('help', {
    describe: 'Show help',
  });

const args = {
  parameters: yargs.argv.parameters,
};


// Show help and version
if (yargs.argv.help) {
  yargs.showHelp('log');
  process.exit();
}
if (yargs.argv.version) {
  console.log(pckg.version);
  process.exit();
}


// Set update notifier
updateNotifier({
  pkg: pckg,
  updateCheckInterval: 0,
  // isGlobal: isInstalledGlobally,
}).notify();


// Call the library with cli arguments
index(args);
