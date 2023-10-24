import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './login';
import ProfilePage from './exo/profilepage';
import Exo1 from './exo/exo1';
import Exo2 from './exo/exo2';
import Exo3 from './exo/exo3';
import Exo5 from './exo/exo5';
import Exo6 from './exo/exo6';
import { UserProvider, useUser } from './exo/components/usercontext';


const App: React.FC = () => {
  const { user } = useUser();
  return (
    <div className="App">
      <Router>
        <nav className="App-nav">
          <ul>
            <li>
            { user ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link>}
            </li>
            <li>
              <Link to="/exo1">Exo 1</Link>
            </li>
            <li>
              <Link to="/exo2">Exo 2</Link>
            </li>
            <li>
              <Link to="/exo3">Exo 3</Link>
            </li>
            <li>
              <Link to="/">Exo 4</Link> 
            </li>
            <li>
              <Link to="/exo5">Exo 5</Link>
            </li>
            <li>
              <Link to="/exo6">Exo 6</Link>
            </li>
          </ul>
        </nav>

        <div className="App-header">
          <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/exo1" element={<Exo1 />} />
            <Route path="/exo2" element={<Exo2 />} />
            <Route path="/exo3/*" element={<Exo3 />} />
            <Route path="/exo5" element={<Exo5 />} />
            <Route path="/exo6" element={<Exo6 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
