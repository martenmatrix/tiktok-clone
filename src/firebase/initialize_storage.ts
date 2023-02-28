import { getStorage, connectStorageEmulator } from 'firebase/storage';
import app from './initialize.js';
import inDevEnvironment from './inDevEnvironment';

const storage = getStorage(app);
if (inDevEnvironment()) {
  connectStorageEmulator(storage, 'localhost', 9199);
}

export default storage;
