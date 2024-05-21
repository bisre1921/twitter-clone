"use client";

import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { auth, db , storage } from "../../firebase.jsx";
import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import { addDoc, collection , doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRef } from 'react';
import {getDownloadURL, ref, uploadString} from "firebase/storage";

const Input = () => {
    const [loggedIn , setLoggedIn] = useState(false);
    const [input , setInput] = useState("");
    const [loading , setLoading] = useState(false);
    const [selectedFile , setSelectedFile] = useState(null);
    const filePickerRef = useRef(null);

    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
          if(user) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false)
          }
        });
       
      } , [auth]);


      const handleSendPost = async () => {
        setLoading(true)
        const docRef = await addDoc(collection(db , "posts") , {
            text: input ,
            timestamp: serverTimestamp() , 

        });

        const imageRef = ref(storage , `posts/${docRef.id}/image`);
        if(selectedFile) {
            await uploadString(imageRef , selectedFile , "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL,
                });

            });
        }
        setLoading(false);
        setInput("");
        setSelectedFile(null);
      };

      const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        };

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
      }

 if(loading) {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
 }
  return (
    <>
    {loggedIn && (
        <div className='flex border-b border-gray-200 p-3 space-x-3'>
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmOGm_08yLUO2XUZLNvp6na5KnPUQjbwvypH668bkgcw&s" 
                alt="user image" 
                onClick={() => auth.signOut()}
                className='h-11 w-11 rounded-full cursor-pointer hover:brightness-95'
            />
            <div className='w-full divide-y divide-gray-200 '>
                <div className=''>
                    <textarea 
                        rows="2"
                        placeholder='what is happening'
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        className='w-full border-none focus:ring-0 text-lg placeholder:gray-700 tracking-wide min-h-[50px] text-gray-700'
                    >
                    </textarea>
                </div>
                {selectedFile && (
                    <div className='relative'>
                        <XIcon 
                            onClick={() => setSelectedFile(null)}
                            className='h-8 text-black absolute cursor-pointer shadow-md shadow-white rounded-full bg-white hover:bg-gray-200 hover:shadow-md p-1 top-0 right-0' 
                        />
                        <img 
                            src={selectedFile} 
                            className={`${loading && "animate-pulse"}`}

                        />
                    </div>
                )}
                <div className='flex items-center justify-between pt-2.5'>
                    <div className='flex '>
                        <div onClick={() => filePickerRef.current.click()}>
                            <PhotographIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                            <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
                        </div>
                        
                        <EmojiHappyIcon className='h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100' />
                    </div>
                    <button 
                        disabled={!input} 
                        onClick={handleSendPost}
                        className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'
                    >
                        Tweet
                    </button>
                </div>
            </div>
        </div>
    )}
       
    </>
    
  )
}

export default Input