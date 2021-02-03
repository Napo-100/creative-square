import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 bg-white z-10">
      <ul className="flex flex-row border-gray-300 py-2">
        <Link to="/">
          <button className="border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md">
            Home Feed
          </button>
        </Link>
        <Link to="/subscriptions">
          <button className="border-b-4 hover:bg-red-100 p-2 px-5 py-3 border-black shadow-md ml-1">
            Subscriptions
          </button>
        </Link>
        <Link to="/masterfeed">
          <button className="border-b-4 hover:bg-gray-300 p-2 px-5 py-3 border-black shadow-md ml-1">
            All posts
          </button>
        </Link>
        <Link to="/featuredfeed">
          <button className="border-b-4 hover:bg-gray-300 p-2 px-5 py-3 border-black shadow-md ml-1">
            Featured posts
          </button>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
