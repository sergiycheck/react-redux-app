import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";


//the Redux store should only contain 
//data that's considered "global" for the application!
export default configureStore({
  reducer:{
    posts:postsReducer,
    users:usersReducer
  }
})
