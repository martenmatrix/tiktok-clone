import { render, screen } from '@testing-library/react';
import { getUsername, setUsername } from '../../firebase/api';
import UserSettings from './UserSettings';

const mockGetUsername = getUsername as jest.MockedFunction<typeof getUsername>;
const mockSetUsername = setUsername as jest.MockedFunction<typeof setUsername>;

test('fetches username and displays it', () => {
  mockGetUsername.mockResolvedValue('peter');
  render(<UserSettings />);
});

test('automatically updates username when typing in new username', () => {

});

test('displays mail and unable to edit input field', () => {

});
