import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import useCurrentVideoID from '../../components/hooks/useCurrentVideoID';
import Feed from './Feed';
import Video from '../../components/Video';
import { getAllVideoIds } from '../../firebase/api';

jest.mock('../../firebase/api');
jest.mock('../../components/hooks/useCurrentVideoID');
jest.mock('../../components/Video/Video');
const mockUseCurrentVideoId = jest.mocked(useCurrentVideoID);
const mockVideo = jest.mocked(Video);
const mockGetAllVideoIds = jest.mocked(getAllVideoIds);

test('if search parameter for a id of a video is provided, displays the video as the first element', async () => {
  mockUseCurrentVideoId.mockReturnValue(['randomid', () => {}]);
  mockGetAllVideoIds.mockResolvedValue(['id1', 'id2', 'id3']);
  mockVideo.mockImplementation(({ id }) => (<h1>{id}</h1>));

  render(<Feed onActionWhichRequiresAuth={() => {}} />);

  await waitFor(() => {
    screen.getByText('id3');
  });

  const videoDivs = screen.getAllByRole('heading');
  expect(videoDivs[0].textContent).toBe('randomid');
});

test('does not fetch video ids again when two renders happen', async () => {
  mockGetAllVideoIds.mockResolvedValue(['id1', 'id2', 'id3']);
  mockVideo.mockImplementation(({ id }) => (<h1>{id}</h1>));
  render(<Feed onActionWhichRequiresAuth={() => {}} />);
  await act(() => {
    render(<Feed onActionWhichRequiresAuth={() => {}} />);
  });

  await waitFor(() => {
    expect(mockGetAllVideoIds).toHaveBeenCalledTimes(1);
  });
});

test('removes duplicate if video id was already fetched and is in search query', async () => {
  mockGetAllVideoIds.mockResolvedValue(['id1']);
  mockUseCurrentVideoId.mockReturnValue(['id1', () => {}]);
  mockVideo.mockImplementation(({ id }) => (<h1>{id}</h1>));

  await act(() => {
    render(<Feed onActionWhichRequiresAuth={() => {}} />);
  });

  await waitFor(() => {
    screen.getByText('id1');
  });

  const videoDivs = screen.getAllByRole('heading');
  expect(videoDivs.length).toBe(1);
});

test.todo('isLiked gets fetched for the current video running');
test.todo('three videos are displayed');
test.todo('Swiping up displays the second video in the array and clicking the like button fires with the corresponding id');
test.todo('swiping down displays the previous video');
test.todo('loginModal gets shown when user is not logged in and attempts to like');
