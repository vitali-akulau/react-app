import * as firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");

const config = {
  apiKey: "AIzaSyAJlU4bXG3KhA7U3IZIBoRWlg7gWLV2Vhs",
  authDomain: "react-app-db-48fa5.firebaseapp.com",
  databaseURL: "https://react-app-db-48fa5.firebaseio.com",
  projectId: "react-app-db-48fa5",
  storageBucket: "react-app-db-48fa5.appspot.com",
  messagingSenderId: "973549392876",
  appId: "1:973549392876:web:52c897aff4a46fc178a6c9"
};

firebase.initializeApp(config);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: "select_account" })

export const signInWithGoogle = () => auth.signInWithPopup(provider)
export default firebase