import { Outlet } from "react-router-dom";
import LeftNavbar from "./leftNavbar";
import TopNavbar from "./TopNavbar";
import RightNavbar from "./RightNavbar";

function MainLayout() {
  return (
    <div className="flex w-full min-h-screen">
  
      <div className="block md:hidden fixed top-0 left-0 w-full z-50">
        <TopNavbar />
      </div>

    
      <div className="hidden md:block">
        <LeftNavbar />
      </div>
 
      {/* Main Content */}
      <div className="flex-1 px-1 pt-14 md:pt-0 md:ml-64">
         
        <Outlet />
       
      </div>

      {/* Right Sidebar (desktop only) */}
      <div className="hidden lg:block w-80 p-4 border-l border-gray-200">
        <RightNavbar />
      </div>
    </div>
  );
}

export default MainLayout;
