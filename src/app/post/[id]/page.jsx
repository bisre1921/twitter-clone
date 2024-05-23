// "use client";
// import SideBar from "../../../component/SideBar";
// import "../../globals.css";
// import Widgets from "../../../component/Widgets";
// import CommentModal from "../../../component/CommentModal";
// import { ArrowLeftIcon } from "@heroicons/react/outline";
// import { useRouter } from "next/navigation";
 
// export default async function Post() {
//   const router = useRouter();
//   const newsResults = await fetch("https://saurav.tech/NewsAPI/everything/cnn.json").then((res) => res.json());
//   const randomUsersResult = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture").then((res) => res.json());

//   return (
//     <div className="flex min-h-screen mx-auto">
//       <SideBar />
//       {/* <Feed /> */}
//       <div className='sm:ml-[73px] xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] flex-grow max-w-xl'>
//         <div className=' flex items-center space-x-0 sm:space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 '>
//           <div 
//             onClick={() => router.push("/")}
//             className="hoverEffect"
//           >
//             <ArrowLeftIcon className="h-5 mt-4 sm:mt-0"/>
//           </div>
//           <h2 className='text-lg sm:text-xl font-bold cursor-pointer '>Tweet</h2>
//         </div>
//             {/* {posts.map((post) => (
//                     key={post.id}
//                     initial={{ opacity: 0 , y: 50 }}
//                     animate={{ opacity: 1 , y: 0 }}
//                     exit={{ opacity: 0 , y: 50 }}
//                     transition={{ duration: 1 }}
//                 >
//                     <Post key={post.id} post={post} />
//             ))} */}

//     </div>
//       <Widgets newsResults={newsResults.articles} randomUsersResult={randomUsersResult.results} />
//       <CommentModal />
//     </div>
//   );
// }

// // https://saurav.tech/NewsAPI/everything/cnn.json

// // https://saurav.tech/NewsAPI/top-headlines/category/business/us.json




"use client";
import React, { use, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SideBar from '../../../component/SideBar';
import Widgets from '../../../component/Widgets';
import Post from '../../../component/Post';
import CommentModal from '../../../component/CommentModal';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import '../../globals.css';
import { db } from '../../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Posts = () => {
  const router = useRouter();
  const [newsResults, setNewsResults] = useState(null);
  const [randomUsersResult, setRandomUsersResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const  {id} = useParams();
  const [post , setPost] = useState(null);

  useEffect(() => {
    const fetchNewsAndUsers = async () => {
      try {
        const newsResponse = await fetch("https://saurav.tech/NewsAPI/everything/cnn.json");
        const newsData = await newsResponse.json();
        setNewsResults(newsData.articles);

        const usersResponse = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture");
        const usersData = await usersResponse.json();
        setRandomUsersResult(usersData.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsAndUsers();
  }, []);

  useEffect(() => {
    onSnapshot(
      doc(db, 'posts', id),
      (snapshot) => {
        setPost(snapshot.data());
      }
    )} , [db , id])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen mx-auto">
      <SideBar />
      <div className='sm:ml-[73px] xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] flex-grow max-w-xl'>
        <div className='flex items-center space-x-0 sm:space-x-2 py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200'>
          <div onClick={() => router.push("/")} className="hoverEffect">
            <ArrowLeftIcon className="h-5 mt-4 sm:mt-0" />
          </div>
          <h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Tweet</h2>
        </div>
        <Post id={id} post={post} />
        {/* Your post content goes here */}
      </div>

      <Widgets newsResults={newsResults} randomUsersResult={randomUsersResult} />
      <CommentModal />
    </div>
  );
}

export default Posts;
