import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getUsername, setUsername } from '../../firebase/api';

const StyledInput = styled.input`
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
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
      <label htmlFor={label}>label</label>
      <StyledInput onChange={onValueChange} value={value} name="username" id={label} type="text" disabled={disabled} />
    </InputContainer>
  );
}

function UserSettings(): JSX.Element {
  const [username, setUsername] = useState<string>('undefined');

  return <Input label="Username" />;
}

export default UserSettings;
