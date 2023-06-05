import {
  Routes, Navigate, Route, useNavigate,
} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { isLoggedIn } from './firebase/api';
import { App, LoginModal } from './components';
import { Feed, UserSettings } from './views';

function AvailableRoutes(): JSX.Element {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const displayLoginModal = useCallback(() => {
    setShowLoginModal(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  useEffect(() => {
    isLoggedIn().then((res) => setAuthenticated(res));
  }, []);

  return (
    <>
      <LoginModal
        isVisible={showLoginModal}
        onClose={closeLoginModal}
        onSuccess={closeLoginModal}
      />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/feed" />} />
          <Route index path="feed" element={<Feed onActionWhichRequiresAuth={displayLoginModal} />} />
          <Route path="userSettings" element={authenticated ? <UserSettings /> : <LoginModal isVisible onClose={() => navigate('/')} onSuccess={closeLoginModal} />} />
        </Route>
      </Routes>
    </>
  );
}

export default AvailableRoutes;
