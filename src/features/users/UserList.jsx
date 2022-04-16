import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers } from './usersSlice';
import { singleUserPageRoute } from '../../api/ApiRoutes';

export const UsersList = () => {
  const users = useSelector((state) => selectAllUsers(state));

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={singleUserPageRoute.replace(':userId', `${user.id}`)}>
        {user.name}
      </Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  );
};
