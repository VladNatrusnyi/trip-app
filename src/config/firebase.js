import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFO3mU4cO4_AupgwS4yqaV04cKnIMz-t8",
  authDomain: "trip-app-f284b.firebaseapp.com",
  projectId: "trip-app-f284b",
  storageBucket: "trip-app-f284b.appspot.com",
  messagingSenderId: "400374335497",
  appId: "1:400374335497:web:babec473e1c7ebf43490d8"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
