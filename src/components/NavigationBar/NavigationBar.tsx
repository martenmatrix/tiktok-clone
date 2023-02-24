import styled from 'styled-components';

const NavigationBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  
  width: 100%;
  height: 1rem;
  border: solid 1px black;
`;

function NavigationBar(): JSX.Element {
  return <NavigationBarContainer />;
}

export default NavigationBar;
