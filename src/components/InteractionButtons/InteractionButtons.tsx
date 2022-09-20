import styled from 'styled-components';
import { useState } from 'react';

import HeartIcon from './assets/heartSVG.js';
import CommentIcon from './assets/chatSVG.js';
import ShareIcon from './assets/chainSVG.js';
import ProfilePicturePlaceholder from './assets/profilePicturePlaceholder.png';

type CallbackFunction = () => void;

type Image = {
  iconColor?: string;
  onClick?: CallbackFunction;
}

const IconContainer = styled.div<Image>`
  width: 34px;
  height: 34px;
  color: ${(props) => props.iconColor || 'canvastext'}
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

function ProfileButton(): JSX.Element {
  return (
    <Button aria-label="Go to profile">
      <ProfilePicture src={ProfilePicturePlaceholder} alt="Profile picture" />
    </Button>
  );
}

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

function CommentButton(): JSX.Element {
  return (
    <Button aria-label="Open comment section">
      <CommentIcon />
    </Button>
  );
}

function ShareButton(): JSX.Element {
  return (
    <Button aria-label="Copy link">
      <ShareIcon />
    </Button>
  );
}

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
