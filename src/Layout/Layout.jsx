import { Outlet } from "react-router-dom"
import Header from "../components/Header"

function Layout() {
    return (
        <div>
            <div className="">

            <Header />
            </div>

            <div className="mt-40">
            <Outlet />
            </div>


        </div>
    )
}

export default Layout
