import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";

const AddPost = () => {
  const [formState, setFormState] = useState({
    postMediaType: "",
    postDescription: "",
    postLink: "",
    postPrimaryMedia: "",
    postSecondaryMedia: "",
    postPaywall: true,
  });

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { posts } = cache.readQuery({ query: QUERY_POSTS });
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, ...posts] },
        });
      } catch (err) {
        console.error(err);
      }

      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, posts: [addPost, ...me.posts] } },
      });
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add post to database
      await addPost({
        variables: { ...formState },
      });
    } catch (err) {
      console.error(err);
    }
   
  };

  return (
    <div>
      <form className="inline-grid" onSubmit={handleFormSubmit}>
        <ul>
          <li className="text-lg font-bold">Post Type</li>
          <input
            name="postMediaType"
            type="text"
            value={formState.postMediaType}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Post Description</li>
          <input
            name="postDescription"
            type="text"
            value={formState.postDescription}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Post Link</li>
          <input
            name="postLink"
            type="text"
            value={formState.postLink}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Post image or video</li>
          <input
            name="postPrimaryMedia"
            type="text"
            value={formState.postPrimaryMedia}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Post audio file</li>
          <input
            name="postSecondaryMedia"
            type="text"
            value={formState.postSecondaryMedia}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Post Paywall?</li>

          <input
            name="postPaywall"
            type="text"
            value={formState.postPaywall}
            onChange={handleChange}
          ></input>

          <li>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default AddPost;
