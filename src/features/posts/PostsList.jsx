import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { PostAuthor } from "./PostAuthor";
import {TimeAgo} from './TimeAgo';
import { ReactionButton } from "./ReactionButton";

import {selectAllPosts,fetchPosts} from './postsSlice';
import {StatusData} from '../ApiRoutes';
import {
	singlePostRoute,
	editPostRoute} from '../ApiRoutes';

export const PostsList = ()=>{
	const dispatch = useDispatch();
	const postsStatus = useSelector(state=>state.posts.status);
	const posts = useSelector(selectAllPosts);
	const error = (useSelector(state=>state.posts.error));

	useEffect(()=>{
		if(postsStatus===StatusData.idle){
			dispatch(fetchPosts());
		}
	},[postsStatus,dispatch])//run on value of passed array change


	let content;
	if(postsStatus===StatusData.loading){
		content = <Loader></Loader>;
	}else if(postsStatus === StatusData.succeeded){

		const orderedPosts = posts.slice()
		.sort((a,b)=>b.date.localeCompare(a.date));

		content = orderedPosts.map(post=>(
			<PostExcerpt key={post.id} post={post}></PostExcerpt>
		));

	}else if(postsStatus===StatusData.failed){
		content = <div>{error}</div>
	}



	
	return(	
		<section className="posts-list">
			<h3>Posts</h3>
			{content}
		</section >
		

	)

}

export const Loader=()=>{
	return(
		<div className="loader">
			Loading...
		</div>
	)
}


export const PostExcerpt = ({post})=>{
	return (
		<article className="post-excerpt">
			<div className="d-flex justify-content-between">
				<h3>{post.title}</h3>
				<TimeAgo timeStamp={post.date}></TimeAgo>
			</div>
		
			<p className="post-content">
				{post.content.substring(0,100)}
			</p>
			<Link 
				// to={`/posts/${post.id}`}  
				to={singlePostRoute.replace(":postId",`${post.id}`)}
				className="button muted-button">
				view post
			</Link>
			<Link 
				// to={`/editPost/${post.id}`} 
				to={editPostRoute.replace(":postId",`${post.id}`)}
				className="button muted-button">
				edit post
			</Link>
			<div className="d-flex justify-content-between">
				<PostAuthor userId={post.user} ></PostAuthor>
				
				<ReactionButton post={post}></ReactionButton>
			</div>
			
		</article>
	)
}