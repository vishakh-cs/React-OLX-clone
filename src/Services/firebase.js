// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage"; 



const {
    VITE_apiKey,
VITE_authDomain,
VITE_projectId,
VITE_storageBucket,
VITE_messagingSenderId,
VITE_appId ,
}=import.meta.env

const firebaseConfig = {
  apiKey: VITE_apiKey,
  authDomain:VITE_authDomain ,
  projectId: VITE_projectId,
  storageBucket: VITE_storageBucket,
  messagingSenderId: VITE_messagingSenderId,
  appId:VITE_appId
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth =getAuth(app)
export const db= getFirestore(app)
export const storage = getStorage(app);