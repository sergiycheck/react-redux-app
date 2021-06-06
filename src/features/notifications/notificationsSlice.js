import {
	createSlice, 
	nanoid,
	createAsyncThunk } from '@reduxjs/toolkit';
import {sub} from 'date-fns'; 
import { client } from '../../api/client';
import {
	notificationsName,
	notificationPrefix,
	notificationsApiRoute,
	StatusData
} from '../ApiRoutes';


const fetchNotifications = createAsyncThunk(
	notificationPrefix,

	//pass getState inside object
	
	// - The second argument to our payload creator is a thunkAPI object
	// containing several useful functions and pieces of information
	//the actual dispatch and getState methods from our Redux store
	// - extra is some kind of API wrapper, that knows how to make api calls
	// - requestId id for this thunk call. for tracking status of an individual request
	// - signal AbortController.signal func that can be used to cancel 
	//an in-progress request
	// - rejectWithValue a utility that helps to customize the contents of a rejected
	// action if the thunks receives an error



	async (_,{getState})=>{
		console.log('getState passed as obj', getState);
		const allNotifications = selectAllNotifications(getState());

		console.log('allNotifications', allNotifications);

		//computed property here??
		const [latestNotifications] = allNotifications;

		console.log('latestNotifications', latestNotifications);

		const latestTimestamp = 
			latestNotifications? latestNotifications.date:'';

		const notifObjResponse = await client.get(
			`${notificationsApiRoute}?since=${latestTimestamp}`
		);
		return notifObjResponse.notifications;

	}
)

const initialState = {
	notificationItems:[],
	status:StatusData.idle,
	error:null
}
const notificationsSlice = createSlice({
	name:notificationsName,
	initialState,
	reducers:{},
	extraReducers:{
		//computed property
		[fetchNotifications.fulfilled]:(state,action)=>{

			console.log(
				'notificationsSlice extra reducers fetchNotifications.fulfilled state and action', 
				state, action);

			state.status = StatusData.succeeded;
			state.notificationItems = 
				state.notificationItems.concat(...action.payload);
			
			//sort newest notifications (mutates the existing array)
			state.notificationItems.sort((a,b)=>{
				return b.date.locateCompare(a.date);
			})
		}
	}

})

export default notificationsSlice.reducer;

export const selectAllNotifications = (state) => {

	console.log('selectAllNotifications state', state);
	return state.notifications.notificationItems
};