import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";

const AddPost = () => {
  // const [postMediaType, setPostMediaType] = useState("");
  // const [postDescription, setPostDescription] = useState("");
  // const [postLink, setPostLink] = useState("");
  // const [postPrimaryMedia, setPostPrimaryMedia] = useState("");
  // const [postSecondaryMedia, setPostSecondaryMedia] = useState("");
  // const [postPaywall, setPostPaywall] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [formState, setFormState] = useState({
    postMediaType: "",
    postDescription: "",
    postLink: "",
    postPrimaryMedia: "",
    postSecondaryMedia: "none",
    postPaywall: true,
  });

  const [image, setImage] = useState("");

  // NOTE: Changed to mine for now to test but make sure that it is fixed by the end of it
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
        setImageUrl(data.secure_url);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("hi", imageUrl);
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
    console.log("oh yeas", imageUrl);
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
        variables: {
          ...formState,
          postPrimaryMedia: imageUrl,
        },
      });
    } catch (err) {
      console.error(err);
    }
    window.alert(formState.postMediaType + " submited");
  };

  return (
    <div className="shadow-md flex-auto max-w-sm p-10 pb-20 bg-blue-300">
      <h2 className="text-2xl text-center">Create a Post!</h2>
      <div className="w-full">
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Upload Image
        </div>
        <div className="my-2 p-1 flex rounded">
          {" "}
          <input
            className="p-1 appearance-none outline-none w-full text-gray-800"
            name="postPrimaryMedia"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />{" "}
          <button
            className="btn bg-green-900 rounded text-gray-200 px-3"
            type="submit"
            onClick={() => postDetails()}
          >
            upload
          </button>
        </div>
          {imageUrl !== "" && (
          <img
            className=""
            alt="profile-pic-preview"
            height="300px"
            width="300px"
            src={imageUrl}
          />
        )}
      </div>
      <form onSubmit={handleFormSubmit}>
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
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
