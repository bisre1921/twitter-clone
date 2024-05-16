import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'
import Input from './Input'
import Post from './Post'

const Feed = () => {
    const posts = [
        {
            id: "1" , 
            name: "name" , 
            username: "username" , 
            userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmOGm_08yLUO2XUZLNvp6na5KnPUQjbwvypH668bkgcw&s" ,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYsP6OEfPLumXHALYZrNuqHsc2Wh533MNHd6BStM5gQ&s" ,
            text: "post caption" , 
            timestamp: "2 hours ago"
        } ,
        {
            id: "2" , 
            name: "name" , 
            username: "username" , 
            userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmOGm_08yLUO2XUZLNvp6na5KnPUQjbwvypH668bkgcw&s" ,
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9FhVvMq24rtYUD4O7W-wrl0C_gT12Mj33C82qfFGKEw&s" ,
            text: "post caption" , 
            timestamp: "2 days ago"
        } 
    ]

  return (
    <div className='sm:ml-[73px] xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] flex-grow max-w-xl'>
        <div className=' flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 '>
            <h2 className='text-lg sm:text-xl font-bold cursor-pointer '>Home</h2>
            <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
                <SparklesIcon className='h-5' />
            </div>
        </div>
        <Input />
        {posts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
    </div>
  )
}

export default Feed