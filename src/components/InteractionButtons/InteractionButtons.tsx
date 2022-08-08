import styled from 'styled-components';

type RoundButtonProps = {
  interaction: string;
  image: string;
  alt: string;
}

function RoundButton({ interaction, image, alt }: RoundButtonProps): JSX.Element {
  return (
    <div role="button" aria-label={interaction}>
      <img src={image} alt={alt} />
    </div>
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
      <RoundButton interaction="Like" image="https://img.icons8.com/color/48/000000/like.png" alt="Like" />
      <RoundButton interaction="Comment" image="https://img.icons8.com/color/48/000000/comment.png" alt="Comment" />
      <RoundButton interaction="Copy link" image="https://img.icons8.com/color/48/000000/share.png" alt="Copy link" />
    </Container>
  );
}

export default InteractionButtons;
