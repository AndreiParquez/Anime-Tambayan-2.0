import React, { useState, useEffect } from 'react';
import img from '../assets/hxh.jpg';
import { HiPlay } from "react-icons/hi2";
import Navbar from './navbar';





function AnimePage() {



  return (
    <>
    <Navbar/>
    
    

    <div className="main-content bg-zinc-900 text-white">
      <section>
        <div className="anime-container">
          <div className="anime row">
            <div className="relative w-full h-64">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${img})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900"></div>
              <div className="absolute bottom-0 left-0 z-10 p-4 w-full">
                <div className="flex items-center space-x-3">
                <h1 className="text-white text-xl font-bold">Hunter x Hunter</h1>
                <span className="text-[9px] font-semibold border px-1 rounded">HD</span>
                <span className="text-xs tracking-widest font-bold text-gray-300">Ep 12</span>

                </div>
                <div className="flex text-gray-300 space-x-2 ">
                <span className="">None</span>
                <span className="">Genre: <span className='text-sm text-violet-300 ml-2 tracking-widest'>Adventure | Magic</span></span>

                </div>
                
              </div>
            </div>
            <div className="details col-6">
              <div className="mid" style={{ margin: '20px 0' }}>
                
              </div>

              <div className="px-2">
                <div className="mid">
                <button className="rounded bg-violet-600 p-2 w-full flex justify-center items-center font-bold text-white hover:bg-white hover:text-violet-600 transition-colors duration-300 ease-in-out transform ">
                <HiPlay className='size-5'/> <span>Watch Now</span></button>

                 
                </div>
                <div className="text-gray-400 text-sm mt-2">
                  <p className=" text-base font-bold text-gray-300">Synopsis:</p>
                  <div className="mx-2 indent-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem corrupti tenetur aperiam. Beatae, odio, facilis ab quas alias facere rerum est accusantium dolore, ipsum ut ipsa? Officia placeat quam voluptatem.
                  </div>
                </div>
                
                <div className=" grid grid-cols-2 my-3">
                  <div className="space-x-2">
                    <span className="">Other Names:</span>
                    <span className=" text-gray-400 text-sm">HSBhabdhbha</span>
                  </div>
                  <div className="space-x-2">
                    <span className="">Episodes:</span>
                    <span className="text-gray-400 text-sm">10</span>
                  </div>
                  <div className="space-x-2">
                    <span className="">Release Year:</span>
                    <span className="text-gray-400 text-sm">2002</span>
                  </div>
                  <div className="space-x-2">
                    <span className="item-head">Type:</span>
                    <span className="text-gray-400 text-sm">Hxh</span>
                  </div>
                  <div className="space-x-2">
                    <span className="item-head">Status:</span>
                    <span className="text-gray-400 text-sm">Ongoing</span>
                  </div>
                 
                </div>

                <section id="watch">
                  <div className="episode-container ">
                    <h1 className=" ">Episodes</h1>
                    <div className="episode-buttons font-bold grid grid-cols-6 px-3 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
                      <button className="bg-violet-500 w-12 h-12 text-white rounded flex items-center justify-center">1</button>
                      <button className="bg-zinc-800 w-12 h-12 text-white rounded flex items-center justify-center">2</button>
                      <button className="bg-zinc-800 w-12 h-12 text-white rounded flex items-center justify-center">3</button>
                      <button className="bg-zinc-800 w-12 h-12 text-white rounded flex items-center justify-center">4</button>
                      <button className="bg-zinc-800 w-12 h-12 text-white rounded flex items-center justify-center">5</button>
                      <button className="bg-zinc-800 w-12 h-12 text-white rounded flex items-center justify-center">6</button>
                      <button className="bg-zinc-800 w-12 h-12 text-white rounded flex items-center justify-center">7</button>
                      <button className="bg-zinc-800 w-12 h-12 text-white rounded flex items-center justify-center">8</button>
                    </div>
                  </div>
                </section>

                </div>
                
              </div>
             
              
            
          </div>
        </div>
      </section>

     
    </div>
    </>
  );
}

export default AnimePage;
