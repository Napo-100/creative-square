import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_POST } from "../utils/queries";
import ReactionPanel from "../components/PostInteraction";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });

  const post = data?.post || {};
  console.log(post);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    //className="flex flex-row"
    <div className="flex flex-col">
      <div className="px-12 pt-4">
        <div className="max-w-lg border-4">
          <div className="grid grid-cols-1 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="col-span-3 row-span-4 p-1 m-1 justify-center">
              {post.postMediaType === "Video" && (
                <div className="flex justify-center">
                  <a href="#">
                    <iframe
                      src={post.postPrimaryMedia}
                      className="rounded h-96"
                      style={{ width: "32rem" }}
                      alt="post"
                    />
                  </a>
                </div>
              )}
              {post.postMediaType === "Image" && (
                <div className="flex justify-center">
                  <a href="#">
                    <img
                      src={post.postPrimaryMedia}
                      alt="Placeholder"
                      className="rounded-t-xl object-contain w-max max-h-96"
                    />
                  </a>
                </div>
              )}
            </div>

            <ul
              style={{ overflow: "hidden" }}
              className="flex flex-row pl-2 text-gray-600 overflow-x-scroll hide-scroll-bar"
            >
              <ReactionPanel post={post} />
            </ul>

            <div className="col-span-3 row-span-1">
              <div className="flex align-bottom flex-col leading-none p-2 md:p-4">
                <div className="flex flex-row justify-between items-center">
                  <a
                    className="flex items-center no-underline hover:underline text-black"
                    href="#"
                  >
                    <img
                      alt="Placeholder"
                      style={{ height: "32px", width: "32px" }}
                      className="block rounded-full"
                      src="https://picsum.photos/640/400/?random"
                    />
                    <span className="ml-2 text-sm"> {post.username} </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-3 row-span-1">
              <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                <p className="text-sm">{post.postDescription}</p>
              </header>
            </div>

            <div className="col-span-3 row-span-1">
              <p className="text-grey-darker text-xs p-2 md:p-4">
                {post.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section
        className="rounded-b-lg ml-3 max-w-lg pl-12 pt-12"
        id="comment-section"
      >
        <CommentForm postId={postId} />
        <CommentList comments={post.comments} />
      </section>
    </div>
  );
};

export default SinglePost;
