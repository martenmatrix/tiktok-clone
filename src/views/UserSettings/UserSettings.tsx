import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Input from '../../components/Input';
import { getUsername, getMail, setUsername } from '../../firebase/api';

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

  useEffect(() => {
    async function getUserAndMail() {
      const username = await getUsername();
      setName(username);
      const mailFromUser = await getMail();
      setMail(mailFromUser);
    }

    getUserAndMail();
  }, []);

  return (
    <UserSettingsContainer>
      <Input label="Username" type="text" value={name} onChange={onUsernameChange} />
      <Input label="Mail" type="email" value={mail} disabled />
    </UserSettingsContainer>
  );
}

export default UserSettings;
