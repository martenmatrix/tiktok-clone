/**
 * Creates an environment for development,
 * so that the application can be used without
 * manipulating the real database.
 */
import sample1 from './assets/sample1.base64.txt';
import sample2 from './assets/sample2.mp4';
import sample3 from './assets/sample3.mp4';
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
  const videoBlob1 = new File([sample1], 'sample1');
  const videoBlob2 = new Blob([sample2], { type: 'video/mp4' });
  const videoBlob3 = new Blob([sample3], { type: 'video/mp4' });

  await uploadVideo(videoBlob1);
  await uploadVideo(videoBlob2);
  await uploadVideo(videoBlob3);
}

async function createDevEnvironment(): Promise<void> {
  await createFakeUsers();
  await uploadSampleVideos();
}

export default createDevEnvironment;
