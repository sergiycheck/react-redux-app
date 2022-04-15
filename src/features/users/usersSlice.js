import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

import { usersName, usersRoute, StatusData } from '../ApiRoutes'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
  status: StatusData.idle,
  error: null,
})

export const fetchUsers = createAsyncThunk(
  `${usersName}/fetchUsers`,
  async () => {
    const response = await client.get(usersRoute)
    console.log('got response', response)
    return response.users
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = StatusData.succeeded
      //state.userItems = state.userItems.concat(action.payload);
      console.log('got users', action)
      usersAdapter.upsertMany(state, action.payload)
    },
  },
})

export default usersSlice.reducer

// export const selectAllUsers = (state) => state.users.userItems;
// export const selectUserById = (state,userId) =>
// 	state.users.userItems.find(user=>user.id === userId);

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users)
