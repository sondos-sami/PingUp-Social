import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/icons8-power-24.png";
import { Button } from "@heroui/react";
import { useContext } from "react";
import { authContext } from "../Context/authContext";

function LeftNavbar() {
  const {isLoggedIn, setIsLoggedIn }= useContext(authContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="shadow-2xl h-screen">
      <div>
        <div className="flex p-2">
          <img src={icon} alt="Power Icon" />
          <p className="font-bold text-blue-700">PingUp</p>
        </div>
        <div className="border-1 border-gray-300 border-b"></div>
        <div className="p-5 space-y-5">
          <div className="text-gray-500">
            <i className="fa-solid fa-house me-1"></i>
            <Link to="/">
              <span className="font-semibold">Feed</span>
            </Link>
          </div>
          <div className="text-gray-500">
            <i className="fa-solid fa-message me-1"></i>
            <Link to="/">
              <span className="font-semibold">Message</span>
            </Link>
          </div>
          <div className="text-gray-500">
            <i className="fa fa-user-group me-1"></i>
            <Link to="/">
              <span className="font-semibold">Connections</span>
            </Link>
          </div>
          <div className="text-gray-500">
            <i className="fa-solid fa-search me-1"></i>
            <Link to="/">
              <span className="font-semibold">Discover</span>
            </Link>
          </div>
          <div className="text-gray-500">
            <i className="fa fa-user me-1"></i>
            <Link to="/">
              <span className="font-semibold">Profile</span>
            </Link>
          </div>

          <Button variant="shadow" className="w-full text-white text-center bg-blue-600">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full border-1 border-white">
              <i className="fa-solid fa-plus text-2xs"></i>
            </span>
            Create Post
          </Button>

          <div onClick={logOut} className="cursor-pointer text-gray-500">
            <i className="fa-solid fa-right-from-bracket me-1"></i>
            <span className="font-semibold">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftNavbar;