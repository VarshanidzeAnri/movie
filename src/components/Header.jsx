import { Link, useResolvedPath } from "react-router-dom"
import { HiBars3 } from "react-icons/hi2";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState } from "react";
import logo from "./../../public/logo/logo.png"




function Header() {
  let [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useResolvedPath()
  return (
    <header className="flex justify-center bg-zinc-900 fixed top-0 w-full z-50">

      <div className="flex justify-between items-center w-[80%] mx-auto py-5">
    <Link to='/' className=""><img src={logo}  className="w-full h-full object-cover"/></Link>
        <div className="hidden lg:flex min-w-[25vw] justify-around border-[#ff0009] border-2 py-5 px-2 rounded-2xl bg-black">
          <Link to='/' className={`p-3 rounded-xl text-white font-bold ${pathname === '/' && 'bg-[#ff0009] '}`}>მთავარი</Link>
          <Link to='/movies' className={`p-3 rounded-xl text-white font-bold ${pathname === '/movies' && 'bg-[#ff0009] '}`}>ფილმები</Link>
          <Link to='/serials' className={`p-3 rounded-xl text-white font-bold ${pathname === '/serials' && 'bg-[#ff0009] '}`}>სერიალები</Link>
          <Link to='animes' className={`p-3 rounded-xl text-white font-bold ${pathname === '/animes' && 'bg-[#ff0009] '}`}>ანიმეები</Link>
        </div>
        <div className="hidden lg:flex items-center justify-end gap-5 w-32">
          <div className=" flex justify-start ">
            <input className="w-[10vw] font-bold  bg-black text-white p-3 outline-none rounded-l-xl" placeholder="ძებნა..." />
            <button className="bg-black text-white rounded-r-xl px-2 font-black"><HiMagnifyingGlass /></button>
          </div>
          <Link to='login' className="text-4xl text-[#ff0009]"><HiOutlineUserCircle /></Link>
        </div>

        <div className="lg:hidden text-3xl">
          <div onClick={() => setIsSidebarOpen(is => !is)}>
            <HiBars3 />
          </div>
          {isSidebarOpen && (
            <div className="absolute left-0 top-15 w-[100vw] h-[100vh] z-50 bg-black">
              <div className="flex flex-col  gap-5 mt-10 ml-10">
              <div className="flex justify-start  ">
                    <input className="bg-stone-500 w-[70vw] p-2 outline-none rounded-l-xl" />
                    <button className="bg-stone-500 p-2 rounded-r-xl"><HiMagnifyingGlass /></button>
                  </div>
                <div className="flex flex-col text-xl gap-5 mt-5">
                  <Link to='/' onClick={() => setIsSidebarOpen(false)}>მთავარი</Link>
                  <Link to='/movies' onClick={() => setIsSidebarOpen(false)}>ფილმები</Link>
                  <Link to='/serials' onClick={() => setIsSidebarOpen(false)}>სერიალები</Link>
                  <Link to='animes' onClick={() => setIsSidebarOpen(false)}>ანიმაციები</Link>
                </div>
                <div className="flex flex-col gap-5 mt-10 text-xl">
                  <Link to='/login' onClick={() => setIsSidebarOpen(false)}>შესვლა</Link>
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
