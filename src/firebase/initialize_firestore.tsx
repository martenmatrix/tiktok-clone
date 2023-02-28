import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import inDevEnvironment from './inDevEnvironment';
import app from './initialize.js';

const db = getFirestore(app);
if (inDevEnvironment()) {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export default db;
