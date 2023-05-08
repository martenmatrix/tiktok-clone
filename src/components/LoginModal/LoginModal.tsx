import styled from 'styled-components';
import { fadeIn, fadeOut } from '../animations/fade.style';
import Close from './assets/close.svg';
import Arrow from './assets/green_right_arrow.svg';

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const Container = styled.div<{ open: boolean }>`
  width: 100%;
  height: 100%;
  background: #00000025;
  backdrop-filter: blur(1rem);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: 1s ${(props) => ((props.open) ? fadeIn : fadeOut)};
  visibility: ${(props) => ((props.open) ? 'visible' : 'hidden')};
`;

const Modal = styled.div`
  width: 100%;
  max-width: 40rem;
  height: 100%;
  max-height: 20rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-between;
  position: relative;
  
  background: #87878770;
  border-radius: 0.5rem;
`;

const CloseButton = styled.img.attrs({ src: Close, role: 'button', 'aria-label': 'close dialog' })`
  cursor: pointer;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
`;

const SubmitButton = styled.img.attrs({ src: Arrow, role: 'button', 'aria-label': 'submit form' })`
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 6rem;
  height: 6rem;
`;

function LoginModal({
  isVisible,
  onClose,
}: LoginModalProps): JSX.Element {
  return (
    <Container
      role="dialog"
      onClick={(e) => {
        if (!(e.target === e.currentTarget)) return;
        onClose();
      }}
      open={isVisible}
    >
      <Modal>
        <CloseButton onClick={onClose} />
        <SubmitButton />
      </Modal>
    </Container>
  );
}

export default LoginModal;
