"use client";

import Image from 'next/image';
import SideBarMenuItem from './SideBarMenuItem';
import { DotsHorizontalIcon, HomeIcon } from "@heroicons/react/solid";
import { BellIcon, BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, HashtagIcon, InboxIcon, UserIcon } from "@heroicons/react/outline";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { userState } from '../../atom/UserAtom';

const SideBar = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const fetchUser = async (user) => {
    const docRef = doc(db, "users", user.providerData[0].uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setCurrentUser(docSnap.data());
    } else {
      console.error("No such document!");
    }
  };

  const handleSignOut = () => {
        auth.signOut();
        setCurrentUser(null);
  }

  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24'>
      <div className='hoverEffect p-0 hover:bg-blue-100 xl:px-1'>
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png"
          width="50"
          height="50"
          alt="Twitter Logo"
        />
      </div>
      <div className='mt-4 mb-2.5 xl:items-start'>
        <SideBarMenuItem text="Home" Icon={HomeIcon} active />
        <SideBarMenuItem text="Explore" Icon={HashtagIcon} />
        {currentUser && (
          <>
            <SideBarMenuItem text="Notifications" Icon={BellIcon} />
            <SideBarMenuItem text="Messages" Icon={InboxIcon} />
            <SideBarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SideBarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SideBarMenuItem text="Profile" Icon={UserIcon} />
            <SideBarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
          </>
        )}
      </div>
      {currentUser ? (
        <>
          <div>
            <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
              Tweet
            </button>
          </div>
          <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto'>
            <img 
              src={currentUser?.userImg}
              alt="user-image" 
              onClick={handleSignOut}
              className='h-10 w-10 rounded-full xl:mr-2'
            />
            <div className='leading-5 hidden xl:inline'>
              <h4 className='font-bold'>
                {currentUser?.name}
              </h4>
              <p className='text-gray-500'>
                @{currentUser?.username}
              </p>
            </div>
            <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline' />
          </div>
        </>
      ) : (
        <button 
          onClick={() => router.push('/auth/signin')}
          className='bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
          Sign In
        </button>
      )}
    </div>
  );
};

export default SideBar;
