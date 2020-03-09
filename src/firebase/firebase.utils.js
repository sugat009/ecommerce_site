import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC2A9ERYPsbiLR1C-hHqw0JnzouuqYQoD8",
    authDomain: "ecommerce-db-ad249.firebaseapp.com",
    databaseURL: "https://ecommerce-db-ad249.firebaseio.com",
    projectId: "ecommerce-db-ad249",
    storageBucket: "ecommerce-db-ad249.appspot.com",
    messagingSenderId: "190626164372",
    appId: "1:190626164372:web:86a987ffd3fdfcd37d8e81",
    measurementId: "G-Z16T25EC8E"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;