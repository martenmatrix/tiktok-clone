import userEvent from '@testing-library/user-event';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { isLoggedIn } from '../../firebase/api';
import NavigationBar from './NavigationBar';

jest.mock('../../firebase/api');

const mockIsLoggedIn = jest.mocked(isLoggedIn);

test('if uploadButton is clicked calls onActionWhichRequiresAuth if user is not logged in', async () => {
  mockIsLoggedIn.mockResolvedValue(false);
  const mockOnAuth = jest.fn();
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <NavigationBar onActionWhichRequiresAuth={mockOnAuth} />
    </BrowserRouter>,
  );

  await waitFor(() => {
    screen.getByRole('button', { name: 'upload file' });
  });
  const uploadButton = screen.getByRole('button', { name: 'upload file' });
  await user.click(uploadButton);

  await waitFor(() => {
    expect(mockOnAuth).toHaveBeenCalled();
  });
});

test.todo('if uploadVideo api function throws error display error with alert');
