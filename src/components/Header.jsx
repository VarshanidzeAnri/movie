import { Link, Navigate, useResolvedPath } from "react-router-dom"
import { HiBars3 } from "react-icons/hi2";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useState } from "react";
import logo from "./../../public/logo/logo.png"
import logo2 from "./../../public/logo/logo2.2.png"
import './header.css'
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-clinet";




function Header() {
  const {token, removeToken, handleMoveTop} = useStateContext();
  let [isOpenUserIcon, setIsOpenUserIcon] = useState(false);
  let [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useResolvedPath()

  const logout = () => {
    setIsOpenUserIcon(false)
    setIsSidebarOpen(false)
    axiosClient.post('/logout')
    .then(() => {
      removeToken();
      location.reload();
    })
    .catch(err => {
      const response = err.response
      console.log(response);
  })
  }

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="flex justify-between items-center w-[90%] mx-auto p-5">
        <Link onClick={handleMoveTop} to='/' className="logo_full">
          <img src={logo} className="w-full h-full object-cover"/>
        </Link>

        <Link onClick={handleMoveTop} to='/' className="logo_mobile w-24 h-10">
          <img src={logo2} className="w-full h-full object-cover"/>
        </Link>
        
        <div className="hidden lg:flex items-center justify-center space-x-8 min-w-[25%]">
          <Link onClick={handleMoveTop} to='/' className={`nav-link ${pathname === '/' && 'active'}`}>მთავარი</Link>
          <Link onClick={handleMoveTop} to='/movies' className={`nav-link ${pathname === '/movies' && 'active'}`}>ფილმები</Link>
          <Link onClick={handleMoveTop} to='/serials' className={`nav-link ${pathname === '/serials' && 'active'}`}>სერიალები</Link>
          <Link onClick={handleMoveTop} to='animes' className={`nav-link ${pathname === '/animes' && 'active'}`}>ანიმეები</Link>
        </div>
        
        <div className="hidden lg:flex items-center justify-end gap-5 lg:w-[15vw] xl:w-[20vw]">
          <div className="search-container flex justify-start">
            <input className="search-input rounded-l-xl w-full" placeholder="ძებნა..." />
            <button className="search-button rounded-r-xl font-bold"><HiMagnifyingGlass /></button>
          </div>
          <div className="relative">
            <div onClick={() => setIsOpenUserIcon(is => !is)} className="user-icon text-4xl"><HiOutlineUserCircle /></div>
           {isOpenUserIcon && token && (
             <div className="user-dropdown absolute top-12 right-5 p-1 flex flex-col gap-1 w-48">
              <Link to='/add' onClick={() => setIsOpenUserIcon(is => !is)} className="cursor-pointer">დამატება</Link>
              <Link to='/my/movies' onClick={() => setIsOpenUserIcon(is => !is)} className="cursor-pointer">ჩემი ფილმები</Link>
              <Link to='/private/movies' onClick={() => setIsOpenUserIcon(is => !is)} className="cursor-pointer">დამალული ფილმები</Link>
              <div className="cursor-pointer" onClick={logout}>გასვლა</div>
            </div>
           )}

           {isOpenUserIcon && !token && (
            <div className="user-dropdown absolute top-12 right-5 p-1 flex flex-col gap-1 w-48">
              <Link onClick={() => setIsOpenUserIcon(is => !is)} to='/login' className="cursor-pointer">შესვლა</Link>
              <Link onClick={() => setIsOpenUserIcon(is => !is)} to='/register' className="cursor-pointer">რეგისტრაცია</Link>
            </div>
           )}
          </div>
        </div>

        {/* mobile menu */}
        <div className="lg:hidden text-3xl">
          <div onClick={() => setIsSidebarOpen(is => !is)} className="user-icon text-white">
            <HiBars3 />
          </div>
          {isSidebarOpen && (
            <div className="mobile-menu absolute left-0 top-20 w-[100vw] h-[100vh] z-50">
              <div className="flex flex-col  gap-5 my-10 ml-10 overflow-auto h-[70%]">
              <div className="flex justify-start ">
                    <input className="bg-white w-[70vw] p-2 outline-none rounded-l-xl text-black text-xl" placeholder="ძებნა..." />
                    <button className="bg-white text-[#ff0009] p-2 rounded-r-xl"><HiMagnifyingGlass /></button>
                  </div>
                <div className="flex flex-col  items-start text-xl gap-5 mt-5">
                  <div className="text-white">
                  <Link  to='/' onClick={() => setIsSidebarOpen(false)}>მთავარი</Link>
                  </div>

                  <div className="text-white">
                  <Link  to='/movies' onClick={() => setIsSidebarOpen(false)}>ფილმები</Link>
                  </div>

                  <div className="text-white">
                  <Link  to='/serials' onClick={() => setIsSidebarOpen(false)}>სერიალები</Link>
                  </div>

                  <div className="text-white">
                  <Link  to='animes' onClick={() => setIsSidebarOpen(false)}>ანიმაციები</Link>
                  </div>

                  
                  <div className="mt-10 flex flex-col gap-7 text-center ">
                  {token ? (
                    <>
                      <div className="bg-[#ff0009] p-2 rounded-xl text-white">
                      <Link  to='/add' onClick={() => setIsSidebarOpen(false)}>დამატება</Link>
                      </div>
                      <div className="bg-[#ff0009] p-2 rounded-xl text-white">
                      <Link  to='/my/movies' onClick={() => setIsSidebarOpen(false)}>ჩემი ფილმები</Link>
                      </div>
                      <div className="bg-[#ff0009] p-2 rounded-xl text-white">
                      <Link  to='/private/movies' onClick={() => setIsSidebarOpen(false)}>დამალული ფილმები</Link>
                      </div>
                      <div className="bg-[#ff0009] p-2 rounded-xl text-white">
                      <div onClick={logout} >გასვლა</div>
                      </div>
                  </>)
                  :
                  (
                  <>
                    <div className="bg-[#ff0009] p-2 rounded-xl text-white">
                    <Link  to='/login' onClick={() => setIsSidebarOpen(false)}>შესვლა</Link>
                    </div>
                    <div className="bg-[#ff0009] p-2 rounded-xl text-white">
                    <Link  to='/register' onClick={() => setIsSidebarOpen(false)}>რეგისტრაცია</Link>
                    </div>
                  </>
                  )  
                }
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

