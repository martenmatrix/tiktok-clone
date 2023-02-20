import styled from 'styled-components';
import GlobalStyle from './globalStyle.js';

const MainContainer = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <MainContainer>
      <GlobalStyle />
    </MainContainer>
  );
}

export default App;
