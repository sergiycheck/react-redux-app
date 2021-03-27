import React, {useState} from 'react';

import {useDispatch,useSelector} from 'react-redux';

import {postAdded} from './postsSlice';

export const AddPostForm = ()=>{

	const [title,setTitle] = useState('');
	const [content,setContent] = useState('');
	const [userId,setUserId] = useState('');

  const users = useSelector(state=>state.users);

	const dispatch = useDispatch();

	const onTitleChanged = (event)=>{
		setTitle(event.target.value);
	}
	const onContentChanged = (event)=>{
		setContent(event.target.value);
	}
  const onAuthorChanged = e =>setUserId(e.target.value);

	const savePostClicked=()=>{
		if(title&&content){
			dispatch(postAdded(title,content,userId));
			setTitle('');
			setContent('');
		}

	}
  const canSave = 
    Boolean(title)&&
    Boolean(content)&&
    Boolean(userId);
  
  const userOptions = users.map(user=>(
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
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