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

const UploadButton = styled.div.attrs({ role: 'button', 'aria-label': 'upload video' })`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #00000040;
  width: 76px;
  height: 43px;
  border-radius: 0.625rem;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const ExploreButton = styled(Icon).attrs({ src: ExploreIcon, role: 'button', 'aria-label': 'go to explore page' })`
  cursor: pointer;
`;

const AccountButton = styled(Icon).attrs({ src: AccountIcon, role: 'button', 'aria-label': 'go to account settings' })`
  cursor: pointer;
`;

function NavigationBar(): JSX.Element {
  return (
    <NavigationBarContainer>
      <ExploreButton />
      <UploadButton>
        <Icon src={UploadIcon} />
      </UploadButton>
      <AccountButton />
    </NavigationBarContainer>
  );
}

export default NavigationBar;
