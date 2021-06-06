import React from 'react';
import {useSelector} from 'react-redux';
import { PostAuthor } from "./PostAuthor";
import {TimeAgo} from './TimeAgo';

import {useDispatch} from 'react-redux';

import {
	postDeleted,
	selectPostById} from './postsSlice';

import { ReactionButton } from "./ReactionButton";
import {useHistory} from 'react-router-dom';

export const SinglePost = ({ match })=>{
	
	//for react router
	const { postId } = match.params
	const dispatch = useDispatch();

	const history  = useHistory();

	const post = useSelector(state=>selectPostById(state,postId));

	const deletePost=()=>{
		if(post && post.id){
			dispatch(postDeleted({
				postId:post.id
			}));
			history.push(`/`);
		}

	};
	
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
				<div className="d-flex justify-content-between">
					<h3>{post.title}</h3>
					<TimeAgo timeStamp={post.date}></TimeAgo>
					<button
						onClick={deletePost} 
						className="btn btn-danger">
						X
					</button>
				</div>

				<p className="post-content">{post.content}</p>

				<div className="d-flex justify-content-between">
					<PostAuthor userId={post.user} ></PostAuthor>
					
					<ReactionButton post={post}></ReactionButton>
				</div>
			</article>
		</section>
	);

}