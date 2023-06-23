import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
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
  const uploadButton = screen.getByRole('button', { name: 'upload video' });
  await user.click(uploadButton);

  expect(mockOnAuth).toHaveBeenCalledTimes(1);
});

test.todo('if uploadButton is clicked opens context menu if user is logged in');
test.todo('if uploadVideo api function throws error display error with alert');
