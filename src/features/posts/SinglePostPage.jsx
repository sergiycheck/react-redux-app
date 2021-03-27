import React from 'react';
import {useSelector} from 'react-redux';

export const SinglePost = ({ match })=>{
	//for react router
	const { postId } = match.params

	const posts = useSelector(state=>state.posts);
	const post = posts.find(post=>post.id===postId);
	
	if(!post){
		return(
			<section>
				<h2>Post with id {postId} is not found</h2>
			</section>
		)
	}

	return(
		<section>
			<article className="post">
				<h2>{post.title}</h2>
				<p className="post-content">{post.content}</p>
			</article>
		</section>
	);

}