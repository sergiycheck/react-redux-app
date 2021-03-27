import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "../features/posts/postsSlice";


//the Redux store should only contain 
//data that's considered "global" for the application!
export default configureStore({
  reducer:{
    posts:postsReducer
  }
})
