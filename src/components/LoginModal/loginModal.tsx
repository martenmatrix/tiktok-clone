import styled from 'styled-components';
import Close from './assets/close.svg';
import AppleLogo from './assets/apple_logo.svg';
import GitHubLogo from './assets/github_logo.svg';
import TwitterLogo from './assets/twitter_logo.svg';
import GoogleLogo from './assets/google_logo.svg';

type LoginFunctions = {
    onGitHubLogin: () => void;
    onGoogleLogin: () => void;
    onTwitterLogin: () => void;
    onAppleLogin: () => void;
}

interface LoginModalProps extends LoginFunctions {
  isVisible: boolean;
  onClose: () => void;
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

function LoginButtons({
  onGitHubLogin,
  onGoogleLogin,
  onTwitterLogin,
  onAppleLogin,
}: LoginFunctions): JSX.Element {
  const logos: { src: string, alt: string, onClick: () => void | null }[] = [
    { src: GoogleLogo, alt: 'Google Login', onClick: onGoogleLogin },
    { src: TwitterLogo, alt: 'Twitter Login', onClick: onTwitterLogin },
    { src: AppleLogo, alt: 'Apple Login', onClick: onAppleLogin },
    { src: GitHubLogo, alt: 'GitHub Login', onClick: onGitHubLogin },
  ];

  return (
    <LogoContainer>
      {logos.map((logo) => <Logo src={logo.src} alt={logo.alt} onClick={logo.onClick} />)}
    </LogoContainer>
  );
}

function LoginModal({
  isVisible,
  onClose,
  onGitHubLogin,
  onGoogleLogin,
  onTwitterLogin,
  onAppleLogin,
}: LoginModalProps): JSX.Element {
  return (
    <Container role="dialog">
      <Modal>
        <LoginButtons
          onGitHubLogin={onGitHubLogin}
          onGoogleLogin={onGoogleLogin}
          onTwitterLogin={onTwitterLogin}
          onAppleLogin={onAppleLogin}
        />
        <CloseButton onClick={onClose} />
      </Modal>
    </Container>
  );
}

export default LoginModal;
