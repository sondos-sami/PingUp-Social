import { Outlet } from "react-router-dom";
import LeftNavbar from "./leftNavbar";
import TopNavbar from "./TopNavbar";
import RightNavbar from "./RightNavbar";

function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left Nav */}
      <div className="hidden md:grid sticky top-0 h-screen">
        <LeftNavbar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        <div className="block md:hidden mb-5">
          <TopNavbar />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto   lg:px-4">
          <Outlet />
        </div>
      </div>

      {/* Right Nav */}
      <div className="hidden lg:block sticky w-70 top-0 h-screen p-4 border-l border-gray-200">
        <RightNavbar />
      </div>
    </div>
  )
}

export default MainLayout;
