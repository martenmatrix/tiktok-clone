import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import UploadElement from './UploadElement';

test('opens context menu when upload button is clicked', async () => {
  let contextMenuOpened = false;
  const user = userEvent.setup();
  render(<UploadElement acceptedTypes="video/mp4" onSelect={() => {}} />);

  const actualInput = screen.getByLabelText('hidden upload input');
  const uploadButton = screen.getByRole('button');

  actualInput.addEventListener('click', () => {
    contextMenuOpened = true;
  });

  await user.click(uploadButton);

  await waitFor(() => {
    expect(contextMenuOpened).toBe(true);
  });
});
test('display components passed as children', () => {
  const toBeRendered = (
    <UploadElement acceptedTypes="video/mp4" onSelect={() => {}}>
      <div>
        <p>This is a children.</p>
      </div>
    </UploadElement>
  );

  render(toBeRendered);

  screen.getByText('This is a children.');
});

test('only accepts types passed as props', () => {
  render(<UploadElement acceptedTypes="video/mp4" onSelect={() => {}} />);

  const actualInput = screen.getByLabelText('hidden upload input');

  expect(actualInput).toHaveAttribute('accept', 'video/mp4');
});
