import Button from './Button';
import IconContainer from './IconContainer';

import ShareIcon from '../assets/chainSVG.js';

function ShareButton(): JSX.Element {
  async function onClick(): Promise<void> {
    if (navigator.clipboard) {
      const currentHREF = window.location.href;
      await navigator.clipboard.writeText(currentHREF);
    }
  }

  return (
    <Button aria-label="Copy link" {...{ onClick }}>
      <IconContainer iconColor="white">
        <ShareIcon />
      </IconContainer>
    </Button>
  );
}

export default ShareButton;
