import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import LoginModal from './LoginModal';

const mockOnClose = jest.fn();
const mockGoogleLogin = jest.fn();
const mockTwitterLogin = jest.fn();
const mockAppleLogin = jest.fn();
const mockGitHubLogin = jest.fn();

test('if isVisible is true modal gets shown', () => {
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onGoogleLogin={mockGoogleLogin}
    onTwitterLogin={mockTwitterLogin}
    onAppleLogin={mockAppleLogin}
    onGitHubLogin={mockGitHubLogin}
  />);

  const modal = screen.getByRole('dialog');
  expect(modal).toBeVisible();
});

test('if isVisible is false modal is hidden', () => {
  render(<LoginModal
    isVisible={false}
    onClose={mockOnClose}
    onGoogleLogin={mockGoogleLogin}
    onTwitterLogin={mockTwitterLogin}
    onAppleLogin={mockAppleLogin}
    onGitHubLogin={mockGitHubLogin}
  />);

  const modal = screen.getByRole('dialog', { hidden: true });
  expect(modal).not.toBeVisible();
});

test('if if close button is clicked onClose() is called', async () => {
  const user = userEvent.setup();
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onGoogleLogin={mockGoogleLogin}
    onTwitterLogin={mockTwitterLogin}
    onAppleLogin={mockAppleLogin}
    onGitHubLogin={mockGitHubLogin}
  />);

  const closeButton = screen.getByRole('button', { name: 'close dialog' });
  await user.click(closeButton);
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test('if login with google is clicked onGoogleLogin gets called', async () => {
  const user = userEvent.setup();
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onGoogleLogin={mockGoogleLogin}
    onTwitterLogin={mockTwitterLogin}
    onAppleLogin={mockAppleLogin}
    onGitHubLogin={mockGitHubLogin}
  />);

  const loginButton = screen.getByRole('button', { name: 'login with google' });
  await user.click(loginButton);
  expect(mockGoogleLogin).toHaveBeenCalledTimes(1);
});

test('if login with twitter is clicked onTwitterLogin gets called', async () => {
  const user = userEvent.setup();
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onGoogleLogin={mockGoogleLogin}
    onTwitterLogin={mockTwitterLogin}
    onAppleLogin={mockAppleLogin}
    onGitHubLogin={mockGitHubLogin}
  />);

  const loginButton = screen.getByRole('button', { name: 'login with twitter' });
  await user.click(loginButton);
  expect(mockTwitterLogin).toHaveBeenCalledTimes(1);
});

test('if login with apple is clicked onAppleLogin gets called', async () => {
  const user = userEvent.setup();
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onGoogleLogin={mockGoogleLogin}
    onTwitterLogin={mockTwitterLogin}
    onAppleLogin={mockAppleLogin}
    onGitHubLogin={mockGitHubLogin}
  />);

  const loginButton = screen.getByRole('button', { name: 'login with apple' });
  await user.click(loginButton);
  expect(mockAppleLogin).toHaveBeenCalledTimes(1);
});

test('if login with github is clicked onGitHub gets called', async () => {
  const user = userEvent.setup();
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onGoogleLogin={mockGoogleLogin}
    onTwitterLogin={mockTwitterLogin}
    onAppleLogin={mockAppleLogin}
    onGitHubLogin={mockGitHubLogin}
  />);

  const loginButton = screen.getByRole('button', { name: 'login with github' });
  await user.click(loginButton);
  expect(mockGitHubLogin).toHaveBeenCalledTimes(1);
});
