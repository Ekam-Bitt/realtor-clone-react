// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVl8YUWjsXisKfHVSYreiAsNFTl2gfe6Q",
  authDomain: "realtor-clone-ekam.firebaseapp.com",
  projectId: "realtor-clone-ekam",
  storageBucket: "realtor-clone-ekam.appspot.com",
  messagingSenderId: "463746875722",
  appId: "1:463746875722:web:3ab36a212d91d857f401b3",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
