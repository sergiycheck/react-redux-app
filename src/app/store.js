import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../features/notifications/notificationsSlice';
import { apiSlice } from './../api/apiSlice';
import { loggerMiddleware } from './middewares';

//the Redux store should only contain
//data that's considered "global" for the application!
export default configureStore({
  reducer: {
    notifications: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware).concat(apiSlice.middleware),
});
