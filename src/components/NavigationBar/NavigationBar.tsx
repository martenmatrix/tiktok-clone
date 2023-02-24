import styled from 'styled-components';
import AccountIcon from './assets/account.svg';
import ExploreIcon from './assets/explore.svg';
import UploadIcon from './assets/upload.svg';

const NavigationBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;

  width: 100%;
  height: 4.75rem;
  border-radius: 0.625rem 0.625rem 0 0;
  background: #87878750;
`;

function NavigationBar(): JSX.Element {
  return <NavigationBarContainer />;
}

export default NavigationBar;
