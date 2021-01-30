import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="">
                    <li className="\">
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
                        <Link to="/signup">
                            Signup
                            </Link>
                    </li>
                    <li className="">
                        <Link to="/login">
                            Login
                            </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <div className="bg-black text-white">
            <div className="font-sans text-lg flex justify-between p-2 font-bold">
                <Link to="/">
                    CREATIVE SQUARE
                </Link>
            </div>

            <div className="flex bg-gray-100">
                <aside className="bg-white w-64 min-h-screen flex flex-col">
                    <span className="text-black py-2">Your Creative Square</span>
                </aside>
                <div className="flex justify-end">
                    <nav>
                        {showNavigation()}
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Nav;