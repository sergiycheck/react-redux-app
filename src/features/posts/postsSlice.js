import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';

const initialState = [
	{id:nanoid(),title:'first title',content:'first content'},
	{id:nanoid(),title:'second title',content:'second content'},
]

const postsSlice = createSlice({
	name:'posts',
	initialState,
	reducers:{
		postAdded(state,action){
			state.push(action.payload);
		},
		postDeleted(state,action){
			state = state.filter(el=>el!==action.payload);
		},
		postEdited(state,action){
			
		}
	}
})
export const {postAdded} = postsSlice.actions;

export default postsSlice.reducer;