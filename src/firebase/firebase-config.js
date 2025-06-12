import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa4WnjpMmuPYnjzlnSN5-HNE-UuI6tAeY",
  authDomain: "raj-verma01-dfa27.firebaseapp.com",
  projectId: "raj-verma01-dfa27",
  appId: "1:874825268717:web:082bcbd10cabc7773d7be4",
  storageBucket: "raj-verma01-dfa27.appspot.com",  // also fixed typo here
  messagingSenderId: "874825268717",
  measurementId: "G-SB9L6WC046"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export {app}; 
export const auth = getAuth(app); 

