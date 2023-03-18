import { initializeApp } from 'firebase/app';
import inDevEnvironment from './inDevEnvironment';
import createDevEnvironment from './createDevEnvironment';

const firebaseConfig = {
  apiKey: 'AIzaSyA-2SqpVNiMlmVKplqZIswTpvgcGCF9rVY',
  authDomain: 'tiktok-clone-123456789.firebaseapp.com',
  databaseURL: 'https://tiktok-clone-123456789-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tiktok-clone-123456789',
  storageBucket: 'tiktok-clone-123456789.appspot.com',
  messagingSenderId: '342799042259',
  appId: '1:342799042259:web:6e16ad597fba9857e07626',
};

const app = initializeApp(firebaseConfig);
if (inDevEnvironment()) {
  createDevEnvironment();
}

export default app;
