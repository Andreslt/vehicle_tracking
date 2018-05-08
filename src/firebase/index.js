import firebase from 'firebase';

const dbURL = "https://ss-smtracking.firebaseio.com";

firebase.initializeApp({
  apiKey: "AIzaSyAeCClXw4WoCbQHlVyeLf78hQb_D0rn-PI",
  authDomain: "ss-smtracking.firebaseapp.com",
  databaseURL: dbURL,
});

export default firebase.database().ref();

const firebaseAuth = firebase.auth();
const auth = {
  signIn: (email, password) => firebaseAuth.signInWithEmailAndPassword(email, password),
};

function getUserProfile (userId) {
  const db = `${dbURL}/CONTROL/USERS`;
  return new Promise((resolve, reject) => {
    try {
      firebase.database().refFromURL(db).child(userId).on('value', snap => resolve(snap.val()));
    } catch (e) {
      reject(e);
    }
  });
}

export {
  auth,
  firebaseAuth,
  getUserProfile
};