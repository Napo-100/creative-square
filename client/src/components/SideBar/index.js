import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Profile from "../../pages/Profile";
import Logo from "../../assets/logo.png";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME_PROFILE } from "../../utils/queries";

function SideBar() {
  const { loading, data: userData } = useQuery(QUERY_ME_PROFILE);
  console.log(userData);

  function showNavigation() {
    if (loading) {
      return <div>loading...</div>;
    }
    if (Auth.loggedIn()) {
      return (
        <ul className="flex flex-row sm:flex-col sm:px-8 ">
          <li>
            <Profile />
          </li>
          {!userData.me.firstName &&
            !userData.me.lastName &&
            !userData.me.profilePic ? (
              <Link to="/finishprofile">
                <li className=" border-b-4 hover:bg-gray-300 p-2">
                  Finish your Profile!
              </li>
              </Link>
            ) : (
              <div>
                {/* this link goes to finishprofile temporarily, but will be /edituser when complete */}
                <Link to="/finishprofile">
                  <li className="text-xs sm:text-lg sm:border-b-4 hover:bg-gray-300 p-2">EditUser</li>
                </Link>
                <Link to="/postform">
                  <li className="text-xs sm:text-lg sm:border-b-4 hover:bg-gray-300 p-2">Add Post</li>
                </Link>
                <li className="text-xs sm:text-lg sm:border-b-4 hover:bg-gray-300 p-2">
                  {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                  <a href="/" onClick={() => Auth.logout()}>
                    Logout
                      </a>
                </li>
              </div>


            )}

        </ul>
      );
    } else {
      return (
        <ul className="">
          <li className="">
            <Login />
          </li>
          <li className="">
            <Signup />
          </li>
        </ul>
      );
    }
  }

  const [isClosed, setClosed] = React.useState(false);
  return (
    <div className="">
      <div className="sm:sticky sm:top-0 shadow-md">
        {!isClosed && (
          <aside className="flex sm:flex-col flex-row justify-center w-80 sm:min-h-screen">
            <div className="px-10 sm:px-20 pb-10 w-auto">
              <img src={Logo} className="pt-5 " alt="Creative Square" />
            </div>
            <div className="border-r sm:flex-grow ">
              <nav>{showNavigation()}</nav>
            </div>
          </aside>
        )}
        {/* {isClosed ? (
          <button
            id="nav-toggle"
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
            onClick={() => setClosed(false)}
            title="Open Menu"
            tabIndex="1"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        ) : (
          <button
            title="Close Menu"
            tabIndex="1"
            onClick={() => setClosed(true)}
          >
            X
          </button>
        )} */}
      </div>
    </div>
  );
}

export default SideBar;
