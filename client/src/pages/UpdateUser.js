import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

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

  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      console.log(updateUser)
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
    const userId = Auth.getProfile().data._id
    try {
      // edit user in database
      // added in the id for user through Auth and grabbed profilePic though the profilePicUpload function after upload button click
      await updateUser({
        variables: { ...formState, _id: userId, profilePic: imageUrl }
      });

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  UPDATE PROFILE
                </h3>

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
                        alt="profile-pic-preview"
                        height="300px"
                        width="300px"
                        src={imageUrl}
                      />
                    )}
                    <li className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">UserName</li>
                    <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                      <input
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <li className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">First Name</li>

                    <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                      <input
                        name="firstName"
                        type="text"
                        value={formState.firstName}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <li className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">Last Name</li>
                    <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                      <input
                        name="lastName"
                        type="text"
                        value={formState.lastName}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <li className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">Bio</li>
                    <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                      <textarea
                        name="bio"
                        type="text"
                        value={formState.bio}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <li className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">Creator Type</li>
                    <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                      <input
                        name="creatorType"
                        type="text"
                        value={formState.creatorType}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <li className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">Creator</li>
                    <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                      <input
                        name="creator"
                        type="text"
                        value={formState.creator}
                        onChange={handleChange}
                      ></input>
                    </div>
                    <li>
                      <button className="mb-1 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" type="submit">Submit</button>
                    </li>
                  </ul>
                </form>
                <Link to="/">
                  <button type="cancel" className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancel
                      </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;