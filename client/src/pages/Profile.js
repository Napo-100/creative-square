import React, { useEffect } from "react";
// import defaultImage from "../assets/square_Img/square1.png";
// import { useQuery } from "@apollo/react-hooks";
// import { QUERY_ME_PROFILE } from "../utils/queries";

function Profile({ userData }) {
  // const { loading, data: userData } = useQuery(QUERY_ME_PROFILE);
  console.log(userData);

  return (
    <div>
      <div className="flex flex-row content-center justify-center items-center align-center sm:block">
        <div className="border-2 sm:border-4 rounded-full border-black p-1 shadow-lg">
          {userData.me.profilePic ? (
            <img
              src={userData.me.profilePic}
              alt="Profile pic"
              className="rounded-full w-20 sm:w-full shadow-inner"
            />
          ) : (
            <img
              src="https://picsum.photos/640/400/?random"
              alt="Default pic"
              className="rounded-full shadow-inner"
            />
          )}
        </div>
        <h2 className="ml-5 sm:ml-0 text-center font-bold text-gray-800  antialiased text-3xl">
          {userData.me.username}
        </h2>
      </div>
      {userData.me.bio && (
        <p className="hidden sm:flex flex-wrap content-center text-center p-2">
          {userData.me.bio}
        </p>
      )}
    </div>
  );
}

export default Profile;
