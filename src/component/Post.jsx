import { ChartBarIcon, ChatIcon, DotsHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { auth, db, storage } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { deleteObject, ref } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atom/ModalAtom';
import { userState } from '../../atom/UserAtom';

const Post = ({ post, id }) => {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );

    return () => unsubscribe();
  }, [db, id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'comments'),
      (snapshot) => setComments(snapshot.docs)
    );

    return () => unsubscribe();
  }, [db, id]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes , currentUser]);

  const handleLikePost = async () => {
    if (currentUser) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', currentUser?.uid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', currentUser?.uid), {
          username: currentUser?.username,
        });
      }
    } else {
      router.push('/auth/signin');
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      if (currentUser) {
        await deleteDoc(doc(db, 'posts', id));
        if (post?.image) {
          deleteObject(ref(storage, `posts/${id}/image`));
        }
        router.push('/');
      } else {
        router.push('/auth/signin');
      }
    }
  };

  return (
    <div className='flex p-3 cursor-pointer border-b border-gray-200 '>
      <img src={post?.userImg} alt='user image' className='h-11 w-11 rounded-full mr-4' />
      <div className='flex-1'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1 whitespace-nowrap'>
            <h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>{post?.name}</h4>
            <span className='text-sm sm:text-[15px]'>@{post?.username} - </span>
            <span className='text-sm sm:text-[15px] hover:underline'>
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          <DotsHorizontalIcon className='h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2' />
        </div>
        <p 
          onClick={() => router.push(`/post/${id}`)}
          className='text-gray-800 text-[15px] sm:text-[16px] mb-2 '
        >
          {post?.text}
        </p>
        {post?.image && (
          <img 
            onClick={() => router.push(`/post/${id}`)}
            src={post?.image} alt='' 
            className='rounded-2xl mr-2 w-full' 
          />
        )}
        <div className='flex justify-between text-gray-500 p-2 '>
          <div className='flex items-center select-none'>
            <ChatIcon
              onClick={() => {
                if (currentUser) {
                  setPostId(id);
                  setOpen(!open);
                } else {
                  router.push('/auth/signin');
                }
              }}
              className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100 '
            />
            {comments.length > 0 && (
              <p className='text-sm text-gray-500 select-none'>{comments.length}</p>
            )}
          </div>
          
          {currentUser?.uid === post?.userId && (
            <TrashIcon
            onClick={handleDeletePost}
            className='h-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
            />
          )}
         
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
            {likes.length > 0 && (
              <p className={`text-sm text-gray-500 select-none ${hasLiked ? 'text-red-600' : ''}`}>
                {likes.length}
              </p>
            )}
          </div>

          <ShareIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
          <ChartBarIcon className='h-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100' />
        </div>
      </div>
    </div>
  );
};

export default Post;
