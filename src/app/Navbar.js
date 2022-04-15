import React from "react";
import { Link } from "react-router-dom";
import { allUsersRoute } from "../api/ApiRoutes";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNotifications,
  selectAllNotifications,
} from "../features/notifications/notificationsSlice";
import { notificationsRoute } from "../api/ApiRoutes";

export const Navbar = () => {
  const dispatch = useDispatch();

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications());
  };

  const allNotifications = useSelector((state) =>
    selectAllNotifications(state)
  );

  let numUnreadNotifications = allNotifications.filter(
    (n) => n.read === false
  ).length;

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
