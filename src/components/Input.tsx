import styled from 'styled-components';
import React from 'react';

const StyledLabel = styled.label`
  font-size: 15px;
`;

const StyledInput = styled.input`
  border: solid 1px #00000030;
  font-size: 20px;
  color: #000000;
  height: 40px;
  border-radius: 5px;
  background: transparent;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
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
  type: string,
  disabled?: boolean,
}

function Input({
  onChange = (() => {}), value, label, type, disabled = false,
}: InputType): JSX.Element {
  return (
    <InputContainer>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput onChange={onChange} value={value} name="username" id={label} type={type} disabled={disabled} />
    </InputContainer>
  );
}

export default Input;
