import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Profile from "../../pages/Profile";
import Logo from "../../assets/logo.png";


function SideBar() {
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="px-8 ">
                    <li>
                        <Profile />
                    </li>
                    <Link to="/postform">
                        <li className="border-b-4 hover:bg-gray-300 p-2">Add Post</li>
                    </Link>
                    <Link to="/edituser">
                    <li className="border-b-4 hover:bg-gray-300 p-2">UPDATE PROFILE</li>
                    </Link>
                    <li className="border-b-4 hover:bg-gray-300 p-2">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
            </a>
                    </li>
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
        <div className="bg-black">
            <div className="bg-gray-100 sticky top-0 ">
                {!isClosed && (
                    <aside className="flex flex-col justify-center bg-white w-80 min-h-screen">
                        <div className="px-20 pb-10">
                            <img src={Logo} className="pt-5 " alt="Creative Square" />
                        </div>
                        <div className="border-r flex-grow ">
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
