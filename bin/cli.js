#!/usr/bin/env node
const yargs = require('yargs');
const updateNotifier = require('update-notifier');
const pckg = require('../package.json');
const index = require('../index');


yargs
  .version()
  .help();
  // .demandOption();

// Remove "[boolean]" texts from "help" and "version" options in help view
yargs.getOptions().boolean.splice(-2);


// Set update notifier
updateNotifier({
  pkg: pckg,
  updateCheckInterval: 0,
  // isGlobal: isInstalledGlobally,
}).notify();


// Call the library with cli arguments
const args = yargs.argv;
const events = index(args);
