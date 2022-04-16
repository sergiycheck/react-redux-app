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
  const [updatePost, { isLoading, isSuccess }] = useEditPostMutation();

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
    }
  };

  let postEditingRendered;
  if (isLoading) {
    postEditingRendered = <Loader></Loader>;
  } else if (isSuccess) {
    postEditingRendered = null;
    setTimeout(() => {
      history.push(`/posts/${post.id}`);
    });
  }

  return (
    <section>
      <div className="row align-items-start">
        <div className="col-auto position-relative">
          <h2>Edit post</h2>
          <div className="position-absolute edit-post-loader">
            {postEditingRendered}
          </div>
        </div>
      </div>

      <div className="row">
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
      </div>
    </section>
  );
};
