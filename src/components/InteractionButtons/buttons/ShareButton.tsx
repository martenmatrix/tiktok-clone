import styled from 'styled-components';
import { useState } from 'react';
import Button from './Button';
import IconContainer from './IconContainer';

import ShareIcon from '../assets/chainSVG.js';

const AnimatedIconContainer = styled(IconContainer)`
  transition: color 1s;
`;

function ShareButton(): JSX.Element {
  const [buttonColor, setButtonColor] = useState<string>('white');

  async function onClick(): Promise<void> {
    async function copyHrefToClipboard(): Promise<void> {
      if (navigator.clipboard) {
        const currentHREF = window.location.href;
        await navigator.clipboard.writeText(currentHREF);
      }
    }

    function blinkGreen(): void {
      setButtonColor('#16CA06');
      setTimeout(() => setButtonColor('white'), 250);
    }

    blinkGreen();
    await copyHrefToClipboard();
  }

  return (
    <Button aria-label="Copy link" {...{ onClick }}>
      <AnimatedIconContainer iconColor={buttonColor}>
        <ShareIcon />
      </AnimatedIconContainer>
    </Button>
  );
}

export default ShareButton;
