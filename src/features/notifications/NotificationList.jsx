import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {formatDistanceToNow, parseISO} from 'date-fns';

import {
	selectAllNotifications,
	fetchNotifications,
	allNotificationsRead,

} from './notificationsSlice';
import {selectAllUsers} from '../users/usersSlice';
import {StatusData} from '../ApiRoutes';
import classnames from 'classnames';


export const NotificationList = () =>{

	const dispatch = useDispatch();

	const notificationsStatus = useSelector(
		state=>{
			//console.log('state inside useSelector', state);
			return state.notifications.status
		});

	// useEffect(()=>{
	// 	if(notificationsStatus === StatusData.idle){
	// 		dispatch(fetchNotifications())
	// 	}
	// },[notificationsStatus,dispatch])

	useEffect(()=>{
		console.log('useEffect dispatch allNotificationsRead')
		dispatch(allNotificationsRead());
	})

	
	const notifications = useSelector((state)=>{
		return selectAllNotifications(state)
	});

	const users = useSelector((state)=>{
		return selectAllUsers(state);
	})

	const notificationElements = notifications.map((notif)=>{
		const notifDate = parseISO(notif.date)
		const whenCreated = formatDistanceToNow(notifDate);
		const notifCreator = users.find(user=>user.id == notif.user) || {
			name:"Unknown user"
		};

		const notificationClassname = classnames('notification',{
			new: notif.isNew
		})

		return(
			<div key={notif.id} className={notificationClassname}>
				<div className="p-2">
					<b>{notifCreator.name}</b> <br />
					<p>{notif.message}</p>
				</div>
				<div title={notif.date}>
					<i>{whenCreated}</i>
				</div>
			</div>
		)

	})

	return (
		<section className="notificationList">
			<h2>Notifications</h2>
			{notificationElements}
		</section>
	)

}
