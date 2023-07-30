import userEvent from '@testing-library/user-event';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { isLoggedIn } from '../../firebase/api';
import NavigationBar from './NavigationBar';
import UploadElement from '../UploadElement/UploadElement';

jest.mock('../../firebase/api');
jest.mock('../UploadElement/UploadElement.tsx');

const mockIsLoggedIn = jest.mocked(isLoggedIn);
const mockUploadElement = jest.mocked(UploadElement);

beforeEach(() => {
  mockUploadElement.mockImplementation(({ onSelect }) => <button type="button" onClick={onSelect}>upload file</button>);
});

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
