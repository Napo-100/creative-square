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
                onClick={() => handleLike()}
            />
            <AiFillPushpin 
                style={{fontSize:"25px", margin: "7px"}} 
                className="hover:opacity-30 opacity-50 transform hover:scale-125 motion-reduce:transform-none"
                onClick={() => handlePin()}    
            />
            <CgComment style={{fontSize:"25px", margin: "7px"}} className="hover:opacity-30 opacity-50 transform hover:scale-125 motion-reduce:transform-none"/>
            
        </div>
        
    )

}

export default ReactionPanel;