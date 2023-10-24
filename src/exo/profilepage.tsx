import React from 'react';
import { useUser } from './components/usercontext';

const ProfilePage = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Veuillez vous connecter.</div>;
  }

  return (
    <div>
      <h2>Profil</h2>
      <p>ID de l'utilisateur : {user.uid}</p>
      <p>Email : {user.email}</p>
    </div>
  );
}

export default ProfilePage;
