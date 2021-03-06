import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';

import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <div>
      <div className="justify-content-center">
        <div className="grid grid-cols-2 gap-4 rounded-xl m-4 space-x-4 max-w-lg">
          <div className="col-span-2 content-center">
            <h2 className=" text-center p-3 text-xl font-sans rounded-xl rounded-b-none">LOGIN</h2>
          </div>
          <form className="col-span-2 " onSubmit={handleFormSubmit}>
            <div>
              <p className="w-full" htmlFor="email">Email address:</p>
            </div>
            <div>
              <input
                className=" w-full focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-50 text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-3"
                placeholder="youremail@test.com"
                name="email"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="pwd">Password:</label>
            </div>
            <div>
              <input
                className=" w-full focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-50 text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-3"
                placeholder="******"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            {
              error ? <div>
                <p className="" >The provided credentials are incorrect</p>
              </div> : null
            }
            <div className="">
              <button className="border rounded-xl py-1 px-5 bg-blue-700 text-white mt-4 mb-2" type="submit">
                Login
          </button>
              <div>
                {/* <Link to="/signup">
                  ← Go to Signup
                </Link> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Login;
