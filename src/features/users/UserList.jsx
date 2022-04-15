import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { selectAllUsers } from './usersSlice';
import {singleUserPageRoute} from '../ApiRoutes';


export const UsersList = () => {

	const users = useSelector(state=>selectAllUsers(state));

	const renderedUsers = users.map(user=>(
		<li key={user.id}>
			<Link 
				// to={`/users/${user.id}`}
				to={singleUserPageRoute.replace(":userId",`${user.id}`)}
			>{user.name}</Link>
		</li>
	))

	return (
		<section>
			<h2>Users</h2>
			<ul>
				{renderedUsers}
			</ul>
		</section>
	)



}