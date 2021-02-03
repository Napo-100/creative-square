import React from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { AiFillPushpin } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { RiChatFollowUpFill } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import Auth from "../../utils/auth";
import { useMutation, useQuery, useState } from "@apollo/react-hooks";
import { LIKE_POST, PIN_POST } from "../../utils/mutations"




const ReactionPanel = ({post}) => {
   
    //LIKE POST
    //Setting likePost Mutation
    const [likePost, {error}] =  useMutation(LIKE_POST)
    //On click function for triggering the like post mutation
    const handleLike = async () => {
        try {
        const {data} = await likePost({
            variables: { postId: post._id }
            })
        console.log(data)
        } catch (e) {
            console.error(e);
          }
    }
   
    //Pin Post
    //Setting pinPost Mutation
    const [pinPost] = useMutation(PIN_POST)
     //On click function for triggering the pin post mutation
     const handlePin = async () => {
        try {
        const {data} = await pinPost({
            variables: { postId: post._id }
            })
        console.log(data)
        } catch (e) {
            console.error(e);
          }
    }




    return (
        <div className="flex flex-row mx-auto">
            
            <p  style={{fontSize:"15px"}} className="mx-3 my-1 flex flex-row absolute top-0 right-0 ..." >
                {post.likeCount} <FcLike style={{fontSize:"8px", margin: "2px"}}/>
            </p>
           <RiMoneyDollarCircleLine style={{fontSize:"25px"}} className="mx-3 my-1 hover:opacity-30 transform hover:scale-125 motion-reduce:transform-none opacity-50 firstlevel"/>
           <RiChatFollowUpFill style={{fontSize:"25px"}} className="mx-3 my-1 hover:opacity-30 transform hover:scale-125 motion-reduce:transform-none opacity-50"/>
            <div className="relative text-center">
            <FcLike 
                style={{fontSize:"25px"}} 
                className="hover:opacity-50 opacity-70 mx-3 my-1 transform hover:scale-125 motion-reduce:transform-none"
                id = {post._id}
                onClick={() => handleLike()}
            />
              <p  style={{fontSize:"15px", top: "-2px"}} className="text-red-900 flex flex-row absolute top-0 right-0 ..." >
               {post.likeCount} <FcLike style={{fontSize:"8px", margin: "2px"}}/>
            </p>
            </div>
            <div className="relative text-center">
            <AiFillPushpin 
                style={{fontSize:"25px"}} 
                className="hover:opacity-30 mx-3 my-1 opacity-50 transform hover:scale-125 motion-reduce:transform-none"
                onClick={() => handlePin()}    
            />
             <p  style={{fontSize:"15px", top: "-2px"}} className="text-red-900 flex flex-row absolute top-0 right-0 ..." >
               {post.pinCount} <AiFillPushpin style={{fontSize:"8px", margin: "2px"}}/>
            </p>
            </div>
            <a className="relative text-center" href="#comment-section">
            <CgComment style={{fontSize:"25px"}} className="mx-3 my-1 hover:opacity-30 opacity-50 transform hover:scale-125 motion-reduce:transform-none"/>
            <p  style={{fontSize:"15px", top: "-2px"}} className="text-red-900 flex flex-row absolute top-0 right-0 ..." >
               {post.comments.length} 
            </p>
            </a>

        </div>
        
        
    )

}

export default ReactionPanel;