// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtYikdvoGCuO82Ukam2jxZfq_-LoiUZE8",
  authDomain: "moviesite-31350.firebaseapp.com",
  projectId: "moviesite-31350",
  storageBucket: "moviesite-31350.appspot.com",
  messagingSenderId: "741379110237",
  appId: "1:741379110237:web:a9758fefa1c55a1a5c64b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewsRef = collection(db,"reviews");

export default app; 