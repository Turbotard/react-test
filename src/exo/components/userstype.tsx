import React from 'react';
import usersDataRaw from '../users.json';
import { Link } from 'react-router-dom';
import '../../App.css'

type User = {
  id: number;
  name: string;
  age: number;
  job: string;
};

const usersData: User[] = usersDataRaw as User[];

const UserList: React.FC = () => {
  return (
    <div>
      {usersData.map(user => (
        <Link to={`/exo3/${user.id}`} key={user.id} className="user-card">
          <div>{user.name}</div>
        </Link>
      ))}
    </div>
  );
}

export default UserList;
