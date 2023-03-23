import { ref, uploadBytes, getBlob } from 'firebase/storage';
import {
  collection, addDoc, query, getDocs,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { auth, db, storage } from './firebaseApp.js';

async function fetchVideo(id: string): Promise<Blob> {
  const pathReference = ref(storage, `videos/${id}`);
  const videoBlob: Blob = await getBlob(pathReference);
  return videoBlob;
}

async function fetchVideoLikeStatus(id: number): Promise<boolean> {
  return false;
}

async function setLikeStatus(id: number, liked: boolean): Promise<void> {
  console.log('liked');
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

async function getAllVideoIds(): Promise<string[]> {
  const ids: string[] = [];
  const querySnapshot = await getDocs(query(collection(db, 'videos')));
  querySnapshot.forEach((doc) => ids.push(doc.data().videoId));
  return ids;
}

export {
  fetchVideo, fetchVideoLikeStatus, setLikeStatus, uploadVideo,
};
