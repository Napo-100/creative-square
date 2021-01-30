import {React, useState} from "react";

import image1 from "../../assets/square_Img/square1.png";
import image2 from "../../assets/square_Img/square2.png";
import image3 from "../../assets/square_Img/square3.png";
import image4 from "../../assets/square_Img/square4.png";
import image5 from "../../assets/square_Img/square5.png";

const MasterFeed = () => {
  const [allPosts] = useState([
    {
      _id: 1234567,
      username: "TestMan",
      postMediaType: "test",
      postDescription: "this is a mock post",
      postLink: "google.com",
      PrimaryPostMedia: image1,
      SecondaryPostMedia: "",
      postPaywall: false,
    },
    {
      _id: 999999,
      username: "MegaMan",
      postMediaType: "test",
      postDescription: "this is a 2nd mock post",
      postLink: "google.com",
      PrimaryPostMedia: image2,
      SecondaryPostMedia: "",
      postPaywall: false,
    },
    {
      _id: 888888,
      username: "RockMan",
      postMediaType: "test",
      postDescription: "this is a 3rd  mock post",
      postLink: "google.com",
      PrimaryPostMedia: image3,
      SecondaryPostMedia: "",
      postPaywall: false,
    },
    {
      _id: 333333,
      username: "CutsMan",
      postMediaType: "test",
      postDescription: "this is a 4th mock post",
      postLink: "google.com",
      PrimaryPostMedia: image4,
      SecondaryPostMedia: "",
      postPaywall: false,
    },
    {
      _id: 55555,
      username: "ProtoMan",
      postMediaType: "test",
      postDescription: "this is a 5th mock post",
      postLink: "google.com",
      PrimaryPostMedia: image5,
      SecondaryPostMedia: "",
      postPaywall: false,
    },
  ]);

  return (
    <div className="grid grid-cols-1 gap-2 border-2 border-blue-300 p-2">
      {allPosts.map((post) => (
        <div key={post._id} className="hover:bg-indigo-500">
          <article className="hover:shadow-xl group">
            <a href={post.postLink} target="_blank" rel="noreferrer">
              <span className="block h-64 relative rounded shadow leading-snug">
                <img
                  src={post.PrimaryPostMedia}
                  className="w-full h-full rounded absolute"
                  alt="post"
                />
              </span>
            </a>
          </article>
        </div>
      ))}
    </div>
  );
};

export default MasterFeed;
