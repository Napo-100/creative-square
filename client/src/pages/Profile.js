import React, { useState } from "react";
import image1 from "../assets/square_Img/square1.png";

function Profile() {
    return (
        <div className=" mb-5">
            <div className="border-4 rounded-full border-black p-1 shadow-lg">
                <img
                    src={image1}
                    alt="Profile pic"
                    className="rounded-full shadow-inner" />

            </div>
            <h2 className="text-center font-bold text-gray-800  antialiased text-3xl">
                John George
                </h2>
        </div>
    )

}

export default Profile;