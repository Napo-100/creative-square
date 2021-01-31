import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_POST } from "../utils/queries";

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
    <div>
      <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">
     
      <div className="flex flex-col md:flex-row overflow-hidden
                                        bg-white rounded-lg shadow-xl  mt-4 w-100 mx-2">
       
        <div className="h-64 w-auto md:w-1/2">
          <img className="inset-0 h-full w-full object-cover object-center" src={post.postPrimaryMedia} />
        </div>
        
        <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
          <h3 className="font-semibold text-lg leading-tight truncate">{ post.postDescription }</h3>
          <p className="mt-2">
            
          </p>
          <p className="text-sm text-gray-700 uppercase tracking-wide font-semibold mt-2">
            { post.username } &bull; { post.createdAt}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SinglePost;
