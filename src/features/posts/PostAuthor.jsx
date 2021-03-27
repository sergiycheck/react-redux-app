import React from 'react';
import {useSelector} from 'react-redux';

export const PostAuthor = ({ userId })=>{

	const author = useSelector(state=>
		state.users.find(user=>user.id===userId));
	
		return(
			<div>
			{author?
					<div className="m-3 d-flex ">

					<img className="mx-2"
						style={{height:'50px',width:'50px'}} 
						src={author.img} alt={`${author.name}+${author.id}`}/>
						
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