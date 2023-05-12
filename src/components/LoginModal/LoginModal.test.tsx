import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import LoginModal from './LoginModal';

const mockOnClose = jest.fn();
const mockOnSuccess = jest.fn();

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
