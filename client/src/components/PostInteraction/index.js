import React, {useState} from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { AiFillPushpin } from "react-icons/ai";
import { CgComment } from "react-icons/cg";
import { RiChatFollowUpFill } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

import Auth from "../../utils/auth";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { LIKE_POST, PIN_POST } from "../../utils/mutations"

import Modal from 'react-modal'
import dimedrop from "../../assets/dimedrop.png"

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

    
      
    const [modalIsOpen, setModalIsOpen] = useState(false)

    
    return (
        <div className="flex flex-row mx-auto">
                     
           <RiMoneyDollarCircleLine 
           style={{fontSize:"25px"}} 
           className="mx-3 my-1 hover:opacity-30 transform hover:scale-125 motion-reduce:transform-none opacity-50 firstlevel"
           onClick={() => setModalIsOpen(true)}
           />


            <Modal className="bg-green-200" 
            isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <div class="h-screen w-full flex flex-col items-center justify-center bg-teal-lightest font-sans">
                    <div class="h-screen w-full absolute flex items-center justify-center bg-modal">
                        <div class="bg-white rounded shadow p-8 m-4 max-w-xs max-h-full text-center text-xl overflow-hidden">
                            <div class="mb-2">
                                <h1>Thanks For Dropping a Dime!</h1>
                            </div>
                            {/* client\src\assets\dimedrop.png */}
                            <img src={dimedrop}  alt="Creative Square" />
                            <div class="flex justify-center">
                                <button class="flex-no-shrink text-white py-2 px-4 rounded bg-green-400 hover:bg-teal-dark"
                                    onClick={() => setModalIsOpen(false)}>Let's Go</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>


         
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