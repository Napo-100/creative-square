import React, { useEffect } from "react";
import defaultImage from "../assets/square_Img/square1.png";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ME_PROFILE } from "../utils/queries";

function Profile() {
  const { loading, data: userData } = useQuery(QUERY_ME_PROFILE);
  console.log(userData);

  return (
    <div className="mb-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="border-2 sm:border-4 rounded-full border-black p-1 sm:shadow-lg">
            {userData.me.profilePic ? (
              <img
                src={userData.me.profilePic}
                alt="Profile pic"
                className="rounded-full shadow-inner"
              />
            ) : (
              <img
                src={defaultImage}
                alt="Default pic"
                className="rounded-full shadow-inner"
              />
            )}
          </div>
          <h2 className="text-center font-bold text-gray-800  antialiased sm:text-3xl">
            {userData.me.username}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Profile;
