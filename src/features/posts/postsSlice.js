import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';
import {sub} from 'date-fns'; 

const initialState = [
	{id:nanoid(),
		date:sub(new Date(),{minutes:62}).toISOString(),
		reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
		title:'first title',content:'first content'},
	{id:nanoid(),
		date:sub(new Date(),{minutes:17}).toISOString(),
		reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
		title:'second title',content:'second content'},
]

const postsSlice = createSlice({
	name:'posts',
	initialState,
	reducers:{

    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content,userId) {
        return {
          payload: {
            id: nanoid(),
            title,
						date:new Date().toISOString(),
            content,
						reactions: {
              thumbsUp: 0,
              hooray: 0,
              heart: 0,
              rocket: 0,
              eyes: 0,
            },
						userId:userId
          }
        }
      }
    },
		//createSlice lets us write "mutating" logic in our reducers.
		reactionAdded(state,action){
			const {postId,reaction} = action.payload;
			const existingPost = state.find(post=>post.id===postId);
			if(existingPost){
				existingPost.reactions[reaction]++;
			}
		},

		postDeleted(state,action){
			const {postId} = action.payload;
			const existingPost = state.find(post=>post.id===postId);
			if(existingPost){
				state.pop(existingPost);
			}
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
export const {
	postAdded,
	postUpdated,
	reactionAdded,
	postDeleted} = postsSlice.actions;

export default postsSlice.reducer;