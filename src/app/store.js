import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import notificationReducer from '../features/notifications/notificationsSlice';
import { apiSlice } from './../api/apiSlice';
import { loggerMiddleware } from './middewares';

//the Redux store should only contain
//data that's considered "global" for the application!
export default configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware).concat(apiSlice.middleware),
});
