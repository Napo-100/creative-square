import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (

    <div className="sticky top-0 bg-transparent z-10 h-28 flex justify-center relative">
      <section className="pt-1">
      <input class="block w-1/3 h-16 px-3 mx-auto rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-xl" type="search" placeholder="Search..."/>
      
      <ul className="flex flex-row space-x-8 mx-auto border-gray-300">
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 px-5 py-3 text-sm  border-black shadow-md ml-1">
          <Link to="/">For You Grid</Link>
        </li>
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 px-5 py-3 text-sm border-black shadow-md ml-1">
          <Link to="/following">Following</Link>
        </li>
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 px-5 py-3 text-sm border-black shadow-md ml-1">
          <Link to="/homefeed">My Posts</Link>
        </li>
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 px-5 py-3 text-sm border-black shadow-md ml-1">
          <Link to="/featuredfeed">Featured posts</Link>
        </li>
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 px-5 py-3 text-sm border-black shadow-md ml-1">
          <Link to="/masterfeed2">For You Singles</Link>
        </li>
      </ul>
     
      </section>
     
    </div>
  );
};

export default Header;
