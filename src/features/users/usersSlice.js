
import {
	createSlice, 
	nanoid,
	createAsyncThunk } from '@reduxjs/toolkit';

import { client } from '../../api/client';

import {usersName,usersRoute,StatusData} from '../ApiRoutes';




export const fetchUsers = 
	createAsyncThunk(`${usersName}/fetchUsers`,async()=>{
		const response = await client.get(usersRoute);
		console.log('got response',response);
		return response.users;
})

const initialState = {
	userItems:[],
	status:StatusData.idle,
	error:null
}

const usersSlice = createSlice({
	name:'users',
	initialState,
	reducers:{

	},
	extraReducers:{
		[fetchUsers.fulfilled]: (state,action)=>{
			state.status = StatusData.succeeded;
			state.userItems = state.userItems.concat(action.payload);
			
			console.log('state.userItems',state.userItems);
		}
	}

});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.userItems;
export const selectUserById = (state,userId) => 
	state.users.userItems.find(user=>user.id === userId);





