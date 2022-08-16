import styled from 'styled-components';

import HeartIcon from './assets/heart.svg';
import CommentIcon from './assets/chat.svg';
import ShareIcon from './assets/chain.svg';

const Icon = styled.img`
  width: 34px;
  height: 34px;
`;

const Button = styled.div.attrs({ role: 'button' })`
  width: 60px;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`;

type RoundButtonProps = {
  interaction: string;
  image: string;
  alt: string;
}

function RoundButton({ interaction, image, alt }: RoundButtonProps): JSX.Element {
  return (
    <Button aria-label={interaction}>
      <Icon src={image} alt={alt} />
    </Button>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
`;

function InteractionButtons(): JSX.Element {
  return (
    <Container>
      <RoundButton interaction="Like" image={HeartIcon} alt="Like" />
      <RoundButton interaction="Comment" image={CommentIcon} alt="Comment" />
      <RoundButton interaction="Copy link" image={ShareIcon} alt="Copy link" />
    </Container>
  );
}

export default InteractionButtons;
