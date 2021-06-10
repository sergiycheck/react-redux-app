import React from 'react';
import {useSelector} from 'react-redux';

import {selectUserById} from '../users/usersSlice'

export const PostAuthor = ({ userId })=>{

	// const author = useSelector(state=>
	// 	state.users.userItems.find(user=>user.id===userId));

	const author = useSelector(state=>selectUserById(state,userId))
	
		return(
			<div>
			{author?
					<div className="m-3 d-flex ">
					{author?.img?
						<img className="mx-2"
						style={{height:'50px',width:'50px'}} 
						src={author.img} alt={`${author.name}+${author.id}`}/>
						:
						<span></span>
					}
					
						
					<div 
						className={author.isOnline?
						'bg-success rounded-circle':
						'bg-dark rounded-circle'}
							style={{height:'20px',width:'20px'}}>
					</div>
		
					<div style={{marginLeft:'auto'}}>
						<h5>{author.name}</h5>
					</div>
		
				</div> :
				<span>Unknown author</span>
			}
			</div>

		)

}