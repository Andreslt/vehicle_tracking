const chalk = require('chalk');
const firebase = require('../../../../firebase-server');
// Init
console.log(chalk.blue('Initializing...'));
const fs = require('fs');
const argv = process.argv[2];
const root = `OPERATIONS/ENTITIES/${process.argv[2]}/ZONES`;
// process.argv[2]: Company

fs.readdir(__dirname, (err, files) => {
  // STEP 1: Looping through folder files
  console.log(chalk.yellow('1. Looping through folder files...'));
  let found = false;
  files.forEach(file => {
    const filename = file.split('.')[0];
    const extension = file.split('.')[1];
    if (extension === 'json') {
        // STEP 2: Reading seek File
        console.log(chalk.yellow('2. Reading seek file ...'));
        const data = JSON.parse(fs.readFileSync(`${__dirname}/${file}`, 'utf8'));

        // STEP 3: Uploading to Firebase
        console.log(chalk.yellow('3. Uploading to Firebase ...'));
        const path = `${root}/${filename.toLowerCase()}`;
        firebase.addCollection(path, data);
        found = true
    }
  });
  if (!found) console.log(chalk.red('Terminated. Inconsistant entry'));
  else console.log(chalk.green('4. Finished with success!'));
})


/*
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
// process.exit() */