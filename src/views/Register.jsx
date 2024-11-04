import { useRef } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import axiosClient from "../axios-clinet";
import { useStateContext } from "../contexts/ContextProvider";

function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPassword = useRef();

    const {token, setToken} = useStateContext();
    if(token) return <Navigate to='/' />

    const register = (e) => {
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPassword.current.value,
        }

        axiosClient.post('/register', data)
        .then(({data}) => {            
            setToken(data.token, data.role)            
        })
        .catch(err => {
            const response = err.response;
            console.log(response);
        })
        
    }

    return (
        <div className="w-80 mx-auto mt-40 md:mt-60">
            <form onSubmit={register} className="flex flex-col items-center gap-5 p-5 w-80 border-x-zinc-900 border-2 ">
                <div>რეგისტრაცია</div>
                <div className="w-full flex flex-col gap-2">
                    <label>სახელი</label>
                    <input ref={nameRef} className="w-full p-2 text-black" type="text" placeholder="Jon Doe" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>იმეილი</label>
                    <input ref={emailRef} className="w-full p-2 text-black" type="email" placeholder="address@gmail.com" />
                </div>
                
                <div className="w-full flex flex-col gap-2">
                    <label>პაროლი</label>
                    <input ref={passwordRef} className="w-full p-2 text-black" type="password" placeholder="********" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>დაადასტურე პაროლი</label>
                    <input ref={confirmPassword} className="w-full p-2 text-black" type="password" placeholder="********"  />
                </div>
                <button type="submit" className="w-full bg-[#ff0009] p-2 text-white rounded-lg">რეგისტრაცია</button>
            </form>
            <p className=" p-5 ">ხართ მომხმარებელი? <Link to='/login' className="underline text-[#ff0009]">შესვლა</Link></p>
        </div>
    )
}

export default Register
