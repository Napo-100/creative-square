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
        <ul className="sm:flex sm:flex-row sm:flex sm:flex-col px-8">
          <li>
            <Profile />
          </li>
          {!userData.me.firstName &&
            !userData.me.lastName &&
            !userData.me.profilePic ? (
              <Link to="/finishprofile">
                <li className="border-b-4 hover:bg-gray-300 p-2">
                  Finish your Profile!
              </li>
              </Link>
            ) : (
              <div className="flex flex-row flex-wrap justify-center sm:flex sm:flex-col">
                {/* this link goes to finishprofile temporarily, but will be /edituser when complete */}
                <Link to="/finishprofile">
                  <li className="border-b-4 hover:bg-gray-300 p-2">EditUser</li>
                </Link>
                <Link to="/postform">
                  <li className="border-b-4 hover:bg-gray-300 p-2">Add Post</li>
                </Link>
                <li className="border-b-4 hover:bg-gray-300 p-2">
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
  return (
    <div>
      <div className="bg-gray-100 sticky top-0 ">
      <div className=" p-2 ml-2 sm:px-20 sm:pb-10 w-10 sm:hidden">
            <img src={Logo} className="pt-5" alt="Creative Square" />
          </div>
        <aside className="flex flex-row sm:flex-col sm:justify-center bg-white sm:w-80 sm:min-h-screen pt-5 sm:pt-0">
          <div className=" p-2 ml-2 sm:px-20 sm:pb-10 hidden  sm:flex">
            <img src={Logo} className="pt-5" alt="Creative Square" />
          </div>
          <div className="border-r sm:flex-grow ">
            <nav>{showNavigation()}</nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SideBar;
