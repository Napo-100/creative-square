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
                  Create a Post!
            </h3>
                <div>
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
                        <span className="text-red-400 mr-1">*</span> Image
          </div>
                      <div className="my-2 bg-white p-1 flex border border-gray-200 rounded">
                        {" "}
                        <input
                          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                          name="postPrimaryMedia"
                          type="text"
                          value={formState.postPrimaryMedia}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;


{/* <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
  <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
    ADD POST
                        </button>
  <button type="cancel" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
    Cancel
                      </button> */}