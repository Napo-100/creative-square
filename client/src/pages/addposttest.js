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
                  ADD NEW POST
            </h3>
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
                    </ul>
                    <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                        ADD POST
                        </button>
                      <button type="cancel" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Cancel
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
