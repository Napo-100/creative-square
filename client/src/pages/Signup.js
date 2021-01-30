import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup() {
  const [formState, setFormState] = useState({ username: '', email: '', password: '', creator: false });
  const [addUser] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState }
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="justify-content-center">
        <div className="grid grid-cols-2 gap-4 border border-color-black rounded-xl border-8  m-4 space-x-4 max-w-lg">
          <div className="col-span-2 content-center">
          <h2 className="bg-black text-white text-center p-3 text-xl font-sans rounded-xl rounded-b-none">SIGNUP</h2>
            </div>
            <form className="col-span-2 p-3" onSubmit={handleFormSubmit}>
              <div className="">
                <label htmlFor="firstName">User-Name:</label>
                <input
                  className=" w-full focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-50 text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-3"
                  placeholder="Your username"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label htmlFor="email">Email:</label>
                <input
                  className=" w-full focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-50 text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-3"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className="">
                <label htmlFor="pwd">Password:</label>
                <input
                  className=" w-full focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-50 text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-3"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div className="">
              <button className="border rounded-xl py-1 px-5 bg-blue-700 text-white mt-4 mb-2" type="submit">
                  Submit
          </button>
                <div>
                  {/* <Link to="/login">
                    ← Go to Login
      </Link> */}
                </div>
              </div>
            </form>
          </div>
          </div>
        </div>
  );

}

export default Signup;
