import './content/css/bootstrap-theme.scss';
import './content/css/App.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { HashRouter as Router,  Routes,  Route,  Link } from 'react-router-dom';

import Home from './pages/Home';
import NoPage from './pages/NoPage';
import CreateAccount from './pages/createAccount';
import RegisterScreen from './pages/registerScreen';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile';
import Accounting from './pages/Accounting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/createAccount" element={<CreateAccount />} />
          <Route index element={<Home />} />
          <Route path="/register/*" element={<RegisterScreen />}  />
          <Route path="/profile/" element={<Profile />}  />
          <Route path="/accounting/" element={<Accounting />}  />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
