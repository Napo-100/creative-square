import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_POSTS } from "../utils/queries";
import { Link } from "react-router-dom";
import ReactionPanel from "../components/PostInteraction";

const MasterFeed2 = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  console.log(data);

  const posts = data?.posts || [];
  console.log("these are posts ", posts);

  return (
    <div className="flex flex-col justify-center">
        {posts.map((post) => (
          <div key={post._id} className="mx-auto flex flex-col">
              
        
        <div className="px-12 pt-12">

        <div className="max-w-lg border-4">
          <div
            class="grid grid-cols-1 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div class="col-span-3 row-span-4 p-1 m-1 justify-center">
              <a href={`/post/${post._id}`}>
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
            </div>
          </div>
        </div>
      </div>



   
    
          </div>
        ))}
      
    </div>
  );
};

export default MasterFeed2;
