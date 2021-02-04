import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (

    <div className="sticky top-0 bg-transparent z-10 bg-gray-100">
      <section className="h-40 p-2">
      
      <input className="w-1/3 h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-xl" type="search" placeholder="Search..."/>
      <ul className="flex flex-row space-x-8 border-gray-300 z-10">
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/">For You Grid</Link>
        </li>
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/following">Following</Link>
        </li>
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/homefeed">My Posts</Link>
        </li>
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/featuredfeed">Featured posts</Link>
        </li>
        <li className="bg-purple-300 rounded-full border-b-4 hover:bg-blue-100 p-2 px-5 py-3 border-black shadow-md ml-1">
          <Link to="/masterfeed2">For You Singles</Link>
        </li>
      </ul>
      
      
      {/* <nav class="flex">
      <a class="no-underline text-white py-3 px-4 font-medium mr-3 bg-indigo-600 hover:bg-indigo-900" href="/">For You</a>
      <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-900 hover:bg-indigo-600" href="/following">Following</a>
      <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-600 hover:bg-indigo-900" href="/homefeed">My Posts</a>
      <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-900 hover:bg-indigo-600" href="/featuredfeed">Featured posts</a>
      </nav> */}
      </section>
      {/* <ul className="flex flex-row border-gray-300 py-2">
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
      </ul> */}
    </div>
  );
};

export default Header;
