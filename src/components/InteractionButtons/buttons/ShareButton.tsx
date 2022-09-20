import Button from './Button';
import IconContainer from './IconContainer';

import ShareIcon from '../assets/chainSVG.js';

function ShareButton(): JSX.Element {
  return (
    <Button aria-label="Copy link">
      <IconContainer iconColor="white">
        <ShareIcon />
      </IconContainer>
    </Button>
  );
}

export default ShareButton;
