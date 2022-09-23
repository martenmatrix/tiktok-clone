import CommentIcon from '../assets/chatSVG.js';
import Button from './Button';
import IconContainer from './IconContainer';

type CommentButtonProps = {
  onClick: () => void,
}

function CommentButton({ onClick }: CommentButtonProps): JSX.Element {
  return (
    <Button aria-label="Open comment section" {...{ onClick }}>
      <IconContainer iconColor="white">
        <CommentIcon />
      </IconContainer>
    </Button>
  );
}

export default CommentButton;
