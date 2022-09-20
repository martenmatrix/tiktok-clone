import CommentIcon from '../assets/chatSVG.js';
import Button from './Button';
import IconContainer from './IconContainer';

function CommentButton(): JSX.Element {
  return (
    <Button aria-label="Open comment section">
      <IconContainer iconColor="white">
        <CommentIcon />
      </IconContainer>
    </Button>
  );
}

export default CommentButton;
