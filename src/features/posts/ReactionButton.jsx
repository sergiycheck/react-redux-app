import React from 'react';

import {useDispatch} from 'react-redux';
import {reactionAdded} from './postsSlice';


const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀'
}

export  const ReactionButton = ({post})=>{

	const dispatch = useDispatch();


	const reactionButtons = Object.entries(reactionEmoji)
		.map(([name,emoji])=>{

			return(
			<button key={name} 
				onClick={()=>
					dispatch(reactionAdded({
						postId:post.id,
						reaction:name
					}))}
				className="muted-button reaction-button">

				{emoji} {post.reactions[name]}
			</button>
			)

		});
		
	return(
		<div>
			{reactionButtons}
		</div>
	)
}