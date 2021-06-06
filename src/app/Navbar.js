import React from 'react';
import {Link} from 'react-router-dom';
import {allUsersRoute} from '../features/ApiRoutes';
import {useDispatch, useSelector} from 'react-redux';

import { 
  fetchNotifications,
  selectAllNotifications 
} from '../features/notifications/notificationsSlice'
import {notificationsRoute} from '../features/ApiRoutes'


export const Navbar = () => {

  const dispatch = useDispatch();

  const fetchNewNotifications = () =>{
    dispatch(fetchNotifications());
  }


  const allNotifications = useSelector(
    state=>selectAllNotifications(state));
  
  let numUnreadNotifications = 
    allNotifications.filter(n=>n.read===false).length;
  console.log(numUnreadNotifications);

  let unreadNotificationBadge;
  //hide badge if there is no new notifications
  if(numUnreadNotifications>0){
    unreadNotificationBadge = 
      <span className="badge bg-dark">{numUnreadNotifications}</span>
  }

  return (
    <nav>
      <section>
        <h1>Blogging</h1>

        <div className="navContent">
          <div className="navLinks">
          <Link to="/">Posts</Link>
          <Link to={`${allUsersRoute}`}>Users</Link>
          <Link to={notificationsRoute}>
            Notifications
            {unreadNotificationBadge}
            </Link>
          </div>

          <button
          onClick={fetchNewNotifications} 
          className="button"
          >Refresh notifications</button>

        </div>

      </section>
    </nav>
  )
}
