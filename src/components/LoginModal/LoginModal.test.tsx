import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import LoginModal from './LoginModal';

isVisible, 
                    onClose,
                    onGitHubLogin,
                    onGoogleLogin,
                    onTwitterLogin,
                    onAppleLogin

test.todo('if isVisible is true modal gets shown', () => {
    render(<LoginModal isVisible onClose={}/>);
});

test.todo('if isVisible is false modal is hidden', () => {

});

test.todo('if if close button is clicked onClose() is called', () => {

});

test.todo('if login with google is clicked onGoogleLogin gets called');
test.todo('if login with twitter is clicked onTwitterLogin gets called');
test.todo('if login with apple is clicked onAppleLogin gets called');
test.todo('if login with github is clicked onGitHub gets called');
