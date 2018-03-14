const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");

require('dotenv').load();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.databaseURL
});

const dbRef = admin.database().refFromURL(process.env.databaseURL);

exports.addCollection = (collection, object) => {
  const colRef = dbRef.child(collection);
  return colRef.push().set(object);
}

exports.query = async (route, limit, cb) => {
  let routeObject = {};
  admin.database().ref(route).limitToLast(limit).on('child_added', async (snapshot) => {
    routeObject[snapshot.val().id] = snapshot.val().mapProps;
    const historic = Object.keys(routeObject).length;
    if (historic >= limit) { // make sure that the historic amount of point is higher than requested limit
      return cb(routeObject);
    }
  });
}