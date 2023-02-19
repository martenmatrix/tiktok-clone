import styled from 'styled-components';
import Close from './assets/close.svg';
import AppleLogo from './assets/apple_logo.svg';
import GitHubLogo from './assets/github_logo.svg';
import TwitterLogo from './assets/twitter_logo.svg';
import GoogleLogo from './assets/google_logo.svg';

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
  height: 100%;
  max-height: 20rem;

  display: block;
  position: relative;
  
  background: #87878770;
  border-radius: 0.5rem;
`;

const CloseButton = styled.img.attrs({ src: Close, alt: 'Close' })`
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const LogoContainer = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Logo = styled.img`
  display: block;
  width: 5rem;
  height: 5rem;
  cursor: pointer;
`;

function LoginButtons(): JSX.Element {
  const logos: string[] = [AppleLogo, GoogleLogo, TwitterLogo, GitHubLogo];

  return (
    <LogoContainer>
      {logos.map((logo) => <Logo src={logo} />)}
    </LogoContainer>
  );
}

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
        <LoginButtons />
        <CloseButton />
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
