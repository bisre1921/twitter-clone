"use client";

import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atom/ModalAtom';
import Modal from 'react-modal';
import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import { auth, db } from '../../firebase';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import Moment from 'react-moment';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { userState } from '../../atom/UserAtom';

const CommentModal = () => {
  // const [loggedIn , setLoggedIn] = useState(false);
  const [input , setInput] = useState("");
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [currentUser , setCurrentUser] = useRecoilState(userState);
  const [post, setPost] = useState({});
  const router = useRouter();

  // useEffect(() => {
  //   onAuthStateChanged(auth , (user) => {
  //     if(user) {
  //       setLoggedIn(true);
  //     } else {
  //       setLoggedIn(false)
  //     }
  //   });
   
  // } , [auth]);

  useEffect(() => {
    if (postId) {
      console.log('postId:', postId); // Debugging line to check the postId
      const postDocRef = doc(db, 'posts', postId);
      onSnapshot(postDocRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log('No such document!');
        }
      });
    } else {
      console.log('postId is null or undefined');
    }
  }, [postId]);

  const handleSendComment = async () => {
    await addDoc(collection(db, "posts", postId, "comments"), {
        comment: input,
        name: currentUser.name,
        username: currentUser.username,
        userImg: currentUser.userImg,
        timestamp: serverTimestamp(),
        userId : currentUser.uid
    });
    setOpen(false);
    setInput("");
    router.push(`/post/${postId}`)
  }

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-white border-2 border-gray-200 rounded-xl shadow-md"
        >
          <div className="p-1">
            <div className="border-b border-gray-200 py-2 px-1.5">
              <div
                onClick={() => setOpen(false)}
                className="hoverEffect w-9 h-9 flex items-center justify-center"
              >
                <XIcon className="h-[22px] text-gray-700" />
              </div>
            </div>
            {post && (
            <>
                <div className="p-2 flex items-center space-x-1 relative">
                    <span className='w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300'></span>
                    <img
                    src={post.userImg}
                    alt="user image"
                    className="h-11 w-11 rounded-full mr-4"
                    />
                    <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                    {post?.name}
                    </h4>
                    <span className="text-sm sm:text-[15px]">@{post?.username} - </span>
                    <span className="text-sm sm:text-[15px] hover:underline">
                        <Moment fromNow>
                            {post?.timestamp?.toDate()}
                        </Moment>
                    </span>
                </div>
                <p className='text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2'>
                    {post?.text}
                </p>
                
                    <div className='flex p-3 space-x-3'>
                        <img 
                            src={currentUser?.userImg}
                            alt="user image" 
                            className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
                        />
                        <div className='w-full divide-y divide-gray-200 '>
                            <div className=''>
                                <textarea 
                                    rows="2"
                                    placeholder='Tweet your reply'
                                    value={input}
                                    onChange={(event) => setInput(event.target.value)}
                                    className='w-full border-none focus:ring-0 text-lg placeholder:gray-700 tracking-wide min-h-[50px] text-gray-700'
                                >
                                </textarea>
                            </div>
                            <div className='flex items-center justify-between pt-2.5'>
                            
                                <div className='flex '>
                                    <div 
                                        // onClick={() => filePickerRef.current.click()}
                                    >
                                        <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                                        {/* <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} /> */}
                                    </div>
                                    
                                    <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                                </div>
                                <button 
                                    disabled={!input} 
                                    onClick={handleSendComment}
                                    className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                                >
                                    Reply
                                </button>
                                
                            </div>
                        </div>
                    </div>
            </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CommentModal;
