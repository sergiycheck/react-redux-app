import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { selectUserById } from './usersSlice';
import {
	selectAllPosts,selectPostsByUser
} from '../posts/postsSlice';
import {singlePostRoute} from '../ApiRoutes';




//match is the path of the component
export const SingleUserPage = ({match})=>{

	const {userId} = match.params;
	const user = useSelector(state => selectUserById(state,userId));

	//useSelector always returns a new array reference 
	// component will re-render every time
	
	// const allUserPosts = useSelector(state=>{
	// 	const allPosts = selectAllPosts(state);
	// 	return allPosts.filter(post=>post.user == userId);
	// });

	//component will not re-render this time because 
	// of using memoized selector functions
	
	const allUserPosts = useSelector(state=> selectPostsByUser(state,userId));


	if(user){
		
		return(
			<section>
				<h2>{user.name} posts</h2>
				<ul>
					{allUserPosts.map(post=>(
						<li key={post.id}>
							<Link 
							// to={`/posts/${post.id}`}
							to={singlePostRoute.replace(":postId",`${post.id}`)}
							className={`p-2`} >{post.title}</Link>
					
						</li>
						))}
				</ul>
			</section>
		)

	}else{
		return(
			<section>
				<div>No user with such id {userId}</div>
			</section>
		) 
		
	}


	

}