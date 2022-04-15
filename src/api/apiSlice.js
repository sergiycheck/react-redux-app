import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiName, postsName, usersName, notificationsName } from "./ApiRoutes";

//create separate API slices for each server

//define out single api slice object
export const apiSlice = createApi({
  // the cache reducer expect to be added at `state.spi` ( already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `/${apiName}` }),

  endpoints: (builder) => ({
    getPosts: builder.query({
      // the url for the request is '/fakeApi/posts'
      query: () => ({
        url: `/${postsName}`,
        method: "GET",
      }),
    }),
    getUsers: builder.query({
      // the url for the request is '/fakeApi/posts'
      query: () => `/${usersName}`,
    }),
    getNotifications: builder.query({
      // the url for the request is '/fakeApi/posts'
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

export const { useGetPostsQuery, useGetUsersQuery, useGetNotificationsQuery } =
  apiSlice;
