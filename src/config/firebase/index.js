import firebase from 'firebase/app'
import 'firebase/storage'



// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyBQVy5e-6-ETMod2lZIVnrwTaAQnSisk7A",
  authDomain: "miniproject-sarah-blog.firebaseapp.com",
  projectId: "miniproject-sarah-blog",
  storageBucket: "miniproject-sarah-blog.appspot.com",
  messagingSenderId: "344837265064",
  appId: "1:344837265064:web:ab44e2161ec7b260aa549d",
  measurementId: "G-6MM5ZGB43W"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()



export default storage;