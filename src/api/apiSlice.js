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

    getNotifications: builder.query({
      query: () => `/${notificationsName}`,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useEditPostMutation,

  useGetNotificationsQuery,
} = apiSlice;
