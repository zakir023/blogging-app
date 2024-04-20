// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyDz7rbLMiHav2dg8vI4zah0JNg4N9dJHgU",
      authDomain: "blogging-app-b8332.firebaseapp.com",
      projectId: "blogging-app-b8332",
      storageBucket: "blogging-app-b8332.appspot.com",
      messagingSenderId: "749247857995",
      appId: "1:749247857995:web:b190047a06779f7f28d4ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);