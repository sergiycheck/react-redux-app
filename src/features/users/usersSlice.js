import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';
import { usersName } from '../../api/ApiRoutes';
import { createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/${usersName}`,
      transformResponse: (responseData) => {
        return usersAdapter.setAll(initialState, responseData);
      },
    }),
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;

export const selectUsersResult = apiSlice.endpoints.getUsers.select();

export const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => {
    return usersResult.data;
  }
);

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state, userId) => userId,
//   (users, userId) => users.find((user) => user.id === userId)
// );

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
