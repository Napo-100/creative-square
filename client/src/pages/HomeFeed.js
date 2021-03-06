import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";

const HomeFeed = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const posts = data?.me.posts || [];

  return (
    <div className="container pt-3">
      {/* {loading && <div>Loading...</div>} */}
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-1 lg:grid-cols-3 lg:gap-2 xl:grid-cols-3 pt-2">
        {posts.map((post) => (
          <div
            key={post._id}
            className="hover:opacity-80 bg-transparent rounded-lg border-4"
          >
            <article className="hover:shadow-xl group">
              {/* <a href={post.postLink} target="_blank" rel="noreferrer"> */}
              {/* make link to single post page */}
              <Link to={`/post/${post._id}`}>
                <span className="block h-64 relative rounded shadow leading-snug flex justify-center">
                  {post.postMediaType === "Image" && (
                    <img
                      src={post.postPrimaryMedia}
                      className="object-cover h-full w-max rounded-lg"
                      alt="post"
                    />
                  )}
                  {post.postMediaType === "Video" && (
                    <video
                      max-width="100%"
                      max-height="100%"
                      controls
                      autoplay
                      muted
                      className="object-cover rounded-lg"
                    >
                      <Link to={`/post/${post._id}`}></Link>
                      <source src={post.postPrimaryMedia} type="video/mp4" />
                    </video>
                  )}
                  {post.postMediaType === "Audio" && (
                    <span>
                      <img
                        src={post.postSecondaryMedia}
                        className="object-cover h-56 w-max rounded-lg"
                        alt="post"
                      />
                      <audio controls className="h-8 w-full">
                        {" "}
                        <Link to={`/post/${post._id}`}></Link>
                        <source src={post.postPrimaryMedia} type="audio/mpeg" />
                      </audio>
                    </span>
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

export default HomeFeed;
