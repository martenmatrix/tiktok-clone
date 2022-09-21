import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InteractionButtons from './InteractionButtons';

test.todo('provided username links to profile');

test('onLikeChange triggers if like button is clicked', async () => {
  const mockFunction = jest.fn();
  render(<InteractionButtons onLikeChange={mockFunction} isLiked />);
  const user = userEvent.setup();
  const likeButton = screen.getByRole('button', { name: 'Like' });

  await user.click(likeButton);

  expect(mockFunction).toHaveBeenCalled();
});

test.todo('if liked heart icon is red');
