import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isClosed, setClosed] = React.useState(false);

  return (
    <div className="flex flex-col">
      <input className="w-full h-16 px-3 rounded sm:mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-xl" type="search" placeholder="Search..." />
      <span>
        <div className="sm:hidden">
          {isClosed ? (
            <button id="nav-toggle"
              className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-white sm:hidden" onClick={() => setClosed(false)}>
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              ></svg>
              MENU
            </button>
          ) : (
              <button id="nav-toggle"
                className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-white sm:hidden" onClick={() => setClosed(true)}>
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
                CLOSE
              </button>
            )}



          <button onClick={() => setClosed(true)}></button>
          {!isClosed && (
            <ul className="text-sm sm:text-lg sm:font-black border-gray-300  py-2">
              <Link to="/">
                <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-blue-100 p-2 sm:px-5 py-3 border-black shadow-md sm:w-50">
                  For You Grid
        </button>
              </Link>
              <Link to="/following">
                <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-50">
                  Following
        </button>
              </Link>
              <Link to="/homefeed">
                <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-50">
                  My Posts
        </button>
              </Link>
              <Link to="/featuredfeed">
                <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-50">
                  Featured posts
        </button>
              </Link>
              <Link to="/masterfeed2">
                <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-50">
                  For You Singles
        </button>
              </Link>
            </ul>
          )}

        </div>
      </span>
      <div className="sticky top-0 bg-white z-10 flex flex-row flex-wrap justify-center sm:justify-start flex-grow hidden sm:flex">


        <ul className="text-sm sm:text-lg sm:font-black border-gray-300  py-2">
          <Link to="/">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-blue-100 p-2 sm:px-5 py-3 border-black shadow-md sm:w-50">
              For You Grid
        </button>
          </Link>
          <Link to="/following">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-50">
              Following
        </button>
          </Link>
          <Link to="/homefeed">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-50">
              My Posts
        </button>
          </Link>
          <Link to="/featuredfeed">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-50">
              Featured posts
        </button>
          </Link>
          <Link to="/masterfeed2">
            <button className="text-xs sm:text-lg sm:font-bold border-b-2 sm:border-b-4 hover:bg-red-100 p-2 sm:px-5 py-3 border-black shadow-md ml-1 sm:w-50">
              For You Singles
        </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
