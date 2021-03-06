import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME } from "../utils/queries";
import { Link } from "react-router-dom";


const FollowFeed = () => {
  const { loading, data } = useQuery(QUERY_ME);
//   console.log("query following data: " + userData);

const following = data?.me.following || [];
    // console.log("these are posts ", following[1].username);

  return (
    <div className="container pt-3">
      {/* {loading && <div>Loading...</div>} */}
      <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-1 lg:grid-cols-3 lg:gap-2 xl:grid-cols-3 pt-2">
        {
        following.map((follow) => 
        
        follow.posts.map((post)=>
        <div key={post._id} className="hover:opacity-80 bg-transparent rounded-lg border-4">
        <article className="hover:shadow-xl group">
          {/* <a href={post.postLink} target="_blank" rel="noreferrer"> */}
          {/* make link to single post page */}
          <Link to={`/post/${post._id}`}>
            <span className="block h-64 shadow leading-snug flex flex-wrap content-center">
              <img
                src={post.postPrimaryMedia}
                className="object-cover h-full w-max rounded-lg"
                alt="post"
              />
            </span>
          </Link>
          {/* </a> */}
        </article>
      </div>)




        )}
      </div>
    </div>
  );
};

export default FollowFeed;