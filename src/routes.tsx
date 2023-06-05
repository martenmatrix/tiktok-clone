import { Routes, Navigate, Route } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { App, LoginModal } from './components';
import { Feed, UserSettings } from './views';

function AvailableRoutes(): JSX.Element {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const displayLoginModal = useCallback(() => {
    setShowLoginModal(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false);
  }, []);

  return (
    <>
      <LoginModal isVisible={showLoginModal} onClose={closeLoginModal} onSuccess={() => {}} />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="/feed" />} />
          <Route index path="feed" element={<Feed onActionWhichRequiresAuth={displayLoginModal} />} />
          <Route path="userSettings" element={<UserSettings />} />
        </Route>
      </Routes>
    </>
  );
}

export default AvailableRoutes;
