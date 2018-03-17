import firebase from 'firebase';

firebase.initializeApp({
    apiKey: "AIzaSyAeCClXw4WoCbQHlVyeLf78hQb_D0rn-PI",
    authDomain: "ss-smtracking.firebaseapp.com",
    databaseURL: "https://ss-smtracking.firebaseio.com",
});

export default firebase.database().ref();