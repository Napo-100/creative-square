import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-0 bg-white z-10">
      <ul className="flex flex-row border-gray-300 py-2">
        <button className="border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md">
          <Link to="/">Home Feed</Link>
        </button>
        <button className="border-b-4 hover:bg-red-100 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/subscriptions">Subscriptions</Link>
        </button>
        <button className="border-b-4 hover:bg-gray-300 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/masterfeed">All posts</Link>
        </button>
        <button className="border-b-4 hover:bg-gray-300 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/featuredfeed">Featured posts</Link>
        </button>
      </ul>
    </div>
  );
};

export default Header;
