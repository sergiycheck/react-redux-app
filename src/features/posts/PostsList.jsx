import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButton } from './ReactionButton'

import {
  // selectAllPosts,
  fetchPosts,
  selectPostIds,
  selectPostById,
  fetchPostComments,
} from './postsSlice';

import { StatusData } from '../ApiRoutes';
import { singlePostRoute, editPostRoute } from '../ApiRoutes';

//Now, if we try clicking a reaction button on one of the posts while capturing
//a React component performance profile,
//we should see that only that one component re-rendered:

export const PostsList = () => {
  const dispatch = useDispatch()

  const orderedPostIds = useSelector((state) => selectPostIds(state))

  const postsStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postsStatus === StatusData.idle) {
      console.log('fetching posts')
      dispatch(fetchPosts())
    }
  }, [postsStatus, dispatch]) //run on value of passed array change

  let content
  if (postsStatus === StatusData.loading) {
    content = <Loader></Loader>
  } else if (postsStatus === StatusData.succeeded) {
    console.log('postsStatus StatusData.succeeded')

    // const orderedPosts = posts.slice()
    // .sort((a,b)=>b.date.localeCompare(a.date));

    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId}></PostExcerpt>
    ))
  } else if (postsStatus === StatusData.failed) {
    content = <div>{error}</div>
  }

  return (  
		<React.Fragment>
			<h3>Posts</h3>
			{content}
		</React.Fragment>
  )
}

export const Loader = () => {
  return <div className="loader">Loading...</div>
}

export let PostExcerpt = ({ postId }) => {
  const dispatch = useDispatch()
  const post = useSelector((state) => selectPostById(state, postId))

  const getPostComments = async () => {
    await dispatch(fetchPostComments(postId))
  }

  return (
    <article className="post-excerpt">
      <div className="d-flex justify-content-between">
        <h3>{post.title}</h3>
        <TimeAgo timeStamp={post.date}></TimeAgo>
      </div>

      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link
        // to={`/posts/${post.id}`}
        to={singlePostRoute.replace(':postId', `${post.id}`)}
        className="button muted-button"
      >
        view post
      </Link>
      <button onClick={getPostComments} className="button muted-button">
        getPostComments
      </button>
      <Link
        // to={`/editPost/${post.id}`}
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
  )
}
//PostExcerpt = React.memo(PostExcerpt);// re-renders only selected post

//in order to re-render only post that dispatches addReaction is to
// have our reducer keep a separate array of IDs for all the posts,
//and only modify that array when posts are added or removed
//and do the same rewrite of PostsList and PostExcerpt
// This way PostList only  needs to re-render when the ids in array changes
//react toolkit has a createEntityAdapter func to do that
