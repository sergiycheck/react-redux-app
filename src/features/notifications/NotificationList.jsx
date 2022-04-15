import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatDistanceToNow, parseISO } from "date-fns";

import {
  selectAllNotifications,
  allNotificationsRead,
} from "./notificationsSlice";
import { selectAllUsers } from "../users/usersSlice";
import classnames from "classnames";

export const NotificationList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allNotificationsRead());
  });

  const notifications = useSelector((state) => {
    return selectAllNotifications(state);
  });

  const users = useSelector((state) => {
    return selectAllUsers(state);
  });

  const notificationElements = notifications.map((notif) => {
    const notifDate = parseISO(notif.date);
    const whenCreated = formatDistanceToNow(notifDate);
    const notifCreator = users.find((user) => user.id === notif.user) || {
      name: "Unknown user",
    };

    const notificationClassname = classnames("notification", {
      ["new aboba"]: notif["isNew"],
    });

    return (
      <div key={notif.id} className={notificationClassname}>
        <div className="p-2">
          <b>{notifCreator.name}</b> <br />
          <p>{notif.message}</p>
        </div>
        <div title={notif.date}>
          <i>{whenCreated}</i>
        </div>
      </div>
    );
  });

  return (
    <section className="notificationList">
      <h2>Notifications</h2>
      {notificationElements}
    </section>
  );
};
