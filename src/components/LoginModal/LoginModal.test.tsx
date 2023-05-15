import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as firebaseUtil from '../../firebase/login';
import '@testing-library/jest-dom';
import LoginModal from './LoginModal';
// eslint-disable-next-line no-unused-vars
import { loginWithMail, registerWithMail } from '../../firebase/login';

const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

beforeEach(() => jest.clearAllMocks());

test('if isVisible is true modal gets shown', () => {
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onSuccess={mockOnSuccess}
  />);

  const modal = screen.getByRole('dialog');
  expect(modal).toBeVisible();
});

test('if isVisible is false modal is hidden', () => {
  render(<LoginModal
    isVisible={false}
    onClose={mockOnClose}
    onSuccess={mockOnSuccess}
  />);

  const modal = screen.getByRole('dialog', { hidden: true });
  expect(modal).not.toBeVisible();
});

test('if if close button is clicked onClose() is called', async () => {
  const user = userEvent.setup();
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onSuccess={mockOnSuccess}
  />);

  const closeButton = screen.getByRole('button', { name: 'close dialog' });
  await user.click(closeButton);
  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

test('if loginWithMail succeeds calls onSuccess and does not call registerWithMail', async () => {
  const loginMailMock = jest.spyOn(firebaseUtil, 'loginWithMail').mockResolvedValue();
  const registerMailMock = jest.spyOn(firebaseUtil, 'registerWithMail').mockResolvedValue();
  const user = userEvent.setup();
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onSuccess={mockOnSuccess}
  />);
  const loginButton = screen.getByRole('button', { name: 'submit form' });

  await user.click(loginButton);

  expect(loginMailMock).toHaveBeenCalledTimes(1);
  expect(registerMailMock).toHaveBeenCalledTimes(0);
});

test('if loginWithMail does not succeed calls registerWithMail', async () => {
  const loginMailMock = jest.spyOn(firebaseUtil, 'loginWithMail').mockRejectedValue(false);
  const registerMailMock = jest.spyOn(firebaseUtil, 'registerWithMail').mockResolvedValue();
  const user = userEvent.setup();
  render(<LoginModal
    isVisible
    onClose={mockOnClose}
    onSuccess={mockOnSuccess}
  />);
  const loginButton = screen.getByRole('button', { name: 'submit form' });

  await user.click(loginButton);

  expect(loginMailMock).toHaveBeenCalledTimes(1);
  expect(registerMailMock).toHaveBeenCalledTimes(1);
});
