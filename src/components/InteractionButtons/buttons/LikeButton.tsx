import { useState } from 'react';
import Button from './Button';
import IconContainer from './IconContainer';
import HeartIcon from '../assets/heartSVG.js';

function LikeButton(): JSX.Element {
  const [isLiked, setIsLiked] = useState(false);

  function addOrRevokeLike() {
    if (isLiked) setIsLiked(false);
    else if (!isLiked) setIsLiked(true);
  }

  return (
    <Button aria-label="Like" onClick={() => addOrRevokeLike()}>
      <IconContainer iconColor={(isLiked ? 'red' : 'white')}>
        <HeartIcon />
      </IconContainer>
    </Button>
  );
}

export default LikeButton;
