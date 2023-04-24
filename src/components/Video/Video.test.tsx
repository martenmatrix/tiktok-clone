import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Video from './Video';
import {
  getVideoURL, hasLiked, setLikeStatus, getProfilePicture, getVideoAuthorUid,
} from '../../firebase/api';

jest.mock('../../firebase/api');
jest.spyOn(window.HTMLMediaElement.prototype, 'load').mockImplementation(() => {});

const playVideoMock = jest.fn();
const pauseVideoMock = jest.fn();

jest.spyOn(window.HTMLMediaElement.prototype, 'play').mockImplementation(playVideoMock);
jest.spyOn(window.HTMLMediaElement.prototype, 'pause').mockImplementation(pauseVideoMock);

const mockGetVideoURL = getVideoURL as jest.MockedFunction<typeof getVideoURL>;
const mockFetchVideoLikeStatus = hasLiked as jest.MockedFunction<typeof hasLiked>;
const mockSetLikeStatus = setLikeStatus as jest.MockedFunction<typeof setLikeStatus>;
const mockGetVideoAuthorUid = getVideoAuthorUid as jest.MockedFunction<typeof getVideoAuthorUid>;
const mockGetProfilePicture = getProfilePicture as jest.MockedFunction<typeof getProfilePicture>;

const mockInViewport = jest.fn().mockReturnValue(false);
jest.mock('../hooks/inViewport', () => {
  const originalModule = jest.requireActual('../hooks/inViewport');

  return {
    __esModule: true,
    ...originalModule,
    default: (...args: any[]) => mockInViewport(...args),
  };
});

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
  pauseVideoMock.mockClear();
  playVideoMock.mockClear();
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

test('setLikeStatus does NOT get called, if there is no interaction with the like button', () => {
  render(<Video id="6" />);

  expect(mockSetLikeStatus).toHaveBeenCalledTimes(0);
});

test('pauses video if not visible based on inViewport() hook', async () => {
  mockInViewport.mockImplementation(() => {}).mockReturnValue(false);
  render(<Video id="1" />);
  await waitFor(() => {
    expect(pauseVideoMock).toHaveBeenCalledTimes(1);
  });
});

test('plays video if visible based on inViewport() hook', async () => {
  mockInViewport.mockImplementation(() => {}).mockReturnValue(true);
  await waitFor(() => {
    expect(playVideoMock).toHaveBeenCalledTimes(1);
    expect(pauseVideoMock).toHaveBeenCalledTimes(0);
  });
});
