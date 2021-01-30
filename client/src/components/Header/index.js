import React, { useState } from "react";

const Header = () => {
    return (
        <div>
            <ul className="flex flex-row mt-2  border-gray-300 border-b-2 py-2">
                <li className="px-5 py-3 border border-l-4 border-black m-l-1 shadow-md">
                    <a>
                        ALL
                        </a>
                </li>
                <li className="px-5 py-3 border border-l-4 border-black ml-1 shadow-md">
                    <a>
                        Photography
                        </a>
                </li>
                <li className="px-5 py-3 border border-l-4 border-black ml-1 shadow-md">
                    <a>
                        Music
                        </a>
                </li>
            </ul>
        </div>
    );
}

export default Header;