/**
 * Creates an environment for development,
 * so that the application can be used without
 * manipulating the real database.
 */
// eslint-disable-next-line max-len
// TODO: Do these imports cost performance or does the bundler recognize that it can ignore those imports in production?
import sample1 from './assets/sample1.base64.js';
import sample2 from './assets/sample2.base64.js';
import sample3 from './assets/sample3.base64.js';
import profilePic from './assets/profilePic.base64.js';
import { loginWithMail, registerWithMail } from './login';
import { uploadVideo, setProfilePicture } from './api';

async function createFakeUsers(): Promise<void> {
  try {
    // await registerWithMail('parker@example.org', 'totallysafe');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(`Unable to create accounts. Already created? ${e}`);
    // await loginWithMail('parker@example.org', 'totallysafe');
  }
}

async function uploadSampleVideos(): Promise<void> {
  const sample1Res = await fetch(sample1);
  const sample1Blob = await sample1Res.blob();

  const sample2Res = await fetch(sample2);
  const sample2Blob = await sample2Res.blob();

  const sample3Res = await fetch(sample3);
  const sample3Blob = await sample3Res.blob();

  const videoBlob1 = new Blob([sample1Blob], { type: 'video/mp4' });
  const videoBlob2 = new Blob([sample2Blob], { type: 'video/mp4' });
  const videoBlob3 = new Blob([sample3Blob], { type: 'video/mp4' });

  await uploadVideo(videoBlob1);
  await uploadVideo(videoBlob2);
  await uploadVideo(videoBlob3);
}

async function uploadProfilePicture(): Promise<void> {
  const profilePicRes = await fetch(profilePic);
  const profilePicBlob = await profilePicRes.blob();
  await setProfilePicture(profilePicBlob);
}

async function createDevEnvironment(): Promise<void> {
  await createFakeUsers();
  await uploadSampleVideos();
  await uploadProfilePicture();
}

export default createDevEnvironment;
