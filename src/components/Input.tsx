import styled from 'styled-components';
import React from 'react';

const StyledLabel = styled.label`
  font-size: 15px;
`;

const StyledInput: any = styled.input`
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
  width: 100%;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  color: #00000050;
`;

interface InputType extends React.ComponentProps<'input'> {
  label: string,
  className?: string,
}

function Input({ label, className, ...inputProps }: InputType): JSX.Element {
  return (
    <InputContainer className={className}>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput name={label} id={label} {...inputProps} />
    </InputContainer>
  );
}

export default Input;
