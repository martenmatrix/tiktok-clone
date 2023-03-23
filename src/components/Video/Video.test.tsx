import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Video from './Video';
import { getVideoURL, fetchVideoLikeStatus, setLikeStatus } from '../../firebase/api';

jest.mock('../../firebase/api');
const mockGetVideoURL = getVideoURL as jest.MockedFunction<typeof getVideoURL>;
// eslint-disable-next-line max-len
const mockFetchVideoLikeStatus = fetchVideoLikeStatus as jest.MockedFunction<typeof fetchVideoLikeStatus>;
const mockSetLikeStatus = setLikeStatus as jest.MockedFunction<typeof setLikeStatus>;

beforeEach(() => {
  mockGetVideoURL.mockResolvedValue('https://example.com/video.mp4');
  mockFetchVideoLikeStatus.mockResolvedValue(true);
});

afterEach(() => {
  mockGetVideoURL.mockClear();
  mockFetchVideoLikeStatus.mockClear();
  mockSetLikeStatus.mockClear();
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
