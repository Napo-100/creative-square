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
      <div className="p-12">

        <div className="max-w-lg border-4">
          <div
            class="grid grid-cols-1 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div class="col-span-3 row-span-4 p-1 m-1 justify-center">
              <a href="#">
                <img
                  src={post.postPrimaryMedia}
                  alt="Placeholder"
                  class="rounded-t-xl object-contain w-max max-h-96"
                />
              </a>
            </div>
            <ul
              style={{ overflow: "hidden" }}
              class="flex flex-row pl-2 text-gray-600 overflow-x-scroll hide-scroll-bar">

              <ReactionPanel post={post} />

            </ul>

            <div class="col-span-3 row-span-1">
              <div class="flex align-bottom flex-col leading-none p-2 md:p-4">
                <div class="flex flex-row justify-between items-center">
                  <a
                    class="flex items-center no-underline hover:underline text-black"
                    href="#"
                  >
                    <img
                      alt="Placeholder"
                      style={{ height: "32px", width: "32px" }}
                      class="block rounded-full"
                      src="https://picsum.photos/640/400/?random"
                    />
                    <span class="ml-2 text-sm"> {post.username} </span>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-span-3 row-span-1">
              <header
                class="flex items-center justify-between leading-tight p-2 md:p-4"
              >
                <p class="text-sm">

                  {post.postDescription}

                </p>

              </header>
            </div>

            <div class="col-span-3 row-span-1">
              <p class="text-grey-darker text-xs p-2 md:p-4">{post.createdAt}</p>

              {/* <ul
       style={{overflow: "hidden"}}
        class="flex flex-row pl-2 text-gray-600 overflow-x-scroll hide-scroll-bar"
      >
        <li class="py-1">
          <div
            class="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800"
          >
            <a class="" href="#">#hogehoge</a>
          </div>
        </li>
        <li class="py-1">
          <div
            class="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800"
          >
            <a class="" href="#">#fugafuga</a>
          </div>
        </li>

        <li class="py-1">
          <div
            class="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800"
          >
            <a class="" href="#">#foofoo</a>
          </div>
        </li>
        <li class="py-1">
          <div
            class="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800"
          >
            <a class="" href="#">#barbarbar</a>
          </div>
        </li>
        <li class="py-1">
          <div
            class="transition duration-300 ease-in-out rounded-2xl mr-1 px-2 py-1 hover:bg-blue-200 text-gray-500 hover:text-gray-800"
          >
            <a class="" href="#">#hogefugafoo</a>
          </div>
        </li>
      </ul> */}
            </div>
          </div>
        </div>
      </div>



      <section className="rounded-b-lg ml-3 max-w-lg pl-12 pt-12" id="comment-section">
        
      <CommentForm postId={postId} />
      <CommentList comments={post.comments} />
         

        
      </section>

    </div>




  );
};

export default SinglePost;
