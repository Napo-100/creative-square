import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";

const AddPost = () => {
  const [formState, setFormState] = useState({
    postMediaType: "",
    postDescription: "",
    postLink: "",
    // postPrimaryMedia: "",
    postSecondaryMedia: "",
    postPaywall: true,
  });
  const [image, setImage] = useState("");

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "post-image");
    data.append("cloud_name", process.env.CLOUD_NAME);
    fetch("https://api.cloudinary.com/v1_1/creative-square/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    window.alert(formState.postMediaType + " submited");
  };

  return (
    <form
      className="shadow-md flex-auto max-w-sm p-10 pb-20 bg-blue-300"
      onSubmit={handleFormSubmit}
    >
      <h2 className="text-2xl text-center">Create a Post!</h2>
      <div className="w-full">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Media Type
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          {" "}
          <select
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            name="postMediaType"
            value={formState.postMediaType}
            onChange={handleChange}
          >
            <option>choose media type...</option>
            <option>Image</option>
            <option>Video</option>
            <option>Audio</option>
          </select>{" "}
        </div>
      </div>
      <div className="w-full">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Post Description
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          {" "}
          <input
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            name="postDescription"
            type="text"
            value={formState.postDescription}
            onChange={handleChange}
          />{" "}
        </div>
      </div>
      <div className="w-full">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> External URL
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          {" "}
          <input
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            name="postLink"
            type="text"
            value={formState.postLink}
            onChange={handleChange}
          />{" "}
        </div>
      </div>
      <div className="w-full">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Upload Image
        </div>
        <div className="my-2 bg-indigo-400 p-1 flex rounded">
          {" "}
          <input
            className="p-1 appearance-none outline-none w-full text-gray-800"
            name="postPrimaryMedia"
            type="file"
            value={formState.postPrimaryMedia}
            onChange={(e)=>setImage(e.target.files[0])} 
          />{" "}
        </div>
      </div>
      {/* <div className="w-full">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Upload Video
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          {" "}
          <input
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            name="postPrimaryMedia"
            type="upload"
            value={formState.postPrimaryMedia}
            onChange={handleChange}
          />{" "}
        </div>
      </div> */}
      <div className="w-full">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Upload Audio File
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          {" "}
          <input
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
            name="postSecondaryMedia"
            type="upload"
            value={formState.postSecondaryMedia}
            onChange={handleChange}
          />{" "}
        </div>
      </div>
      <div className="w-full">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> post paywall
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          {" "}
          <input
            name="postPaywall"
            type="text"
            value={formState.postPaywall}
            onChange={handleChange}
          />{" "}
        </div>
      </div>
      <div className="mt-6 relative">
        <button
          className="shadow-md font-medium py-2 px-4 bg-green-500 text-gray-100
                  cursor-pointer bg-teal-600 rounded text-lg tr-mt  absolute text-center w-full"
          type="submit"
          onClick={() => postDetails()}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddPost;
