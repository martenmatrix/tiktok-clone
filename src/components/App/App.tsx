import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import GlobalStyle from './globalStyle.js';
import NavigationBar from '../NavigationBar';

const MainContainer = styled.div`
  display: block;
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
`;

type AppType = {
  onActionWhichRequiresAuth: () => void,
}

function App({ onActionWhichRequiresAuth }: AppType): JSX.Element {
  return (
    <MainContainer>
      <GlobalStyle />
      <Outlet />
      <NavigationBar onActionWhichRequiresAuth={onActionWhichRequiresAuth} />
    </MainContainer>
  );
}

export default App;
