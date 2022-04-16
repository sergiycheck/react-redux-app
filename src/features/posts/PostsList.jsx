import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButton } from './ReactionButton';
import { singlePostRoute, editPostRoute } from '../../api/ApiRoutes';
import {
  useGetAddPostCommentsMutation,
  useGetPostsQuery,
} from '../../api/apiSlice';
import { Loader } from './Loader';
import classnames from 'classnames';

export const PostsList = () => {
  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.date.localeCompare(a.date));
    return sortedPosts;
  }, [posts]);

  let content;
  if (isLoading) {
    content = <Loader></Loader>;
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post}></PostExcerpt>
    ));

    const containerClassname = classnames('posts-container', {
      disabled: isFetching,
    });

    content = <div className={containerClassname}>{renderedPosts}</div>;
  } else if (isError) {
    content = <div>{error}</div>;
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-auto">
          <h3>Posts</h3>
        </div>
        <div className="col-auto">
          <div className="d-flex">
            <button className="btn btn-primary" onClick={refetch}>
              refetch posts
            </button>
          </div>
        </div>
      </div>

      {content}
    </React.Fragment>
  );
};

export let PostExcerpt = ({ post }) => {
  const [getAddPostComments, { isLoading, isSuccess, isError }] =
    useGetAddPostCommentsMutation();

  const getPostCommentsHandler = async () => {
    const result = await getAddPostComments(post.id).unwrap();
  };

  return (
    <article className="post-excerpt">
      <div className="d-flex justify-content-between">
        <h3>{post.title}</h3>
        <TimeAgo timeStamp={post.date}></TimeAgo>
      </div>

      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link
        to={singlePostRoute.replace(':postId', `${post.id}`)}
        className="button muted-button"
      >
        view post
      </Link>
      <button onClick={getPostCommentsHandler} className="button muted-button">
        getPostComments
      </button>
      <Link
        to={editPostRoute.replace(':postId', `${post.id}`)}
        className="button muted-button"
      >
        edit post
      </Link>
      <div className="d-flex justify-content-between">
        <PostAuthor userId={post.user}></PostAuthor>

        <ReactionButton post={post}></ReactionButton>
      </div>
    </article>
  );
};
//PostExcerpt = React.memo(PostExcerpt);// re-renders only selected post

//in order to re-render only post that dispatches addReaction is to
// have our reducer keep a separate array of IDs for all the posts,
//and only modify that array when posts are added or removed
//and do the same rewrite of PostsList and PostExcerpt
// This way PostList only  needs to re-render when the ids in array changes
//react toolkit has a createEntityAdapter func to do that
