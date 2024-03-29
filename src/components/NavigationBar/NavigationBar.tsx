import styled from 'styled-components';
import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import AccountIcon from './assets/account.svg';
import ExploreIcon from './assets/explore.svg';
import UploadIcon from './assets/upload.svg';
import UploadElement from '../UploadElement';
import { isLoggedIn, uploadVideo } from '../../firebase/api';

type NavigationBarType = {
  onActionWhichRequiresAuth: () => void,
}

const NavigationBarContainer = styled.div`
  z-index: 1;
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

const UploadButton = styled.div`
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

function NavigationBar({ onActionWhichRequiresAuth }: NavigationBarType): JSX.Element {
  const onSelect = useCallback(async (data: any) => {
    const loggedIn = await isLoggedIn();
    if (loggedIn) {
      uploadVideo(data);
    } else {
      onActionWhichRequiresAuth();
    }
  }, []);

  return (
    <NavigationBarContainer>
      <NavLink to="feed">
        <ExploreButton />
      </NavLink>
      <UploadElement acceptedTypes="video/mp4" onSelect={onSelect}>
        <UploadButton>
          <Icon src={UploadIcon} />
        </UploadButton>
      </UploadElement>
      <NavLink to="userSettings">
        <AccountButton />
      </NavLink>
    </NavigationBarContainer>
  );
}

export default NavigationBar;
