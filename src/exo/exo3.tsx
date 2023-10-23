import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserList from './components/userstype';
import UserProfile from './components/userprofile';
import "../App.css"

const Exo3: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path=":id" element={<UserProfile />} />
    </Routes>
  );
}

export default Exo3;
