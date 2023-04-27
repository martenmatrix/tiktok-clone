import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Video from './Video';
import {
  getVideoURL, hasLiked, setLikeStatus, getProfilePicture, getVideoAuthorUid,
} from '../../firebase/api';
import inViewport from '../hooks/inViewport';

jest.mock('../../firebase/api');
jest.mock('../hooks/inViewport');
jest.spyOn(window.HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
jest.spyOn(window.HTMLMediaElement.prototype, 'play');
jest.spyOn(window.HTMLMediaElement.prototype, 'pause');

const mockGetVideoURL = getVideoURL as jest.MockedFunction<typeof getVideoURL>;
const mockFetchVideoLikeStatus = hasLiked as jest.MockedFunction<typeof hasLiked>;
const mockSetLikeStatus = setLikeStatus as jest.MockedFunction<typeof setLikeStatus>;
const mockGetVideoAuthorUid = getVideoAuthorUid as jest.MockedFunction<typeof getVideoAuthorUid>;
const mockGetProfilePicture = getProfilePicture as jest.MockedFunction<typeof getProfilePicture>;
const mockInViewport = inViewport as jest.MockedFunction<typeof inViewport>;

beforeEach(() => {
  mockGetVideoURL.mockResolvedValue('https://example.com/video.mp4');
  mockFetchVideoLikeStatus.mockResolvedValue(true);
  mockGetVideoAuthorUid.mockResolvedValue('anid');
  mockGetProfilePicture.mockResolvedValue('https://www.example.org');
});

afterEach(() => {
  mockGetVideoURL.mockClear();
  mockFetchVideoLikeStatus.mockClear();
  mockSetLikeStatus.mockClear();
  mockGetVideoAuthorUid.mockClear();
  mockGetProfilePicture.mockClear();
});

test('if video is liked likeStatus is set correctly and setLikeStatus is called correctly', async () => {
  render(<Video id="5" />);
  const user = userEvent.setup();
  const likeButton = screen.getByRole('button', { name: 'Like' });

  // mocked function in line 16 updates like state to true
  await waitFor(() => expect(likeButton).toHaveAttribute('aria-pressed', 'true'));

  await act(async () => {
    await user.click(likeButton);
  });

  expect(likeButton).toHaveAttribute('aria-pressed', 'false');
  expect(mockSetLikeStatus).toHaveBeenCalledWith('5', false);
});

test('calls fetchVideo with correct id and sets response as video src', async () => {
  render(<Video id="2" />);
  const video = screen.getByTestId('source-element');

  expect(mockGetVideoURL).toHaveBeenCalledWith('2');
  await waitFor(() => expect(video).toHaveAttribute('src', 'https://example.com/video.mp4'));
});

test('calls fetchLikeStatus with correct and id and sets response as like status', async () => {
  render(<Video id="1" />);
  const likeButton = screen.getByRole('button', { name: 'Like' });

  expect(mockFetchVideoLikeStatus).toHaveBeenCalledWith('1');
  await waitFor(() => expect(likeButton).toHaveAttribute('aria-pressed', 'true'));
});

test('calls getProfilePicture with correct id and sets response as src on image', async () => {
  render(<Video id="8" />);

  const profilePictureElement = screen.getByAltText('Profile picture');

  expect(getVideoAuthorUid).toHaveBeenCalledWith('8');
  await waitFor(() => {
    expect(getProfilePicture).toHaveBeenCalledWith('anid');
    expect(profilePictureElement).toHaveAttribute('src', 'https://www.example.org');
  });
});

// TODO tests below throw an act error, i cannot figure out why
test('pauses video if not visible based on inViewport() hook', async () => {
  mockInViewport.mockReturnValue(false);
  const videoPauseStub = jest.spyOn(window.HTMLMediaElement.prototype, 'pause');
  render(<Video id="1" />);
  await waitFor(() => {
    expect(videoPauseStub).toHaveBeenCalledTimes(1);
  });
});

test('plays video if visible based on inViewport() hook', async () => {
  mockInViewport.mockReturnValue(true);
  const videoPlayStub = jest.spyOn(window.HTMLMediaElement.prototype, 'play');
  render(<Video id="1" />);
  await waitFor(() => {
    expect(videoPlayStub).toHaveBeenCalledTimes(1);
  });
});

// muted needs to be passed as a dataset to the element because of following react issue https://github.com/facebook/react/issues/10389
test('clicking the mute button initially unmutes the video and clicking it again mutes the video', async () => {
  render(<Video id="1" />);
  const user = userEvent.setup();
  const muteButton = screen.getByRole('button', { name: 'Mute video' });
  const video = screen.getByTestId('video-element');

  expect(video).toHaveAttribute('data-muted', 'true');
  await act(async () => {
    await user.click(muteButton);
  });
  expect(video).toHaveAttribute('data-muted', 'false');
});

test.todo('video tries to autoplay unmuted, if not allow, tries to autoplay muted');
