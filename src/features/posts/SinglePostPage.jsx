import React from "react";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButton } from "./ReactionButton";
import { Loader } from "./Loader";
import { useGetPostQuery } from "../../api/apiSlice";

export const SinglePost = ({ match }) => {
  //for react router
  const { postId } = match.params;
  const {
    data: response,
    isLoading,
    isSuccess,
    isError,
  } = useGetPostQuery(postId);

  let content;
  if (isLoading) {
    content = <Loader></Loader>;
  } else if (isSuccess) {
    const { post } = response;
    content = (
      <article className="post">
        <div className="d-flex justify-content-between align-items-center">
          <h3>{post.title}</h3>
          <TimeAgo timeStamp={post.date}></TimeAgo>
          <button className="btn btn-danger">X</button>
        </div>

        <p className="post-content">{post.content}</p>

        <div className="d-flex justify-content-between">
          <PostAuthor userId={post.user}></PostAuthor>

          <ReactionButton post={post}></ReactionButton>
        </div>
      </article>
    );
  } else if (isError) {
    content = (
      <section>
        <h2>Post with id {postId} is not found</h2>
      </section>
    );
  }

  return <section>{content}</section>;
};
