import React from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { AiFillPushpin } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { RiChatFollowUpFill } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import Auth from "../../utils/auth";
import { useMutation, useQuery, useState } from "@apollo/react-hooks";
import { LIKE_POST } from "../../utils/mutations"

// const HandleLikePost = async (likedPostId) => {

//     const [likePost, {error}] =  useMutation(LIKE_POST)
//     // get token
//     const token = Auth.loggedIn() ? Auth.getToken() : null;
//     if (!token) {
//         return false;
//       }
     
//       try {
    //     await likePost({
    //    variables: { postId: likedPostId }
    //    });
       

//      } catch (err) {
//        console.error(err);
//      }  

// }



const ReactionPanel = ({post}) => {
    const [likePost, {error}] =  useMutation(LIKE_POST)

    return (
        <div className="container flex flex-row">
            <p  style={{fontSize:"15px", margin: "7px"}} className="flex flex-row" >
                {post.likeCount} <FcLike style={{fontSize:"8px", margin: "2px"}}/>
            </p>
           <RiMoneyDollarCircleLine style={{fontSize:"25px", margin: "7px"}} className="hover:opacity-30 transform hover:scale-125 motion-reduce:transform-none opacity-50 firstlevel"/>
           <RiChatFollowUpFill style={{fontSize:"25px", margin: "7px"}} className="hover:opacity-30 transform hover:scale-125 motion-reduce:transform-none opacity-50"/>
            <FcLike 
                style={{fontSize:"25px", margin: "7px"}} 
                className="hover:opacity-50 opacity-70  transform hover:scale-125 motion-reduce:transform-none"
                id = {post._id}
                onClick={() => likePost({
                    variables: { postId: post._id }
                    })}
            />
            <AiFillPushpin style={{fontSize:"25px", margin: "7px"}} className="hover:opacity-30 opacity-50 transform hover:scale-125 motion-reduce:transform-none"/>
            <CgComment style={{fontSize:"25px", margin: "7px"}} className="hover:opacity-30 opacity-50 transform hover:scale-125 motion-reduce:transform-none"/>
        </div>
    )

}

export default ReactionPanel;