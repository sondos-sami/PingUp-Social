import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/icons8-power-24.png";
import { Modal, ModalContent, Button, useDisclosure } from "@heroui/react";
import { useContext, useState } from "react";
import { authContext } from "../Context/authContext";
import CreatePosts from "../Pages/Posts/CreatePosts";

function TopNavbar() {
  const navigate = useNavigate();
  const { isOpen: isModalOpen, onOpen, onOpenChange } = useDisclosure();
  const { setIsLoggedIn,userData } = useContext(authContext);
 

  const [menuOpen, setMenuOpen] = useState(false);

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0   z-50 md:hidden">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src={icon} alt="logo" className="w-6 h-6" />
          <span className="ml-2 font-bold text-blue-700">PingUp</span>
        </div>

        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <img
              src={userData?.photo}
              alt="user"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium text-sm">{userData?.name}</span>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 hover:text-blue-600 focus:outline-none"
          >
            <i
              className={`fa-solid ${
                menuOpen ? "fa-xmark" : "fa-bars"
              } text-xl`}
            ></i>
          </button>
        </div>
      </div>
 
      {menuOpen && (
        <div className="bg-white border-t border-gray-300 mx-2 shadow-md">
          <div className="px-4 py-3 space-y-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-600 hover:text-blue-600"
            >
              Feed
            </Link>
            <Link
              to="profile"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-600 hover:text-blue-600"
            >
              Profile
            </Link>

            <Button
              onPress={onOpen}
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-plus mr-2"></i>
              Create Post
            </Button>

            <div
              onClick={logOut}
              className="cursor-pointer text-gray-600 hover:text-blue-600"
            >
              <i className="fa-solid fa-right-from-bracket mr-1"></i> Logout
            </div>
          </div>
        </div>
      )}

      {/* Create Post Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => <CreatePosts onClose={onClose} />}
        </ModalContent>
      </Modal>
    </nav>
  );
}

export default TopNavbar;
