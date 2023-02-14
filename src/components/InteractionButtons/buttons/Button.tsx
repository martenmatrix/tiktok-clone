import styled from 'styled-components';

type ButtonProps = {
  'aria-label': string;
}

const Button = styled.div.attrs({ role: 'button' })<ButtonProps>`
  width: 60px;
  height: 60px;
  background: #87878750;
  margin: 16px;
  border-radius: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export default Button;
