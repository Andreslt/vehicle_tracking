const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

require('dotenv').load();

const dbURL = "https://ss-smtracking.firebaseio.com"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbURL
});

const dbRef = admin.database().refFromURL(dbURL);

exports.addCollection = (collection, data) => {
  const colRef = dbRef.child(collection);
  data.forEach(chunk => {
    return colRef.push().set(chunk);
  });
}

exports.query = async (route, limit, cb) => {
  let routeObject = {};
  admin.database().ref(route).limitToLast(limit).on('value', async (snapshot) => {
    routeObject[snapshot.val().id] = snapshot.val().mapProps;
    const historic = Object.keys(routeObject).length;
    if (historic >= limit) { // make sure that the historic amount of point is higher than requested limit
      return cb(routeObject);
    }
  });
}