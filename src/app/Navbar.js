import React from 'react';
import { Link } from 'react-router-dom';
import { allUsersRoute } from '../api/ApiRoutes';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchNotificationsWebsocket,
  selectNotificationsMetadata,
  useGetNotificationsQuery,
} from '../features/notifications/notificationsSlice';
import { notificationsRoute } from '../api/ApiRoutes';

export const Navbar = () => {
  const dispatch = useDispatch();

  // Trigger initial fetch of notifications and keep the websocket open to receive updates
  useGetNotificationsQuery();

  const notificationsMetadata = useSelector(selectNotificationsMetadata);
  const numUnreadNotifications = notificationsMetadata.filter(
    (n) => !n.read
  ).length;

  const fetchNewNotifications = () => {
    dispatch(fetchNotificationsWebsocket());
  };

  let unreadNotificationBadge;
  //hide badge if there is no new notifications
  if (numUnreadNotifications > 0) {
    unreadNotificationBadge = (
      <span className="badge bg-dark">{numUnreadNotifications}</span>
    );
  }

  return (
    <nav>
      <section className="p-2">
        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to={`${allUsersRoute}`}>Users</Link>
            <Link to={notificationsRoute}>
              Notifications
              {unreadNotificationBadge}
            </Link>
            <button onClick={fetchNewNotifications} className="button">
              Refresh notifications
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
};
