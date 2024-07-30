import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { IoMenu } from "react-icons/io5";
import logo from '../assets/hxh.png';


const Navbar = ({ toggleLoginModal }) => {
    const [nav, setNav] = useState(false);

    const toggleNav = () => {
        setNav(!nav);
    };

    const closeNav = () => {
        setNav(false);
    };

    return (
        <div className='fixed top-0 left-0 w-full nav text-white z-50'>
            <div className='flex md:justify-between items-center md:px-10 h-16 mx-auto px-2'>
                <div onClick={toggleNav} className='md:hidden z-30'>
                    {nav ? <AiOutlineClose size={30} className='text-violet-500' /> : <IoMenu size={30} className='text-violet-500' />}
                </div>
                <div className='flex md:mx-0 mx-auto'>
                    <a className='md:text-xl items-center text-center text-base'>
                        <p className='font-bold font-custom tracking-wider'>Anime</p>
                        <p className='mt-[-10px] text-[10px] font-extrabold text-violet-300'>Tambayan</p>
                    </a>
                    <img src={logo} alt='logo' className='h-9 w-9' />
                </div>
                
               
            </div>
            <div className={`fixed top-0 left-0 w-full h-full darkblue flex flex-col justify-center items-start transform ${nav ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
                <div className="nav2 w-full  h-full"></div>
            </div>
        </div>
    );
};

export default Navbar;
