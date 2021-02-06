import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // const [isClosed, setClosed] = React.useState(false);

  return (
    <div className="sticky top-0 bg-transparent z-10 h-10 flex justify-center relative">
      <section className="h-40 p-2">
        {/* <input
          className="w-1/3 h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-xl"
          type="search"
          placeholder="Search..."
        /> */}
        <ul className="flex flex-row space-x-8 mx-auto border-gray-300">
          <Link to="/">
            <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
              For You Grid
            </li>
          </Link>
          <Link to="/following">
            <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
              Following
            </li>
          </Link>
          <Link to="/homefeed">
            <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
              My Posts
            </li>
          </Link>
          <Link to="/featuredfeed">
            <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
              Featured posts
            </li>
          </Link>
          <Link to="/masterfeed2">
            <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
              For You Singles
            </li>
          </Link>
        </ul>
      </section>
    </div>
  );
};

export default Header;
