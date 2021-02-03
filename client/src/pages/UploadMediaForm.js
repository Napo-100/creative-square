import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../utils/queries";
import { Link, useHistory } from "react-router-dom";
import AddImagePost from "../components/AddImagePost";
import AddVideoPost from "../components/AddVideoPost";

const UploadMediaForm = () => {
  //   const history = useHistory();

  const [postMediaType, setPostMediaType] = useState("Choose Media Type...");

  // NOTE: Changed to mine for now to test but make sure that it is fixed by the end of it

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setPostMediaType({
      postMediaType,
      [name]: value,
    });
  };

  console.log(postMediaType);
  return (
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h2 className="text-2xl text-center">
                    {postMediaType === "Choose Media Type..." && (
                      <div>Create a Post!</div>
                    )}
                    {postMediaType === "Image" && <div>Post Image</div>}
                    {postMediaType === "Video" && <div>Post Video</div>}
                    {postMediaType === "Audio" && <div>Post Audio</div>}
                  </h2>
                  <div className="w-full">
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                      <span className="text-red-400 mr-1">*</span> Select Media
                      Type
                    </div>
                    <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                      {" "}
                      <select
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                        name="postMediaType"
                        value={postMediaType.postMediaType}
                        onChange={handleChange}
                      >
                        <option>Choose Media Type...</option>
                        <option>Image</option>
                        <option>Video</option>
                        <option>Audio</option>
                      </select>{" "}
                    </div>
                    {postMediaType.postMediaType === "Image" && (
                      <AddImagePost
                        postMediaType={postMediaType.postMediaType}
                      />
                    )}
                    {postMediaType.postMediaType === "Video" && (
                      <AddVideoPost
                        postMediaType={postMediaType.postMediaType}
                      />
                    )}
                    {postMediaType.postMediaType === "Audio" && (
                      <AddImagePost
                        postMediaType={postMediaType.postMediaType}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {postMediaType.postMediaType === "Choose Media Type..." && (
              <Link to="/">
                <button
                  type="cancel"
                  className="mt-4 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMediaForm;
