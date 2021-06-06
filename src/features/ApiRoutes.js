export const StatusData = {
	loading:'loading',
	succeeded:'succeeded',
	failed:'failed',
	idle:'idle'
}


const apiName = 'fakeApi';
export const postsName = 'posts';
export const postsRoute = `${apiName}/${postsName}`;
export const singlePostRoute = `/posts/:postId`;
export const editPostRoute = `/editPost/:postId`;

export const getAllPostsPrefix = `${postsName}/fetchPosts`
export const addPostPrefix= `${postsName}/addNewPost`;


export const usersName = 'users';

export const allUsersRoute =`/${usersName}`;
export const singleUserPageRoute = `${allUsersRoute}/:userId`;

export const usersRoute = `${apiName}/${usersName}`;

export const notificationsName = 'notifications';
export const notificationsRoute = `/${notificationsName}`;
export const notificationsApiRoute = `/${apiName}/${notificationsName}`;

export const notificationPrefix = `${notificationsName}/fetchNotifications`