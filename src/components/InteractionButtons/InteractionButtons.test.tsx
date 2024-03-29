import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import InteractionButtons, { InteractionButtonsProps } from './InteractionButtons';

function renderInteractionButtons(props: Partial<InteractionButtonsProps> = {}) {
  const defaultProps: InteractionButtonsProps = {
    profilePictureURL: 'https://www.example.org',
    onLikeChange: () => {},
    isLiked: true,
    isMute: true,
    onMuteClick: () => {},
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  render(<InteractionButtons {...defaultProps} {...props} />);
}

test('provided username links to profile', () => {
  renderInteractionButtons();
  const profilePictureButton = screen.getByRole('button', { name: 'Go to profile' });
  expect(profilePictureButton.dataset.to).toBe('peter_baller187');
});

test('provided imageURL gets set on image container as src', () => {
  renderInteractionButtons();
  const profilePictureContainer = screen.getByAltText('Profile picture');
  expect(profilePictureContainer).toHaveAttribute('src', 'https://www.example.org');
});

test('onLikeChange triggers if like button is clicked', async () => {
  const mockFunction = jest.fn();
  renderInteractionButtons({ onLikeChange: mockFunction });
  const user = userEvent.setup();
  const likeButton = screen.getByRole('button', { name: 'Like' });

  await user.click(likeButton);

  expect(mockFunction).toHaveBeenCalled();
});

test('aria-pressed for like button is true when isLiked is true', () => {
  renderInteractionButtons({ isLiked: true });
  const likeButton = screen.getByRole('button', { name: 'Like', pressed: true });

  expect(likeButton).toBeInTheDocument();
});

test('clicking the share button copies the current url to the clipboard', async () => {
  renderInteractionButtons();
  const shareButton = screen.getByRole('button', { name: 'Copy link' });
  const currentHREF = window.location.href;
  const user = userEvent.setup();

  await user.click(shareButton);

  const clipboardContent = await navigator.clipboard.readText();
  expect(clipboardContent).toBe(currentHREF);
});

test('clicking the mute button calls onMuteClick', async () => {
  const mockFunction = jest.fn();
  renderInteractionButtons({ onMuteClick: mockFunction });
  const user = userEvent.setup();
  const muteButton = screen.getByRole('button', { name: 'Mute video' });

  await user.click(muteButton);

  expect(mockFunction).toHaveBeenCalled();
});
