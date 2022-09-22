import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InteractionButtons from './InteractionButtons';

test.todo('provided username links to profile');

test('onLikeChange triggers if like button is clicked', async () => {
  const mockFunction = jest.fn();
  render(<InteractionButtons onLikeChange={mockFunction} isLiked />);
  const user = userEvent.setup();
  const likeButton = screen.getByRole('button', { name: 'Like' });

  await user.click(likeButton);

  expect(mockFunction).toHaveBeenCalled();
});

test('aria-pressed for like button is true when isLiked is true', () => {
  render(<InteractionButtons onLikeChange={() => undefined} isLiked />);
  const likeButton = screen.getByRole('button', { name: 'Like', pressed: true });

  expect(likeButton).toBeInTheDocument();
});

test('clicking the share button copies the current url to the clipboard', async () => {
  render(<InteractionButtons onLikeChange={() => undefined} isLiked />);
  const shareButton = screen.getByRole('button', { name: 'Copy link' });
  const currentHREF = window.location.href;
  const user = userEvent.setup();

  await user.click(shareButton);

  const clipboardContent = await navigator.clipboard.readText();
  expect(clipboardContent).toBe(currentHREF);
});
