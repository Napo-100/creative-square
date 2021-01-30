import React, { useState } from "react";
import Auth from "../../utils/auth";
import Login from "../../pages/Login"
import Signup from "../../pages/Signup";

function SideBar() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="px-8 ">
          <li className="p-2">CREATE POST</li>
          <li className="p-2">UPDATE PROFILE</li>
          <li className="p-2">
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
    <div className="bg-black ">
      <div className="bg-gray-100 sticky top-0">
        {!isClosed && (
          <aside className="bg-white w-80 min-h-screen flex flex-col">
            <h1 className="border border-double border-4 rounded-full bg-black text-white h-24 w-24 flex items-center justify-center py-2 font-bold px-8">
              Your Creative Square
            </h1>

            <div className="border-r flex-grow">
              <nav>{showNavigation()}</nav>
            </div>
          </aside>
        )}
        {isClosed ? (
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
        )}
      </div>
    </div>
  );
}

export default SideBar;
