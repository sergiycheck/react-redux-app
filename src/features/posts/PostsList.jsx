import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { PostAuthor } from "./PostAuthor";
import {TimeAgo} from './TimeAgo';
import { ReactionButton } from "./ReactionButton";

export const PostsList = ()=>{

	const posts = useSelector(state=>state.posts);
	const orderedPosts = posts.slice().sort((a,b)=>b.date.localeCompare(a.date));

	const renderPosts = orderedPosts.map(post=>(
		<article className="post-excerpt" key={post.id}>
			<div className="d-flex justify-content-between">
				<h3>{post.title}</h3>
				<TimeAgo timeStamp={post.date}></TimeAgo>
			</div>
		
			<p className="post-content">
				{post.content.substring(0,100)}
			</p>
			<Link to={`/posts/${post.id}`}  className="button muted-button">
				view post
			</Link>
			<Link to={`/editPost/${post.id}`}  className="button muted-button">
				edit post
			</Link>
			<div className="d-flex justify-content-between">
				<PostAuthor userId={post.userId} ></PostAuthor>
				
				<ReactionButton post={post}></ReactionButton>
			</div>
			
		</article>

	));
	return(
		<section className="posts-list">
			<h3>Posts</h3>
			{renderPosts}
		</section >
		

	)

}