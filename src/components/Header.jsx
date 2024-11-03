import { Link, useResolvedPath } from "react-router-dom"
import { HiBars3 } from "react-icons/hi2";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState } from "react";
import logo from "./../../public/logo/logo.png"
import logo2 from "./../../public/logo/logo2.2.png"
import './header.css'




function Header() {
  let [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useResolvedPath()
  return (
    <header className=" bg-zinc-900 fixed top-0 w-full z-50">

      <div className="flex justify-between items-center w-[90%] mx-auto p-5">
      {/* <div className=""> */}
        {/* <div className="flex justify-between items-center w-[90%] mx-auto p-5  "> */}

      <Link to='/' className="logo_full"><img src={logo}  className="w-full h-full object-cover"/></Link>

      <Link to='/' className="logo_mobile w-24 h-10 "><img src={logo2}  className="w-full h-full object-cover"/></Link>
        <div className="hidden lg:flex min-w-[25%] justify-between border-[#ff0009] border-2 py-5 px-1 rounded-2xl bg-black  ">
          <Link to='/' className={`py-3 px-1 rounded-xl text-white font-bold ${pathname === '/' && 'bg-[#ff0009] '}`}>მთავარი</Link>
          <Link to='/movies' className={`py-3 px-1 rounded-xl text-white font-bold ${pathname === '/movies' && 'bg-[#ff0009] '}`}>ფილმები</Link>
          <Link to='/serials' className={`py-3 px-1 rounded-xl text-white font-bold ${pathname === '/serials' && 'bg-[#ff0009] '}`}>სერიალები</Link>
          <Link to='animes' className={`py-3 px-1 rounded-xl text-white font-bold ${pathname === '/animes' && 'bg-[#ff0009] '}`}>ანიმეები</Link>
        </div>
        <div className="hidden lg:flex items-center justify-end gap-5 lg:w-[15vw] xl:w-[20vw]">
          <div className=" flex justify-start">
            <input className=" font-bold  bg-black text-white p-3 outline-none rounded-l-xl w-full " placeholder="ძებნა..." />
            <button className="bg-black text-white rounded-r-xl px-2 font-black"><HiMagnifyingGlass /></button>
          </div>
          <Link to='login' className="text-4xl text-[#ff0009]"><HiOutlineUserCircle /></Link>
        </div>
        {/* </div> */}


        {/* mobile menu */}
        <div className="lg:hidden text-3xl">
          <div onClick={() => setIsSidebarOpen(is => !is)} className="text-white">
            <HiBars3 />
          </div>
          {isSidebarOpen && (
            <div className="absolute left-0 top-20 w-[100vw] h-[100vh] z-50 bg-black">
              <div className="flex flex-col  gap-5 mt-10 ml-10">
              <div className="flex justify-start  ">
                    <input className="bg-white w-[70vw] p-2 outline-none rounded-l-xl text-black text-xl" placeholder="ძებნა..." />
                    <button className="bg-white text-[#ff0009] p-2 rounded-r-xl"><HiMagnifyingGlass /></button>
                  </div>
                <div className="flex flex-col  items-start text-xl gap-5 mt-5">
                  <div className="text-white">
                  <Link to='/' onClick={() => setIsSidebarOpen(false)}>მთავარი</Link>
                  </div>

                  <div className="text-white">
                  <Link to='/movies' onClick={() => setIsSidebarOpen(false)}>ფილმები</Link>
                  </div>

                  <div className="text-white">
                  <Link to='/serials' onClick={() => setIsSidebarOpen(false)}>სერიალები</Link>
                  </div>

                  <div className="text-white">
                  <Link to='animes' onClick={() => setIsSidebarOpen(false)}>ანიმაციები</Link>
                  </div>
                  <div className="bg-[#ff0009] p-2 rounded-xl text-white mt-10">
                  <Link to='/login' onClick={() => setIsSidebarOpen(false)}>შესვლა</Link>
                </div>
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </header>

  )
}

export default Header
