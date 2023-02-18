import styled from 'styled-components';

type LoginModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onGitHubLogin?: () => void | null;
    onGoogleLogin?: () => void | null;
    onTwitterLogin?: () => void | null;
    onAppleLogin?: () => void | null;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 30rem;
  height: 25%;
  min-width: 5rem;
  min-height: 2.5rem;
  display: block;
  position: relative;
  border: 1px solid black;
`;

const CloseButton = styled.div`
  transform: rotate(45deg);
  font-size: 2.5rem;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  right: 1rem;
`;

function LoginModal({
  isVisible,
  onClose,
  onGitHubLogin,
  onGoogleLogin,
  onTwitterLogin,
  onAppleLogin }: LoginModalProps): JSX.Element {
  return (
    <Container>
      <Modal>
        <CloseButton>+</CloseButton>
      </Modal>
    </Container>
  );
}

LoginModal.defaultProps = {
  onGitHubLogin: null,
  onGoogleLogin: null,
  onTwitterLogin: null,
  onAppleLogin: null,
};

export default LoginModal;
