import React, { useState } from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className=" bg-black font-sans text-white text-lg flex justify-between p-2 font-bold">
            <Link to="/">
                CREATIVE SQUARE
            </Link>
        </div>
    );
}
export default TopBar;