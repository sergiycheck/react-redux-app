import React, {useState} from 'react';

import {useDispatch,useSelector} from 'react-redux';

import {postUpdated} from './postsSlice';

import {useHistory} from 'react-router-dom';

export const EditPostForm = ({match})=>{
	const { postId } = match.params

	const posts = useSelector(state=>state.posts);
	const post = posts.find(post=>post.id===postId);

	const [title,setTitle] = useState(post.title);
	const [content,setContent] = useState(post.content);
	const dispatch = useDispatch();
	const history  = useHistory();

	const onTitleChanged = (event)=>{
		setTitle(event.target.value);
	}
	const onContentChanged = (event)=>{
		setContent(event.target.value);
	}

	const savePostClicked=()=>{
		if(title&&content){
			dispatch(postUpdated({
				id:postId,
				title:title,
				content:content
			}));
			setTitle('');
			setContent('');
			//redirect to singlePost page
			history.push(`/posts/${postId}`)
		}

	}

  return (
    <section>
      <h2>Edit post</h2>
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
        <button
					onClick={savePostClicked}
					type="button">Save Post</button>
      </form>
    </section>
  )
}