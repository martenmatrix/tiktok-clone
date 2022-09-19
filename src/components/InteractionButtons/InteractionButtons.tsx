import styled from 'styled-components';

import HeartIcon from './assets/heart.svg';
import CommentIcon from './assets/chat.svg';
import ShareIcon from './assets/chain.svg';
import ProfilePicturePlaceholder from './assets/profilePicturePlaceholder.png';

type Image = {
  src: string;
  alt: string;
}

const Icon = styled.img<Image>`
  width: 34px;
  height: 34px;
`;

const ProfilePicture = styled.img<Image>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5rem;
`;

type ButtonProps = {
  'aria-label': string;
}

const Button = styled.div.attrs({ role: 'button' })<ButtonProps>`
  width: 60px;
  height: 60px;
  background: #87878750;
  margin: 16px;
  border-radius: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
`;

function InteractionButtons(): JSX.Element {
  return (
    <Container>
      <Button aria-label="Go to profile">
        <ProfilePicture src={ProfilePicturePlaceholder} alt="Profile picture" />
      </Button>
      <Button aria-label="Like">
        <Icon src={HeartIcon} alt="Profile picture" />
      </Button>
      <Button aria-label="Comment">
        <Icon src={CommentIcon} alt="Comment" />
      </Button>
      <Button aria-label="Copy link">
        <Icon src={ShareIcon} alt="Copy link" />
      </Button>
    </Container>
  );
}

export default InteractionButtons;
