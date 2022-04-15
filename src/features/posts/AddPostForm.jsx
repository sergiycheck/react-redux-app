import React, {useState} from 'react';

import {useDispatch,useSelector} from 'react-redux';

import {
  //postAdded
  addNewPost
} from './postsSlice';
import {unwrapResult} from '@reduxjs/toolkit';
import {StatusData} from '../ApiRoutes';
import {selectAllUsers} from '../users/usersSlice'



export const AddPostForm = ()=>{

  // const users = useSelector(state=>state.users.userItems);
  const users = useSelector(state=>selectAllUsers(state))
  
	const dispatch = useDispatch();

	const [title,setTitle] = useState('');
	const [content,setContent] = useState('');
	const [userId,setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState(StatusData.idle);

	const onTitleChanged = (event)=>{
		setTitle(event.target.value);
	}
	const onContentChanged = (event)=>{
		setContent(event.target.value);
	}
  const onAuthorChanged = e =>setUserId(e.target.value);

  const canSave = 
  Boolean(title) &&
  Boolean(content) &&
  Boolean(userId) && 
  addRequestStatus===StatusData.idle;

	const savePostClicked= async()=>{

		if(canSave){
      try{
        setAddRequestStatus(StatusData.loading);

        const resultOfAddNewPost = await dispatch(
          addNewPost({title,content,user:userId}));
        
        //unwrapResult that will return either the actual action.payload value from a fulfilled action, 
        //or throw an error if it's the rejected action. 
        unwrapResult(resultOfAddNewPost)

        setTitle('');
        setContent('');
        setUserId('');

      }catch(err){
        console.error('Failed to save the post', err)
      }finally{
        setAddRequestStatus(StatusData.idle)
      }


		}

	}

  
  const userOptions = users.map(user=>(
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className='sticky-sm-top'>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select 
          value={userId}
          onChange={onAuthorChanged} 
          name="postAuthor" id="postAuthor">
            <option value=""></option>
            {userOptions}
        </select>
        <button
          disabled={!canSave}
					onClick={savePostClicked}
					type="button">Save Post</button>
      </form>
    </section>
  )
}