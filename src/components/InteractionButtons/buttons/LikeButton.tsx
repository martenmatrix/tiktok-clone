import Button from './Button';
import IconContainer from './IconContainer';
import HeartIcon from '../assets/heartSVG.js';

type LikeButtonProps = {
  onChange?: () => void;
  isLiked?: boolean;
}

const LikeButtonDefaultProps = {
  onChange: () => undefined,
  isLiked: false,
};

function LikeButton({ onChange, isLiked }: LikeButtonProps): JSX.Element {
  return (
    <Button aria-label="Like" aria-pressed={isLiked} onClick={onChange}>
      <IconContainer iconColor={(isLiked ? 'red' : 'white')}>
        <HeartIcon />
      </IconContainer>
    </Button>
  );
}

LikeButton.defaultProps = LikeButtonDefaultProps;

export default LikeButton;
