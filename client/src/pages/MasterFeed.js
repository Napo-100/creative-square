import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_POSTS } from "../utils/queries";


const HomeFeed = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  console.log(data)

  const posts = data?.posts || [];
  console.log("these are posts ", posts);

  return (
    <div className="container">
      {/* {loading && <div>Loading...</div>} */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4 border-2 border-blue-300 p-2">
        {posts.map((post) => (
          <div key={post._id} className="hover:bg-indigo-500">
            <article className="hover:shadow-xl group">
              {/* <a href={post.postLink} target="_blank" rel="noreferrer"> */}
              {/* make link to single post page */}
                <span className="block h-64 relative rounded shadow leading-snug">
                  <img
                    src={post.postPrimaryMedia}
                    className="w-full h-full rounded absolute"
                    alt="post"
                  />
                </span>
              {/* </a> */}
            </article>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeFeed;
