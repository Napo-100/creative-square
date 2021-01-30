import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";


function SideBar() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="">
                    <li className="\">
                        CREATE POST
                        </li>
                    <li className="\">
                        UPDATE PROFILE
                    </li>
                    <li className="">
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
                        <Link to="/login">
                            Login
                            </Link>

                    </li>
                    <li className="">
                        <Link to="/signup">
                            Signup
                            </Link>
                    </li>
                </ul>
            );
        }
    }

    const [isClosed, setClosed] = React.useState(false)
    return (
        <div className="bg-black ">


            <div className="flex bg-gray-100">
                {!isClosed && (
                    <aside className="bg-white w-80 min-h-screen flex flex-col">
                        <h1 className="text-black py-2 font-bold px-8">Your Creative Square</h1>

                        <div className="border-r flex-grow">
                            <nav>
                                {showNavigation()}
                            </nav>
                        </div>
                    </aside>
                )}
                {isClosed ? (
                    <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
                        onClick={() => setClosed(false)}
                        title="Open Menu" tabIndex="1">
                        <svg
                            className="fill-current h-3 w-3"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                ) : (
                        <button title="Close Menu" tabIndex="1" onClick={() => setClosed(true)}>X</button>
                    )}
            </div>
        </div>
    );
}

export default SideBar;