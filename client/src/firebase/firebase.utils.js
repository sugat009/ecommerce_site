import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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
            });
        } catch (e) {
            console.log("Error creating user");
            console.log(e);
        }
    }
    return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        console.log(newDocRef);
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject)
    })
};

// Initializing the firebase module
firebase.initializeApp(config);

// Firebase authentication module
export const auth = firebase.auth();
// Firebase database access module
export const firestore = firebase.firestore();

// For google authentication
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// Options for signing in using google
googleProvider.setCustomParameters({prompt: "select_account"});
// New window pop up
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
