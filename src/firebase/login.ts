import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebaseApp.js';

async function createUserDBEntry(userId: string, mail: string): Promise<void> {
  const userDoc = doc(db, 'users', userId);
  const userSnap = await getDoc(userDoc);

  if (!userSnap.exists()) {
    await setDoc(userDoc, { profilePicture: 'undefined', username: userId, mail });
  }
}

async function registerWithMail(mail: string, password: string): Promise<void> {
  const response = await createUserWithEmailAndPassword(auth, mail, password);
  await createUserDBEntry(response.user.uid, mail);
}
async function loginWithMail(mail: string, password: string) {
  await signInWithEmailAndPassword(auth, mail, password);
}

export {
  registerWithMail, loginWithMail,
};
