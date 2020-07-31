import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDK5WkJ7Y7kU3f611_ifqsorJfRrVS3d2M",
  authDomain: "crwn-db-98cb4.firebaseapp.com",
  databaseURL: "https://crwn-db-98cb4.firebaseio.com",
  projectId: "crwn-db-98cb4",
  storageBucket: "crwn-db-98cb4.appspot.com",
  messagingSenderId: "161352569456",
  appId: "1:161352569456:web:b5a84898d231741bf49ab5",
  measurementId: "G-HB10VVJQHG"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
