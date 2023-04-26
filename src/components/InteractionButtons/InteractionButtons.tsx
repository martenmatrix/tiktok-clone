import styled from 'styled-components';

import ProfileButton from './buttons/ProfileButton';
import LikeButton from './buttons/LikeButton';
import MuteButton from './buttons/MuteButton';
import ShareButton from './buttons/ShareButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
`;

export type InteractionButtonsProps = {
  className?: string,
  profileId: string,
  profilePictureURL: string,
  onLikeChange: () => void;
  isLiked: boolean;
  isMute: boolean;
  onMuteClick: () => void;
}

function InteractionButtons({
  className,
  profilePictureURL,
  onLikeChange,
  isLiked,
  isMute,
  onMuteClick,
}: InteractionButtonsProps): JSX.Element {
  return (
    <Container className={className}>
      <ProfileButton imageSrc={profilePictureURL} />
      <LikeButton {...{ onChange: onLikeChange, isLiked }} />
      <MuteButton onClick={onMuteClick} isMute={isMute} />
      <ShareButton />
    </Container>
  );
}

InteractionButtons.defaultProps = {
  className: '',
};

export default InteractionButtons;
