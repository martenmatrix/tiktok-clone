import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db, storage } from './firebaseApp.js';

async function fetchVideo(id: number): Promise<string> {
  return 'ERROR';
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

export {
  fetchVideo, fetchVideoLikeStatus, setLikeStatus, uploadVideo
};
