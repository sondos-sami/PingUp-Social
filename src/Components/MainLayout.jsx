import { Outlet } from "react-router-dom"
import LeftNavbar from "./leftNavbar"
import RightNavbar from "./RightNavbar"

function MainLayout() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
            
            <div className="hidden md:block md:col-span-2 h-screen sticky top-0 overflow-y-auto">
                <LeftNavbar />
            </div>
 
            <div className="col-span-12 md:col-span-7 lg:col-span-7 overflow-auto bg-gray-100 px-4">
                <Outlet />
            </div>

             
            <div className="hidden lg:block lg:col-span-3 py-4 px-2 sticky top-0 h-screen overflow-y-auto">
                <RightNavbar />
            </div>
        </div>
    )
}

export default MainLayout