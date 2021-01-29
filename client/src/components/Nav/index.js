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
        <div className="bg-black text-white flex p-2">
            <div className="font-sans text-lg font-bold">
                <Link to="/">
                    CREATIVE SQUARE
                </Link>
            </div>
            <div className="flex justify-end">
                <nav>
                    {showNavigation()}
                </nav>
            </div>
        </div>
    );
}

export default Nav;