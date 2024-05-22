import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import Moment from 'react-moment'
import { auth, db, storage } from '../../firebase'
import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { deleteObject, ref } from 'firebase/storage'
import { useRecoilState } from 'recoil'
import { modalState } from '../../atom/ModalAtom'

const Post = ({post }) => {
    const [likes , setLikes] = useState([]);
    const [hasLiked , setHasLiked] = useState(false);
    const [loggedIn , setLoggedIn] = useState(false);
    const [open , setOpen] = useRecoilState(modalState);
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth , (user) => {
          if(user) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false)
          }
        });
       
      } , [auth]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db , "posts" , post.id , "likes"), 
            (snapshot) => setLikes(snapshot.docs)
        );

    } , [db]);

    useEffect(() => {
        setHasLiked(
            likes.findIndex((like) => like.id === "userid") !== -1
        );
    }, [likes]);

    const handleLikePost = async () => {
        if(loggedIn) {
            if(hasLiked){
                await deleteDoc(doc(db, "posts", post.id , "likes" , "userid"), {})
            } else {
                await setDoc(doc(db, "posts", post.id , "likes" , "userid"), {} )
            }
        } else {
            router.push("/auth/signin");
        }
    }

    const handleDeletePost = async () => {
        if(window.confirm("Are you sure you want to delete this post?")){
            if(loggedIn) {
                await deleteDoc(doc(db, "posts", post.id));
                if(post.data().image) {
                    deleteObject(ref(storage, `posts/${post.id}/image`));
                }
            } else {
                router.push("/auth/signin");
            }
        }
    
    }

  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200 '>
        <img 
            src={post.userImg}
            alt="user image"
            className='h-11 w-11 rounded-full mr-4'
        />
        <div className='flex-1'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-1 whitespace-nowrap'>
                    <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post.data().name}</h4>
                    <span className='text-sm sm:text-[15px]'>@{post.username} - </span>
                    <span className='text-sm sm:text-[15px] hover:underline'>
                        <Moment fromNow>
                            {post?.data().timestamp?.toDate()}
                        </Moment>
                        {post.timestamp}
                    </span>
                </div>
                <DotsHorizontalIcon className='h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2' />
            </div>
            <p className='text-gray-800 text-[15px] sm:text-[16px] mb-2 '>
                {post.data().text}
            </p>
            <img 
                src={post.data().image}
                alt="post image" 
                className='rounded-2xl mr-2 w-full'
            />
            <div className='flex justify-between text-gray-500 p-2 '>
                <ChatIcon 
                    onClick={() => setOpen(!open)}
                    className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100 ' 
                />
                <TrashIcon 
                    // To do check who created this post before delete
                    onClick={handleDeletePost}
                    className='h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' 
                />
                <div className='flex items-center '>
                    {hasLiked ? (
                        <HeartIconFilled 
                            onClick={handleLikePost} 
                            className='h-9 hoverEffect p-2 text-red-600 hover:bg-red-100' 
                        />
                    ) : (
                        <HeartIcon
                            onClick={handleLikePost} 
                            className='h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' 
                        />
                    )}
                    {
                        likes.length > 0 && (
                            <p 
                                className={`text-sm text-gray-500 select-none ${hasLiked ? "text-red-600" : ""}`}
                            >
                                {likes.length}
                            </p>
                        )
                    }
                </div>
                
                
                <ShareIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
                <ChartBarIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' /> 
            </div>
        </div>
    </div>
    // </div>
  )
}

export default Post