import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAnonymously,
  connectAuthEmulator,
} from 'firebase/auth';
import inDevEnvironment from './inDevEnvironment';
import app from './firebaseApp.js';

console.log(app); // needed, otherwise app won't be initialized
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();
const auth = getAuth();
if (inDevEnvironment()) {
  connectAuthEmulator(auth, 'http://localhost:4000');
}
async function loginWithGoogle(): Promise<void> {
  await signInWithPopup(auth, providerGoogle);
}

async function loginWithGitHub(): Promise<void> {
  await signInWithPopup(auth, providerGithub);
}

async function registerWithMail(mail: string, password: string): Promise<void> {
  await createUserWithEmailAndPassword(auth, mail, password);
}
async function loginWithMail(mail: string, password: string) {
  await signInWithEmailAndPassword(auth, mail, password);
}

async function loginAnonymous() {
  await signInAnonymously(auth);
}

export {
  loginWithGoogle, loginWithGitHub, registerWithMail, loginWithMail, loginAnonymous,
};
