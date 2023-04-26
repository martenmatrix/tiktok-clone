import Button from './Button';
import mutedSVG from '../assets/mutedSVG.js';
import unmutedSVG from '../assets/unmutedSVG.js';
import IconContainer from './IconContainer';

type MuteButtonProps = {
  onClick: () => void,
  isMute: boolean
}

function MuteButton({ onClick, isMute }: MuteButtonProps) {
  return (
    <Button aria-label="Mute video" aria-pressed={isMute} onClick={onClick}>
      <IconContainer iconColor="white">
        {isMute ? mutedSVG() : unmutedSVG()}
      </IconContainer>
    </Button>
  );
}

export default MuteButton;
