import { Link } from "react-router-dom"

function Register() {
    return (
        <div className="w-80 mx-auto mt-60">
            <form className="flex flex-col items-center gap-5 p-5 w-80 border-x-zinc-900 border-2 ">
                <div>რეგისტრაცია</div>
                <div className="w-full flex flex-col gap-2">
                    <label>იმეილი</label>
                    <input className="w-full p-2 text-black" type="text" placeholder="address@gmail.com" />
                </div>
                
                <div className="w-full flex flex-col gap-2">
                    <label>პაროლი</label>
                    <input className="w-full p-2 text-black" type="password" placeholder="********" />
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label>დაადასტურე პაროლი</label>
                    <input className="w-full p-2 text-black" type="password" placeholder="********"  />
                </div>
                <button className="w-full bg-[#ff0009] p-2 text-white">რეგისტრაცია</button>
            </form>
            <p className=" p-5 ">ხართ მომხმარებელი? <Link to='/login' className="underline text-[#ff0009]">შესვლა</Link></p>
        </div>
    )
}

export default Register
