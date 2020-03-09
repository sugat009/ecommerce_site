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

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // If no userAuth object passed i.e. not logged in then return
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    // Checks if user already exists or not
    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            // Asynchronously creating user in the database
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (e) {
            console.log("Error creating user");
            console.log(e)
        }
    }
    return userRef;
};

// Initializing the firebase module
firebase.initializeApp(config);

// Firebase authentication module
export const auth = firebase.auth();
// Firebase database access module
export const firestore = firebase.firestore();

// For google authentication
const provider = new firebase.auth.GoogleAuthProvider();
// Options for signing in using google
provider.setCustomParameters({prompt: 'select_account'});
// New window pop up
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
