import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG3YyVmqO0f4KFLz6o7NviGeHiXBH0Z7I",
  authDomain: "twitter-clone-92779.firebaseapp.com",
  projectId: "twitter-clone-92779",
  storageBucket: "twitter-clone-92779.appspot.com",
  messagingSenderId: "878682673985",
  appId: "1:878682673985:web:e1d205c45d8a5b66e947c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
