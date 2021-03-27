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
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content) {
        return {
          payload: {
            id: nanoid(),
            title,
            content
          }
        }
      }
    },

		postDeleted(state,action){
			state = state.filter(el=>el!==action.payload);
		},
		postUpdated(state,action){
			const {id,title,content} = action.payload;
			const existingPost = state.find(post=>post.id===id);
			if(existingPost){
				existingPost.title = title;
				existingPost.content = content;
			}
		}
	}
})
export const {postAdded,postUpdated} = postsSlice.actions;

export default postsSlice.reducer;