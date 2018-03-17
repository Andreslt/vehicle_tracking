const chalk = require('chalk');
// Init
console.log(chalk.blue('1. Init ...'));
const fs = require('fs');
const argv = process.argv[2];
const seedData = ['routes.json', 'trails.json', 'vehicles.json'];
if (seedData.indexOf(argv) < 0) return console.log(chalk.red('Terminated. File not found.'));

// Reading File
console.log(chalk.yellow('2. Reading File ...'));
const data = JSON.parse(fs.readFileSync(argv, 'utf8'))

// Initializing Firebase
console.log(chalk.yellow('3. Initializing Firebase ...'));
const firebase = require('../firebase-server');
const collection = (argv.toString()).slice(0, -5);

let i = 0;
function uploadAsync() {
    setTimeout(() => {
        const position = data[i];
        console.log('position-> ', position);
        firebase.addCollection(collection, data);
        i++;
        if (i < data.length) {
            uploadAsync();
        }
    }, 3000);
}

function uploadSync() {
    firebase.addCollection(collection, data);
}


uploadAsync();
// uploadSync()

console.log(chalk.green('4. Finished!'));
// process.exit()