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

function InteractionButtons(): JSX.Element {
  return (
    <Container>
      <ProfileButton />
      <LikeButton />
      <CommentButton />
      <ShareButton />
    </Container>
  );
}

export default InteractionButtons;
