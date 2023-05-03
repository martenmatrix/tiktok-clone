import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getUsername, setUsername } from '../../firebase/api';

const StyledInput = styled.input`
  border: solid 1px #00000030;
  font-size: 20px;
  color: #000000;
  height: 40px;
  border-radius: 5px;
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
  onChange?: (newInput: string) => void,
  disabled?: boolean,
}

function Input({ onChange, label, disabled = false }: InputType): JSX.Element {
  const [value, setValue] = useState<string>('');

  const onValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;
    onChange && onChange(newInput);
    setValue(newInput);
  }, []);

  return (
    <InputContainer>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput onChange={onValueChange} value={value} name="username" id={label} type="text" disabled={disabled} />
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
  const [username, setUsername] = useState<string>('undefined');

  return (
    <UserSettingsContainer>
      <Input label="Username" />
      <Input label="Mail" />
    </UserSettingsContainer>
  );
}

export default UserSettings;
