import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebaseApp.js';

async function createUserDBEntry(userId: string): Promise<void> {
  const userDoc = doc(db, 'users', userId);
  await setDoc(userDoc, { profilePicture: 'undefined' });
}

async function registerWithMail(mail: string, password: string): Promise<void> {
  const response = await createUserWithEmailAndPassword(auth, mail, password);
  await createUserDBEntry(response.user.uid);
}
async function loginWithMail(mail: string, password: string) {
  await signInWithEmailAndPassword(auth, mail, password);
}

export {
  registerWithMail, loginWithMail,
};
