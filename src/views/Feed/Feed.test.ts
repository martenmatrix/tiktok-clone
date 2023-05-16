import SampleVideo1 from './assets/sample1.mp4';
import SampleVideo2 from './assets/sample2.mp4';
import SampleVideo3 from './assets/sample3.mp4';

const sampleData: {id: number, src: string}[] = [
  {
    id: 1,
    src: SampleVideo1,
  },
  {
    id: 2,
    src: SampleVideo2,
  },
  {
    id: 3,
    src: SampleVideo3,
  },
];

test.todo('isLiked gets fetched for the current video running');
test.todo('three videos are displayed');
test.todo('Swiping up displays the second video in the array and clicking the like button fires with the corresponding id');
test.todo('swiping down displays the previous video');
test.todo('loginModal gets shown when user is not logged in and attempts to like');

export {};
