import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserById } from './usersSlice';
import { singlePostRoute } from '../../api/ApiRoutes';
import { createSelector } from '@reduxjs/toolkit';
import { useGetPostsQuery } from '../../api/apiSlice';

export const SingleUserPage = ({ match }) => {
  const { userId } = match.params;
  const user = useSelector((state) => selectUserById(state, userId));

  const selectPostsForUser = useMemo(() => {
    const emptyArray = [];
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res) => res.data,
      (res, userId) => userId,
      (data, userId) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
    );
  }, []);

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      // We can optionally include the other metadata fields from the result here
      ...result,
      // Include a field called `postsForUser` in the hook result object,
      // which will be a filtered list of posts
      postsForUser: selectPostsForUser(result, userId),
    }),
  });

  if (!user)
    return (
      <section>
        <div>No user with such id {userId}</div>
      </section>
    );

  return (
    <section>
      <h2>{user.name} posts</h2>
      <ul>
        {postsForUser.map((post) => (
          <li key={post.id}>
            <Link
              to={singlePostRoute.replace(':postId', `${post.id}`)}
              className={`p-2`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
