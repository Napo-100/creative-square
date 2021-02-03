import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 bg-white z-50">
      <ul className="flex flex-row border-gray-300 py-2">
        <li className="border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md">
          <Link to="/">For You</Link>
        </li>
        <li className="border-b-4 hover:bg-red-100 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/following">Following</Link>
        </li>
        <li className="border-b-4 hover:bg-gray-300 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/homefeed">My Posts</Link>
        </li>
        <li className="border-b-4 hover:bg-gray-300 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/featuredfeed">Featured posts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
