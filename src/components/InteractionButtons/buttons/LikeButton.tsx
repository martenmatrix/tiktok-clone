import Button from './Button';
import IconContainer from './IconContainer';
import HeartIcon from '../assets/heartSVG.js';

type LikeButtonProps = {
  onChange: () => void;
  isLiked: boolean;
}

function LikeButton({ onChange, isLiked }: LikeButtonProps): JSX.Element {
  return (
    <Button aria-label="Like" onClick={onChange}>
      <IconContainer iconColor={(isLiked ? 'red' : 'white')}>
        <HeartIcon />
      </IconContainer>
    </Button>
  );
}

export default LikeButton;
