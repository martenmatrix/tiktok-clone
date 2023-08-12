import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { fadeIn, fadeOut } from '../animations/fade.style';
import { registerWithMail, loginWithMail } from '../../firebase/login';
import Arrow from './assets/green_right_arrow.svg';
import Input from '../Input';

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const StyledInput = styled(Input)`
  width: 80%;
`;

const Container = styled.div<{ open: boolean }>`
  z-index: 2;
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
  position: relative;
  background: whitesmoke;
  border-radius: 0.5rem;
`;

const SubmitButton = styled.button.attrs({ 'aria-label': 'submit form' })`
  border: none;
  color: transparent;
  background: none;
  cursor: pointer;
  outline: none;
  position: absolute;
  bottom: 0;
  right: 0;
`;

const StyledForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubmitButtonImage = styled.img.attrs({
  src: Arrow, alt: 'green arrow pointing right',
})`
  width: 4rem;
  height: 4rem;
`;

function LoginModal({
  isVisible,
  onClose,
  onSuccess,
}: LoginModalProps): JSX.Element {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const onMailChange = useCallback((e: any) => {
    const newMail = e.target.value;
    setMail(newMail);
  }, []);

  const onPasswordChange = useCallback((e: any) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  }, []);

  async function loginOrSignup(): Promise<void> {
    try {
      await loginWithMail(mail, password);
      onSuccess();
    } catch (e) {
      await registerWithMail(mail, password).then(onSuccess);
    }
  }

  const onSubmit = useCallback(async (e: any) => {
    e.preventDefault();
    await loginOrSignup();
  }, [mail, password]);

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
        <StyledForm onSubmit={onSubmit}>
          <StyledInput label="Mail" value={mail} onChange={onMailChange} type="email" required />
          <StyledInput label="Password" value={password} onChange={onPasswordChange} type="password" minLength={6} />
          <SubmitButton>
            <SubmitButtonImage />
          </SubmitButton>
        </StyledForm>
      </Modal>
    </Container>
  );
}

export default LoginModal;
