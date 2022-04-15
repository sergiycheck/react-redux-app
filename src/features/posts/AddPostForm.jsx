import React, { useState } from 'react';
import { useAddNewPostMutation, useGetUsersQuery } from '../../api/apiSlice';
import { Loader } from './Loader';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  // const users = useSelector((state) => selectAllUsers(state));
  const {
    data: users,
    isLoading: isLoadingUsers,
    isSuccess: isUsersLoadedSuccess,
  } = useGetUsersQuery();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const savePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({
          title,
          content,
          user: userId,
        }).unwrap();

        setTitle('');
        setContent('');
        setUserId('');
      } catch (err) {
        console.error('Failed to save the post', err);
      }
    }
  };

  let usersRenderedContent;
  if (isLoadingUsers) {
    usersRenderedContent = <Loader></Loader>;
  } else if (isUsersLoadedSuccess) {
    const userOptions = users.map((user) => (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    ));

    usersRenderedContent = (
      <select
        value={userId}
        onChange={onAuthorChanged}
        name="postAuthor"
        id="postAuthor"
      >
        <option value=""></option>
        {userOptions}
      </select>
    );
  }

  return (
    <section className="sticky-sm-top">
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
        {usersRenderedContent}
        <button disabled={!canSave} onClick={savePostClicked} type="button">
          Save Post
        </button>
      </form>
    </section>
  );
};
