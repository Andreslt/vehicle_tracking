const chalk = require('chalk');
// Init
console.log(chalk.blue('1. Init ...'));
const fs = require('fs');
const argv = process.argv[2];
const seedData = ['routes.json', 'trails.json', 'vehicles.json'];
if(seedData.indexOf(argv) < 0) return console.log(chalk.red('Terminated. File not found.'));

// Reading File
console.log(chalk.yellow('2. Reading File ...'));
const data = JSON.parse(fs.readFileSync(argv, 'utf8'))

// Initializing Firebase
console.log(chalk.yellow('3. Initializing Firebase ...'));
const firebase = require('../firebase-server');
const collection = (argv.toString()).slice(0,-5);
firebase.addCollection(collection, data);

console.log(chalk.green('4. Finished!'));
// process.exit()