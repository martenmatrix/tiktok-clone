import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import { getUsername, setUsername } from '../../firebase/api';

const UserSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

function UserSettings(): JSX.Element {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');

  const onUsernameChange = useCallback((e: any) => {
    setName(e.target.value);
  }, []);

  return (
    <UserSettingsContainer>
      <Input label="Username" value={name} onChange={onUsernameChange} />
      <Input label="Mail" value={mail} disabled />
    </UserSettingsContainer>
  );
}

export default UserSettings;
