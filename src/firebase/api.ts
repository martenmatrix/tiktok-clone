import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection, getDoc, addDoc, setDoc, deleteDoc, query, getDocs, doc,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { auth, db, storage } from './firebaseApp.js';

async function getVideoURL(id: string): Promise<string> {
  const pathReference = ref(storage, `videos/${id}`);
  return getDownloadURL(pathReference);
}

async function hasLiked(id: string): Promise<boolean> {
  if (auth.currentUser) {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    const likeDoc = doc(userDoc, id);
    const snapshot = await getDoc(likeDoc);
    return snapshot.exists();
  }
  return false;
}

async function setLikeStatus(id: string, liked: boolean): Promise<void> {
  if (!auth.currentUser) return;
  const userDoc = doc(db, 'users', auth.currentUser.uid);
  const likeCollectionRef = collection(userDoc, 'likes');
  const likeDoc = doc(likeCollectionRef, id);
  if (liked) {
    await setDoc(likeDoc, { likedAt: Date.now() });
  } else {
    await deleteDoc(likeDoc);
  }
}

async function uploadVideo(source: File | Blob): Promise<void> {
  if (!auth.currentUser) return;

  const videoId = uuid();
  const storageRef = ref(storage, `videos/${videoId}`);
  await uploadBytes(storageRef, source);

  await addDoc(collection(db, 'videos'), {
    author: auth.currentUser.uid,
    videoId,
  });
}

async function getProfilePicture(uid: string) {

}

async function setProfilePicture(uid: string, image: File | Blob) {
  if (!auth.currentUser) return;

  const pictureId = uuid();
  const storageRef = ref(storage, `profilePictures/${pictureId}`);
  await uploadBytes(storageRef, image);

  const userDoc = doc(db, 'users', uid);
  await setDoc(userDoc, { profilePicture: pictureId });
}

async function getAllVideoIds(): Promise<string[]> {
  const ids: string[] = [];
  const querySnapshot = await getDocs(query(collection(db, 'videos')));
  querySnapshot.forEach((document) => ids.push(document.data().videoId));
  return ids;
}

export {
  getVideoURL, hasLiked, setLikeStatus, setProfilePicture, uploadVideo, getAllVideoIds,
};
