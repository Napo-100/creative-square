import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

const EditUser = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    profilePic: "",
    bio: "",
    creatorType: "",
    creator: false,
  });
  // Once image is placed into the input it will set the image into state
  const [image, setImage] = useState("");
  // The image will then be ready to append prior to upload to cloudinary cloud service
  const [imageUrl, setImageUrl] = useState("");

  // NOTE: Changed to mine for now to test but make sure that it is fixed by the end of it
  const profilePicUpload = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "profile-image");
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

  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      console.log(updateUser);
      // Currently will get the data correctly but will not update current user
      try {
        cache.readQuery({ query: QUERY_USER });
        cache.modify({
          query: QUERY_USER,
          data: { updateUser },
        });
      } catch (err) {
        console.error(err);
      }
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
    const userId = Auth.getProfile().data._id;
    try {
      // edit user in database
      // added in the id for user through Auth and grabbed profilePic though the profilePicUpload function after upload button click
      await updateUser({
        variables: { ...formState, _id: userId, profilePic: imageUrl },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shadow-md flex-auto max-w-sm p-10 pb-20 bg-blue-300">
      <h2 className="text-2xl text-center">Finish your profile!</h2>
      <form className="w-full" onSubmit={handleFormSubmit}>
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Upload Image
        </div>
        <div className="my-2 p-1 flex rounded">
          {" "}
          <input
            className="p-1 appearance-none outline-none w-full text-gray-800"
            name="profilePic"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />{" "}
          <button
            className="btn bg-green-900 rounded text-gray-200 px-3"
            type="submit"
            onClick={() => profilePicUpload()}
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
        {/* <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Username
        </div>
        <input
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        ></input> */}
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> First Name
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          {" "}
          <input
            name="firstName"
            type="text"
            value={formState.firstName}
            onChange={handleChange}
          ></input>
        </div>
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Last Name
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          <input
            name="lastName"
            type="text"
            value={formState.lastName}
            onChange={handleChange}
          ></input>
        </div>
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Bio
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          <textarea
            name="bio"
            type="text"
            value={formState.bio}
            onChange={handleChange}
          ></textarea>
        </div>
        {/* <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Creator
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          <input
            name="creator"
            type="text"
            value={formState.creator}
            onChange={handleChange}
          ></input>
        </div>
        <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
          <span className="text-red-400 mr-1">*</span> Creator Type
        </div>
        <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
          <input
            name="creatorType"
            type="text"
            value={formState.creatorType}
            onChange={handleChange}
          ></input>
        </div> */}
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

export default EditUser;
