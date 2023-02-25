// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-2SqpVNiMlmVKplqZIswTpvgcGCF9rVY',
  authDomain: 'tiktok-clone-123456789.firebaseapp.com',
  databaseURL: 'https://tiktok-clone-123456789-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tiktok-clone-123456789',
  storageBucket: 'tiktok-clone-123456789.appspot.com',
  messagingSenderId: '342799042259',
  appId: '1:342799042259:web:6e16ad597fba9857e07626',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
