/**
 * Creates an environment for development,
 * so that the application can be used without
 * manipulating the real database.
 */
import sample1 from './assets/sample1.base64.js';
import sample2 from './assets/sample2.base64.js';
import sample3 from './assets/sample3.base64.js';
import { loginWithMail, registerWithMail } from './login';
import { uploadVideo } from './api';

async function createFakeUsers(): Promise<void> {
  try {
    await registerWithMail('peter@example.org', 'einszweidreivier');
    await registerWithMail('parker@example.org', 'totallysafe');
  } catch (e) {
    await loginWithMail('parker@example.org', 'totallysafe');
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

async function createDevEnvironment(): Promise<void> {
  await createFakeUsers();
  await uploadSampleVideos();
}

export default createDevEnvironment;
