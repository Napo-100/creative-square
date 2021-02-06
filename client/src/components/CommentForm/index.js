import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_COMMENT } from "../../utils/mutations";


const CommentForm = ({ postId }) => {
  const [commentText, setText] = useState("");

  const [addComment, { error }] = useMutation(ADD_COMMENT)
         
    

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
    }
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addComment({
        variables: { commentText, postId },
      });

      // clear form value
      setText("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form action="/" method="post" onSubmit={handleFormSubmit}>
      <input type="hidden" />
      <textarea
        className="ml-4 w-full shadow-inner p-4 border-0 mb-4 rounded-lg shadow-lg focus:outline-none focus:shadow-outline hover:shadow-xl text-2xl px-8"
        placeholder="Tell me I'm beautiful here."
        value={commentText}
        cols="6"
        rows="3"
        id="comment_content"
        onChange={handleChange}
      ></textarea>
      <button
        className="ml-4 font-bold py-2 px-4 w-full bg-purple-400 hover:bg-purple-500 text-lg text-white shadow-md rounded-lg "
        type="submit"
      >
        Comment{" "}
      </button>
    </form>
  );
};

export default CommentForm;
