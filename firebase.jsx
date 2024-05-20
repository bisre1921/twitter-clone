// Import the functions you need from the SDKs you need

// import { initializeApp , getApp , getApps } from "firebase/app";
// import {getFireStore} from "firebase/firestore";
// import {getStorage} from "firebase/storage";

import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG3YyVmqO0f4KFLz6o7NviGeHiXBH0Z7I",
  authDomain: "twitter-clone-92779.firebaseapp.com",
  projectId: "twitter-clone-92779",
  storageBucket: "twitter-clone-92779.appspot.com",
  messagingSenderId: "878682673985",
  appId: "1:878682673985:web:e1d205c45d8a5b66e947c0"
};

// Initialize Firebase
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db= getFireStore();
// const storage = getStorage();
// export {app , db , storage};

// const app= initializeApp(firebaseConfig);
// export default app;
//export const db = getFirestore();


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };