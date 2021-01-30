import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <ul className="flex flex-row mt-2  border-gray-300 border-b-2 py-2">
        <li className="px-5 py-3 border border-l-4 border-black m-l-1 shadow-md">
          <Link to="/">Home Feed</Link>
        </li>
        <li className="px-5 py-3 border border-l-4 border-black ml-1 shadow-md">
          <Link to="/subscriptions">Subscriptions</Link>
        </li>
        <li className="px-5 py-3 border border-l-4 border-black ml-1 shadow-md">
          <Link to="/masterfeed">All posts</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
