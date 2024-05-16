import Image from 'next/image'
import SideBarMenuItem from './SideBarMenuItem'
import {DotsHorizontalIcon, HomeIcon} from "@heroicons/react/solid";
import {BellIcon, BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, HashtagIcon, InboxIcon, UserIcon} from "@heroicons/react/outline"

const SideBar = () => {
  return (
    <div className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full'>
        <div className='hoverEffect p-0 hover:bg-blue-100xl:px-1'>
            <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/584px-Logo_of_Twitter.svg.png"
                width="50"
                height="50"
            >

            </Image>
        </div>
        <div className='mt-4 mb-2.5 xl:items-start '>
            <SideBarMenuItem text="Home" Icon={HomeIcon} active />
            <SideBarMenuItem text="Explore" Icon={HashtagIcon} />
            <SideBarMenuItem text="Notifications" Icon={BellIcon} />
            <SideBarMenuItem text="Messages" Icon={InboxIcon} />
            <SideBarMenuItem text="BookMarks" Icon={BookmarkIcon} />
            <SideBarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SideBarMenuItem text="Profile" Icon={UserIcon} />
            <SideBarMenuItem text="More" Icon={DotsCircleHorizontalIcon} />
        </div>
        <div>
            <button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline'>
                Tweet
            </button>
        </div>
        <div className='hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto '>
            <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmOGm_08yLUO2XUZLNvp6na5KnPUQjbwvypH668bkgcw&s" 
                alt="user-image" 
                className='h-10 w-10 rounded-full xl:mr-2'
            />
            <div className='leading-5 hidden xl:inline'>
                <h4 className='font-bold '>
                    user name
                </h4>
                <p className='text-gray-500 '>
                    @username
                </p>
            </div>
            <DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline' />
        </div>
    </div>
  )
}
export default SideBar