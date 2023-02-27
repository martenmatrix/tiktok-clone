import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Video from './Video';

const mockFetchVideo = jest.fn().mockReturnValue(Promise.resolve('https://example.com/video.mp4'));
const mockFetchVideoLikeStatus = jest.fn().mockReturnValue(Promise.resolve(true));
const mockSetLikeStatus = jest.fn().mockReturnValue(Promise.resolve());
jest.mock('../../firebase/api', () => {
  const originalModule = jest.requireActual('../../firebase/api');

  return {
    __esModule: true,
    ...originalModule,
    fetchVideo: (...args) => mockFetchVideo(...args),
    fetchVideoLikeStatus: (...args) => mockFetchVideoLikeStatus(...args),
    setLikeStatus: (...args) => mockSetLikeStatus(...args),
  };
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
test.todo('calls fetchVideo with correct id and sets response as video src');
test.todo('calls fetchLikeStatus with correct and id and sets response as like status');
