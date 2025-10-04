import { NavLink, useNavigate } from "react-router-dom";
import icon from "/icons8-power-24.png";
import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useContext } from "react";
import { authContext } from "../Context/authContext";
import CreatePosts from "../Pages/Posts/CreatePosts";

function LeftNavbar() {
  const navigate = useNavigate();
  const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure();
  const { setIsLoggedIn } = useContext(authContext);

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth/login");
  }

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-300 shadow-md">
      {/* Logo */}
      <div className="flex p-4 items-center justify-between">
        <div className="flex items-center">
          <img src={icon} alt="Power Icon" className="w-6 h-6" />
          <p className="font-bold text-blue-700 ml-2">PingUp</p>
        </div>
      </div>

      <div className="border-b border-gray-300"></div>

      {/* Links */}
      <div className="flex-1 p-5 space-y-5 overflow-y-auto">

        {/* Feed */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center hover:text-blue-600 transition-colors ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700"
            }`
          }
        >
          <i className="fa-solid fa-house me-3"></i>
          Feed
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center hover:text-blue-600 transition-colors ${
              isActive ? "text-blue-600 font-bold" : "text-gray-700"
            }`
          }
        >
          <i className="fa fa-user me-3"></i>
          Profile
        </NavLink>

        {/* Create Post Button */}
        <Button
          onPress={onOpen}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          <span className="flex items-center justify-center h-6 w-6 rounded-full border border-white mr-2">
            <i className="fa-solid fa-plus text-xs"></i>
          </span>
          Create Post
        </Button>

        <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => <CreatePosts onClose={onClose} />}
          </ModalContent>
        </Modal>

        {/* Logout */}
        <div
          onClick={logOut}
          className="cursor-pointer flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket me-3"></i>
          <span className="font-semibold">Logout</span>
        </div>
      </div>
    </div>
  );
}

export default LeftNavbar;
