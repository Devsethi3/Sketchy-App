import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDOBk_VRdwm5w8aOcinfvbNVIKJjXZffQ",
  authDomain: "sketchy-415607.firebaseapp.com",
  projectId: "sketchy-415607",
  storageBucket: "sketchy-415607.appspot.com",
  messagingSenderId: "957945539842",
  appId: "1:957945539842:web:5f7d9009cbca954e10a61b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
