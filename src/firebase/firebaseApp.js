import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import inDevEnvironment from './inDevEnvironment';

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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

if (inDevEnvironment()) {
  connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export {
  app, auth, db, storage,
};
