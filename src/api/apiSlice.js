import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiName, postsName, notificationsName } from './ApiRoutes';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `/${apiName}` }),
  tagTypes: ['Post'],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `/${postsName}`,
        method: 'GET',
      }),
      providesTags: (result = {}, error, arg) => {
        const posts = result;
        return ['Post', ...posts.map(({ id }) => ({ type: 'Post', id }))];
      },
    }),
    getPost: builder.query({
      query: (postId) => `/${postsName}/${postId}`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),
    getAddPostComments: builder.mutation({
      query: (postId) => `/${postsName}/${postId}/comments`,
      providesTags: (result, error, arg) => [{ type: 'Post', id: arg }],
    }),

    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: `/${postsName}`,
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: (post) => ({
        url: `/${postsName}/${post.id}`,
        method: 'PATCH',
        body: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }],
    }),

    addReaction: builder.mutation({
      query: ({ postId, reaction }) => ({
        url: `/${postsName}/${postId}/reactions`,
        method: 'POST',
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { reaction },
      }),
      //arg is object of the arguments passed to this query
      // invalidatesTags: (result, error, arg) => [
      //   { type: 'Post', id: arg.postId },
      // ],

      async onQueryStarted({ postId, reaction }, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            // The `draft` is Immer-wrapped and can be "mutated" like in createSlice
            const post = draft.find((post) => post.id === postId);
            if (post) {
              post.reactions[reaction]++;
            }
          })
        );
        try {
          const requestResult = await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetAddPostCommentsMutation,
  useAddNewPostMutation,
  useEditPostMutation,
  useAddReactionMutation,
} = apiSlice;
