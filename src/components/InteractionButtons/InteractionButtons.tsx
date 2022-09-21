import styled from 'styled-components';

import ProfileButton from './buttons/ProfileButton';
import LikeButton from './buttons/LikeButton';
import CommentButton from './buttons/CommentButton';
import ShareButton from './buttons/ShareButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
`;

type InteractionButtonsProps = {
  onLikeChange: () => void;
  isLiked: boolean;
}

function InteractionButtons({ onLikeChange, isLiked }: InteractionButtonsProps): JSX.Element {
  return (
    <Container>
      <ProfileButton />
      <LikeButton {...{ onChange: onLikeChange, isLiked }} />
      <CommentButton />
      <ShareButton />
    </Container>
  );
}

export default InteractionButtons;
