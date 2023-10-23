import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Exo1 from './exo/exo1';
import Exo2 from './exo/exo2';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        {/* Liste des boutons */}
        <nav className="App-nav">
          <ul>
            <li>
              <Link to="/exo1">Exo 1</Link>
            </li>
            <li>
              <Link to="/exo2">Exo 2</Link>
            </li>
          </ul>
        </nav>

        {/* Configuration des routes */}
        <div className="App-header">
          <Routes>
            <Route path="/exo1" element={<Exo1 />} />
            <Route path="/exo2" element={<Exo2 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
