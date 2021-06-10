import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';

import './api/server';
import {fetchUsers} from './features/users/usersSlice';

import {selectPostsByUser,reactionAdded, addNewPost,fetchPosts} from './features/posts/postsSlice'

// we need only to fetch the list of users once, when the app starts 
store.dispatch(fetchUsers());
//custom fetch posts
store.dispatch(fetchPosts());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)



const state1 = store.getState()
// Output selector runs, because it's the first call
selectPostsByUser(state1, 'user1')
// Output selector does _not_ run, because the arguments haven't changed
selectPostsByUser(state1, 'user1')
// Output selector runs, because `userId` changed
selectPostsByUser(state1, 'user2')

store.dispatch(reactionAdded('tDPoaZD5QMb4zKLSultNx','thumbsUp'))
const state2 = store.getState()
// Output selector does not run, because `posts` and `userId` are the same
selectPostsByUser(state2, 'user2')

const testPost = {title:'testTitle',content:'TestContent',user:Date.now().toLocaleString()};
console.log('testPost ',testPost);
// Add some more posts
store.dispatch(addNewPost(testPost))
const state3 = store.getState()
// Output selector runs, because `posts` has changed
selectPostsByUser(state3, 'user2')

