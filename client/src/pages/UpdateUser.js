import React, { useState } from "react";
import { useMutation, useQuery} from "@apollo/react-hooks";
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth"

const EditUser = () => {

  const [formState, setFormState] = useState({
    username: "",
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
    data.append("upload_preset", "post-image");
    data.append("cloud_name", process.env.CLOUD_NAME);
    fetch("https://api.cloudinary.com/v1_1/dbnxp1386/image/upload", {
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

  const [updateUser, { error }] = useMutation( UPDATE_USER, {
    update(cache, { data: { updateUser } }) { 
      console.log(updateUser)
      // Currently will get the data correctly but will not update current user
      try {
        cache.readQuery({ query: QUERY_USER });
        cache.modify({
          query: QUERY_USER,
          data: {updateUser},
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
    const userId = Auth.getProfile().data._id
    try {
      // edit user in database
      // added in the id for user through Auth and grabbed profilePic though the profilePicUpload function after upload button click
      await updateUser({
        variables: { ... formState, _id:userId, profilePic:imageUrl }
      });
      
    } catch (err) {
      console.error(err);
    }
   
  };

  return (
    <div>
      <form className="inline-grid" onSubmit={handleFormSubmit}>
        <ul>
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
              onClick={() => profilePicUpload()}
            >
              upload
            </button>
          </div>
          {imageUrl !== "" && (
            <img 
            className="" 
            alt= "profile-pic-preview"
            height = "300px"
            width = "300px"
            src={imageUrl}
            /> 
          )}
          <li className="text-lg font-bold">UserName</li>
          <input
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">First Name</li>
          <input
            name="firstName"
            type="text"
            value={formState.firstName}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Last Name</li>
          <input
            name="lastName"
            type="text"
            value={formState.lastName}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Bio</li>
          <textarea
            name="bio"
            type="text"
            value={formState.bio}
            onChange={handleChange}
          ></textarea>
          <li className="text-lg font-bold">Creator Type</li>
          <input
            name="creatorType"
            type="text"
            value={formState.creatorType}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Creator</li>
          <input
            name="creator"
            type="text"
            value={formState.creator}
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

export default EditUser;