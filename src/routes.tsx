import { Routes, Navigate, Route } from 'react-router-dom';
import { App } from './components';
import { Feed, UserSettings } from './views';

function AvailableRoutes(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route index path="feed" element={<Feed />} />
        <Route path="userSettings" element={<UserSettings />} />
      </Route>
    </Routes>
  );
}

export default AvailableRoutes;
