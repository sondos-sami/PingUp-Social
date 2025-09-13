import { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  useDisclosure
} from "@heroui/react";

function EditProfile({ isOpen, onOpenChange, onClose }) {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  function handleFileChange(e) {
    if (e.target.files.length !== 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  const handleInputChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate passwords match
    if (password.newPassword !== password.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    try {
      if (image) {
        const formData = new FormData();
        formData.append("photo", image);
        
        await axios.put(
          "https://linked-posts.routemisr.com/users/upload-photo",
          formData,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
      }
      
      if (password.newPassword) {
        await axios.patch(
          "https://linked-posts.routemisr.com/users/change-password",
          {
            password: password.currentPassword,
            newPassword: password.newPassword,
          },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        );
      }
      
      onClose();
    } catch (error) {
      console.log(error);
      alert("Error updating profile: " + (error.response?.data?.message || error.message));
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-4 mb-6">
                <label htmlFor="profile-photo" className="cursor-pointer">
                  <Avatar
                    src={preview || "/default-profile.png"}
                    className="w-24 h-24 text-large"
                  />
                  <input
                    id="profile-photo"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-500">
                  Click on avatar to change photo
                </p>
              </div>

              <div className="space-y-4">
                <Input
                  type="password"
                  label="Current Password"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                />
                <Input
                  type="password"
                  label="New Password"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
                <Input
                  type="password"
                  label="Confirm New Password"
                  name="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" type="submit">
                Save Changes
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
 

export default EditProfile;