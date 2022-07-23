import { Routes, Route } from 'react-router-dom';
import App from './components';
import Feed from './views';
import UserSettings from './views';

const AvailableRoutes: JSX.Element =
    <Routes>
        <Route path="/" element={<App />}>
            <Route path="feed" element={<Feed />} />
            <Route path="userSettings" element={<UserSettings />} />
        </Route>
    </Routes>

export default AvailableRoutes;