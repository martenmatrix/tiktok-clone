import styled from 'styled-components';
import InteractionButtons from '../InteractionButtons';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 16rem;
  
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <AppContainer>
      <InteractionButtons
        onLikeChange={() => undefined}
        isLiked
        onCommentClick={() => undefined}
      />
    </AppContainer>
  );
}

export default App;
