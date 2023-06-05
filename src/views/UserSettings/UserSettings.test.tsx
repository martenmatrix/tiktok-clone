import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  getUsername, getMail, setUsername, isLoggedIn,
} from '../../firebase/api';
import UserSettings from './UserSettings';

jest.mock('../../firebase/api');

const mockGetUsername = getUsername as jest.MockedFunction<typeof getUsername>;
const mockGetMail = getMail as jest.MockedFunction<typeof getMail>;
const mockSetUsername = setUsername as jest.MockedFunction<typeof setUsername>;
const mockIsLoggedIn = isLoggedIn as jest.MockedFunction<typeof isLoggedIn>;

beforeEach(() => {
  mockGetUsername.mockResolvedValue('peter');
  mockGetMail.mockResolvedValue('mail@mail.mail');
  mockIsLoggedIn.mockResolvedValue(true);
});

afterEach(() => {
  mockGetUsername.mockClear();
  mockGetMail.mockClear();
  mockSetUsername.mockClear();
});

test('fetches username and mail and displays it', async () => {
  render(<UserSettings />);
  const usernameInput: HTMLInputElement = screen.getByLabelText('Username');
  const mailInput: HTMLInputElement = screen.getByLabelText('Mail');

  await waitFor(() => {
    expect(usernameInput.value).toBe('peter');
    expect(mailInput.value).toBe('mail@mail.mail');
  });
});

test('automatically updates username when typing in new username', async () => {
  render(<UserSettings />);
  const usernameInput: HTMLInputElement = screen.getByLabelText('Username');

  await act(async () => {
    const user = await userEvent.setup();
    await user.click(usernameInput);
    await user.type(usernameInput, 'parker');
  });

  await waitFor(() => {
    expect(usernameInput.value).toBe('parker');
    expect(mockSetUsername).toHaveBeenCalledWith('parker');
  });
});

test('displays mail and unable to edit input field', async () => {
  render(<UserSettings />);
  const mailInput: HTMLInputElement = screen.getByLabelText('Mail');

  await act(async () => {
    const user = await userEvent.setup();
    await user.click(mailInput);
    await user.type(mailInput, 'peter');
  });

  expect(mailInput.value).toBe('mail@mail.mail');
});

test('awaits firebase authentication', () => {
  render(<UserSettings />);
  expect(mockIsLoggedIn).toHaveBeenCalled();
});
