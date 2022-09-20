import styled from 'styled-components';

type IconContainerTypes = {
  iconColor?: string;
  onClick?: () => void;
}

const IconContainer = styled.div<IconContainerTypes>`
  width: 34px;
  height: 34px;
  color: ${(props) => props.iconColor || 'canvastext'}
`;

export default IconContainer;
