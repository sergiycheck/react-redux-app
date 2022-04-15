import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiName, postsName, usersName, notificationsName } from "./ApiRoutes";

//create separate API slices for each server

//define out single api slice object
export const apiSlice = createApi({
  // the cache reducer expect to be added at `state.spi` ( already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `/${apiName}` }),
  tagTypes: ["Post"],

  endpoints: (builder) => ({
    getPosts: builder.query({
      // the url for the request is '/fakeApi/posts'
      query: () => ({
        url: `/${postsName}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),

    //you can use the same query hook multiple times,
    // pass it different query parameters, and each result will be cached separately in the Redux store.
    getPost: builder.query({
      // the query parameter must be a single value!
      query: (postId) => `/${postsName}/${postId}`,
    }),

    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: `/${postsName}`,
        method: "POST",
        body: { post: initialPost },
      }),
      invalidatesTags: ["Post"],
    }),
    getUsers: builder.query({
      query: () => `/${usersName}`,
    }),
    getNotifications: builder.query({
      query: () => `/${notificationsName}`,
    }),
  }),
});

//export the auto-generated hook for the getPosts query endpoint

//RTK Query's React integration will automatically generate React hooks
//for every endpoint we define!

//encapsulate the process of triggering a request when a component mounts,
// and re-rendering the component as the request is processed and data is available

// the type of the endpoint Query or Mutation

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddNewPostMutation,
  useGetUsersQuery,
  useGetNotificationsQuery,
} = apiSlice;
