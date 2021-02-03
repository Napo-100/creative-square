import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_POSTS } from "../utils/queries";
import { Link } from "react-router-dom";

const MasterFeed = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  console.log(data);

  const posts = data?.posts || [];
  console.log("these are posts ", posts);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="container pt-3">
      {/* {loading && <div>Loading...</div>} */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4  p-2">
        {posts.map((post) => (
          <div key={post._id} className="hover:bg-indigo-500">
            <article className="hover:shadow-xl group">
              {/* <a href={post.postLink} target="_blank" rel="noreferrer"> */}
              {/* make link to single post page */}
              <Link to={`/post/${post._id}`}>
                <span className="block h-64 relative rounded shadow leading-snug">
                  {post.postMediaType === "Image" && (
                    <img
                      src={post.postPrimaryMedia}
                      className="w-full h-full rounded absolute"
                      alt="post"
                    />
                  )}
                  {post.postMediaType === "Video" && (
                    <iframe
                      src={post.postPrimaryMedia}
                      className="w-full h-full rounded absolute"
                      alt="post"
                    />
                  )}
                </span>
              </Link>
              {/* </a> */}
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterFeed;
