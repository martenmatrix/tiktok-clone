import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Video from './Video';
import { fetchVideo, fetchVideoLikeStatus, setLikeStatus } from '../../firebase/api';

jest.mock('../../firebase/api');
const mockFetchVideo = fetchVideo as jest.MockedFunction<typeof fetchVideo>;
// eslint-disable-next-line max-len
const mockFetchVideoLikeStatus = fetchVideoLikeStatus as jest.MockedFunction<typeof fetchVideoLikeStatus>;
const mockSetLikeStatus = setLikeStatus as jest.MockedFunction<typeof setLikeStatus>;

beforeEach(() => {
  mockFetchVideo.mockResolvedValue('https://example.com/video.mp4');
  mockFetchVideoLikeStatus.mockResolvedValue(true);
});

afterEach(() => {
  mockFetchVideo.mockClear();
  mockFetchVideoLikeStatus.mockClear();
  mockSetLikeStatus.mockClear();
});

test('if video is liked likeStatus is set correctly and setLikeStatus is called correctly', async () => {
  render(<Video id={5} />);
  const user = userEvent.setup();
  const likeButton = screen.getByRole('button', { name: 'Like' });

  await act(async () => {
    await user.click(likeButton);
  });

  expect(likeButton).toHaveAttribute('aria-pressed', 'true');
  expect(mockSetLikeStatus).toHaveBeenCalledWith(5, true);
});

test('calls fetchVideo with correct id and sets response as video src', async () => {
  render(<Video id={2} />);
  const video = screen.getByTestId('source-element');

  expect(mockFetchVideo).toHaveBeenCalledWith(2);
  await waitFor(() => expect(video).toHaveAttribute('src', 'https://example.com/video.mp4'));
});
test.todo('calls fetchLikeStatus with correct and id and sets response as like status');
