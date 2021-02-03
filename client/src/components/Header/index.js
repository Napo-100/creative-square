import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../../src/utils/auth";

const Header = () => {
  return (
    <div className="sticky top-0 bg-white z-10 flex flex-row flex-wrap justify-center sm:justify-start flex-grow">
      {Auth.loggedIn() ? (
        <ul className="text-sm sm:text-lg sm:font-black border-gray-300  py-2">
          <Link to="/">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-blue-100 p-2 sm:px-5 py-3 border-black shadow-md sm:w-52">
              Home Feed
          </button>
          </Link>
          <Link to="/subscriptions">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-52">
              Subscriptions
          </button>
          </Link>
          <Link to="/masterfeed">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-gray-300 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-52">
              All posts
          </button>
          </Link>
          <Link to="/featuredfeed">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-gray-300 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-52">
              Featured posts
          </button>
          </Link>
        </ul>
      ) : (
          <div>
            <ul className="flex flex-row border-gray-300 flex-nowrap py-2 h-10">
            
          </ul>
          </div>
        )}
    </div>
  );
};

export default Header;
