import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import NavigationBar from './NavigationBar';

test('onUpload gets called when upload button is clicked', async () => {
  const mockOnUpload = jest.fn();
  const user = userEvent.setup();

  render(<NavigationBar onUpload={mockOnUpload} />);
  const uploadButton = screen.getByRole('button', { name: 'upload video' });
  user.click(uploadButton);

  expect(mockOnUpload).toHaveBeenCalledTimes(1);
});

export {};
