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

export type InteractionButtonsProps = {
  onLikeChange: () => void;
  isLiked: boolean;
  onCommentClick: () => void;
}

function InteractionButtons({ onLikeChange, isLiked, onCommentClick }: InteractionButtonsProps): JSX.Element {
  return (
    <Container>
      <ProfileButton />
      <LikeButton {...{ onChange: onLikeChange, isLiked }} />
      <CommentButton onClick={onCommentClick} />
      <ShareButton />
    </Container>
  );
}

export default InteractionButtons;
