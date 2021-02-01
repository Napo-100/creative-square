import React, { useState } from "react";
import { useMutation} from "@apollo/react-hooks";
import { UPDATE_USER } from "../utils/mutations";
import { QUERY_ME_PROFILE } from "../utils/queries";
import Auth from "../utils/auth"

const EditUser = () => {

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    creatorType: "",
    bio: "",
    creator: false,
  });

  const [updateUser, { error }] = useMutation( UPDATE_USER, {
    update(cache, { data: { updateUser } }) { 
      try {
        cache.readQuery({ query: QUERY_ME_PROFILE });
        cache.writeQuery({
          query: QUERY_ME_PROFILE,
          data: { user: { updateUser } },
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
    try {
      // edit user in database
      await updateUser({
        variables: { ... formState }
      });
      
    } catch (err) {
      console.error(err);
    }
   
  };

  return (
    <div>
      <form className="inline-grid" onSubmit={handleFormSubmit}>
        <ul>
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
          <li className="text-lg font-bold">UserName</li>
          <input
            name="username"
            type="text"
            value={formState.username}
            onChange={handleChange}
          ></input>
          <li className="text-lg font-bold">Bio</li>
          <input
            name="bio"
            type="text"
            value={formState.bio}
            onChange={handleChange}
          ></input>
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