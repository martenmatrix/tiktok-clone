import styled from 'styled-components';
import GlobalStyle from './globalStyle.js';
import NavigationBar from '../NavigationBar';
import { Feed } from '../../views';

const MainContainer = styled.div`
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
`;

function App(): JSX.Element {
  return (
    <MainContainer>
      <GlobalStyle />
      <Feed />
      <NavigationBar onUpload={() => {}} />
    </MainContainer>
  );
}

export default App;
