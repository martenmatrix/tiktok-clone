import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from './firebaseApp.js';

async function createUserDBEntry(userId: string): Promise<void> {
  const userCollection = collection(db, 'users', userId);
  await addDoc(userCollection, { profilePicture: 'undefined' });
}

async function registerWithMail(mail: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(auth, mail, password);
  if (auth.currentUser) await createUserDBEntry(auth.currentUser.uid);
}
async function loginWithMail(mail: string, password: string) {
  await signInWithEmailAndPassword(auth, mail, password);
}

export {
  registerWithMail, loginWithMail,
};
