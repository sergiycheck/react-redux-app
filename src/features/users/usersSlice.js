import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit';

const initialState = [
	{id:nanoid(),name:'Stephanie',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/5.jpg"},
	{id:nanoid(),name:'Julie',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/6.jpg"},
	{id:nanoid(),name:'Terrence ',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/7.jpg"},
	{id:nanoid(),name:'Bradley ',isOnline:false,img:"https://randomuser.me/api/portraits/med/men/5.jpg"},
	{id:nanoid(),name:'Regina ',isOnline:true,img:"https://randomuser.me/api/portraits/med/women/8.jpg"},
	{id:nanoid(),name:'Dana ',isOnline:false,img:"https://randomuser.me/api/portraits/med/women/9.jpg"},
];

const usersSlice = createSlice({
	name:'users',
	initialState,
	reducers:{

	}

});

export default usersSlice.reducer;