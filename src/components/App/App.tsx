import GlobalStyle from './globalStyle.js';
import InteractionButtons from '../InteractionButtons';
import LoginModal from '../LoginModal';

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <InteractionButtons onLikeChange={() => {}} isLiked onCommentClick={() => {}} />
      <LoginModal isVisible onClose={() => {}} />
    </>
  );
}

export default App;
