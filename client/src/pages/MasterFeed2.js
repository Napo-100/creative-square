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
    <div className="mt-6">
      {posts.map((post) => (
        <div key={post._id} className="pl-12 flex flex-col">
          <div className="px-12 pt-4">
            <div className="max-w-lg border-4">
              <div className="grid grid-cols-1 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                {post.postMediaType === "Image" && (
                  
                  <div className="col-span-3 row-span-4 p-1 m-1 flex justify-center">
                    <a href={`/post/${post._id}`}>
                      <img
                        src={post.postPrimaryMedia}
                        alt="Placeholder"
                        className="rounded-t-xl object-contain w-max max-h-96"
                      />
                    </a>
                  </div>
                )}
                {post.postMediaType === "Video" && (
                  <div className="col-span-3 row-span-4 p-1 m-1 justify-center">
                 <div className="flex justify-center bg-gray-900 rounded-lg">
                 {/* <a href="#">
                   <iframe
                     src={post.postPrimaryMedia}
                     className="rounded h-96"
                     style={{ width: "32rem" }}
                     alt="post"
                   />
                 </a> */}
                  <a href={`/post/${post._id}`}>
                 <video max-width="100%" max-height="100%" border-style="hidden" controls className="rounded h-96">
                   <source src={post.postPrimaryMedia} type="video/mp4" />
                   <source src={post.postPrimaryMedia} type="video/ogg" />
                 Your browser does not support the video tag.
                 </video>
                 </a>
                 </div>
               </div>
                )}
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
        </div>
      ))}
    </div>
  );
};

export default MasterFeed2;
