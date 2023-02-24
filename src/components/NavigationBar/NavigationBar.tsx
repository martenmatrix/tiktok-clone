import styled from 'styled-components';

const NavigationBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.75rem;
  border-radius: 0.625rem 0.625rem 0 0;
  background: #87878750;
`;

function NavigationBar(): JSX.Element {
  return <NavigationBarContainer />;
}

export default NavigationBar;
