import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { useAddNewPostMutation } from "../../api/apiSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const users = useSelector((state) => selectAllUsers(state));

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

        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post", err);
      }
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

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
        <select
          value={userId}
          onChange={onAuthorChanged}
          name="postAuthor"
          id="postAuthor"
        >
          <option value=""></option>
          {userOptions}
        </select>
        <button disabled={!canSave} onClick={savePostClicked} type="button">
          Save Post
        </button>
      </form>
    </section>
  );
};
