import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getUsername, setUsername } from '../../firebase/api';

const StyledInput = styled.input`
  border: solid 1px #00000030;
  font-size: 20px;
  color: #000000;
  height: 40px;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const StyledLabel = styled.label`
  font-size: 15px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  color: #00000050;
`;

type InputType = {
  label: string,
  // eslint-disable-next-line no-unused-vars
  onChange?: (e: any) => void,
  value: string,
  disabled?: boolean,
}

function Input({
  onChange = (() => {}), value, label, disabled = false
}: InputType): JSX.Element {
  return (
    <InputContainer>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput onChange={onChange} value={value} name="username" id={label} type="text" disabled={disabled} />
    </InputContainer>
  );
}

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

  const onMailChange = useCallback((e: any) => {
    setMail(e.target.value);
  }, []);

  return (
    <UserSettingsContainer>
      <Input label="Username" value={name} onChange={onUsernameChange} />
      <Input label="Mail" value={mail} onChange={onMailChange} />
    </UserSettingsContainer>
  );
}

export default UserSettings;
