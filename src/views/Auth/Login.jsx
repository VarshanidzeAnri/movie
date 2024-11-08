import { useRef, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import axiosClient from "../../axios-clinet";
import { useStateContext } from "../../contexts/ContextProvider";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState([]);

    const {token, setToken} = useStateContext();
    if(token) return <Navigate to='/' />

    const loginForm = (e) => {
        e.preventDefault();
        
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        



        axiosClient.post('/login', data)
        .then(({data}) => {
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response
            setErrors(response.data.errors)
        })
    }

    

    return (
        <div className="w-80 mx-auto mt-40 md:mt-60">
            <form onSubmit={loginForm} className=" flex flex-col items-center gap-5 p-5 w-80 border-x-zinc-900 border-2 ">
                <div>შესვლა</div>
                <div className="w-full flex flex-col gap-2">
                    <label>იმეილი</label>
                    <input ref={emailRef} className="w-full p-2 text-black" type="email" placeholder="address@gmail.com" />
                    {errors && <p className="text-red-500">{errors.email}</p>}
                </div>
                
                <div className="w-full flex flex-col gap-2">
                    <label>პაროლი</label>
                    <input ref={passwordRef} className="w-full p-2 text-black" type="password" placeholder="********" />
                    {errors && <p className="text-red-500">{errors.password}</p>}

                </div>
                <button type="submit" className="w-full bg-[#ff0009] p-2 text-white rounded-lg cursor-pointer">შესვლა</button>
            </form>
            <p className=" p-5 ">არ ხართ მომხმარებელი? <Link to='/register' className="underline text-[#ff0009]">დარეგისტრირდი</Link></p>
        </div>
    )
}

export default Login
