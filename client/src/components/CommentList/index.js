import React from "react";
import { Link } from "react-router-dom";

{
  /* <div className="bg-white rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-4">
<div className="flex flex-row justify-center mr-2">

<h3 className="text-purple-600 font-semibold text-lg text-center md:text-left ">@Shanel</h3>

</div>

<p style={{width:"90%"}} className="text-gray-600 text-lg text-center md:text-left ">Hi good morning will it be the entire house. </p>


</div> */
}

const CommentList = ({ comments }) => {
  console.log(comments);
  if (!comments.length) {
    return <div></div>;
  }

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-white rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-4"
          >
            <div className="flex flex-row justify-center mr-2">
              <h3 className="text-purple-600 font-semibold text-lg text-center md:text-left ">
                {comment.username}
              </h3>
            </div>

            <p
              style={{ width: "90%" }}
              className="text-gray-600 text-lg text-center md:text-left "
            >
              {comment.commentText}{" "}
            </p>
          </div>
        ))}
    </div>
  );
};

export default CommentList;
