import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useGetPostQuery, useEditPostMutation } from '../../api/apiSlice';
import { Loader } from './Loader';

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;
  const {
    data: response,
    isLoading: isSinglePostLoading,
    isSuccess,
  } = useGetPostQuery(postId);

  if (isSinglePostLoading) {
    return <Loader></Loader>;
  } else if (isSuccess) {
    const post = response;
    if (post) return <EditPost post={post}></EditPost>;
  }

  return (
    <section>
      <h2>post with id {postId} was not found</h2>
    </section>
  );
};

export const EditPost = ({ post }) => {
  const [updatePost, { isLoading }] = useEditPostMutation();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const savePostClicked = async () => {
    if (title && content) {
      await updatePost({
        id: post.id,
        title: title,
        content: content,
      });

      history.push(`/posts/${post.id}`);
    }
  };

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
          rows={9}
          onChange={onContentChanged}
        />
        <button onClick={savePostClicked} type="button">
          Save Post
        </button>
      </form>
    </section>
  );
};
