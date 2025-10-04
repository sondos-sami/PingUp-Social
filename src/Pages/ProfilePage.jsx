import { formatCreatedAt } from "../Utils/FormatDate";
import LoadingData from "../Components/LoadingData";
import Post from "../Components/Post";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserPosts, ChangePassword } from "../Utils/Services/Auth";
import { authContext } from "../Context/authContext";
import { useContext, useState } from "react";
import axios from "axios";
 
import { toast, ToastContainer } from "react-toastify";
function ProfilePage() {
  const { userData } = useContext(authContext);
  const queryClient = useQueryClient();

 
  const {
    isOpen: isPhotoOpen,
    onOpen: onPhotoOpen,
    onOpenChange: onPhotoOpenChange,
  } = useDisclosure();
  const {
    isOpen: isPasswordOpen,
    onOpen: onPasswordOpen,
    onOpenChange: onPasswordOpenChange,
  } = useDisclosure();

  // States
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [isUploading, setIsUploading] = useState(false);

 
  const { data, isLoading } = useQuery({
    queryKey: ["userPosts", userData?._id],
    queryFn: () => getUserPosts(userData?._id),
    enabled: !!userData?._id,
  });

  const posts = data?.posts || [];

 
  const uploadPhotoMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("photo", file);

      const { data } = await axios.put(
        "https://linked-posts.routemisr.com/users/upload-photo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );
      return data;
    },
  
onSuccess: (data) => {
  if (data?.message === "success") {
    toast.success("Profile photo updated!");
    setTimeout(() => onPhotoOpenChange(false), 100);
   
    setUserData((prev) => ({
      ...prev,
      photo: data.user.photo,  
    }));

     queryClient.setQueryData(["userPosts", userData?._id], (oldData) => {
      if (!oldData) return oldDat    
      return {
        ...oldData,
        posts: oldData.posts.map(post => ({
          ...post,
          user: {
            ...post.user,
            photo: data.user.photo
          },
          comments: post.comments?.map(comment => ({
            ...comment,
            commentCreator: comment.commentCreator?._id === userData?._id ? {
              ...comment.commentCreator,
              photo: data.user.photo
            } : comment.commentCreator
          })) || []
        }))
      };
    });


    queryClient.setQueryData(["posts"], (oldData) => {
      if (!oldData) return oldData;
      
      return {
        ...oldData,
        posts: oldData.posts.map(post => ({
          ...post,
          user: post.user?._id === userData?._id ? {
            ...post.user,
            photo: data.user.photo
          } : post.user,
          comments: post.comments?.map(comment => ({
            ...comment,
            commentCreator: comment.commentCreator?._id === userData?._id ? {
              ...comment.commentCreator,
              photo: data.user.photo
            } : comment.commentCreator
          })) || []
        }))
      };
    });

    // Invalidate queries to ensure fresh data
    queryClient.invalidateQueries(["userPosts", userData?._id]);
    queryClient.invalidateQueries(["posts"]);
    queryClient.invalidateQueries(["user"]);
    
    setSelectedPhoto(null);
    setPreview(null);
  }
},
 
  });

  // --- File Input ---
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("Maximum file size is 4 MB.");
        return;
      }
      setSelectedPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleRemovePhoto() {
    setSelectedPhoto(null);
    setPreview(null);
    document.querySelector("#photoInput").value = "";
  }

  function handlePhotoSave() {
    if (!selectedPhoto) {
      toast.error("Please select a photo.");
      return;
    }
    uploadPhotoMutation.mutate(selectedPhoto);
  }

  // --- Password Handler ---
  async function handlePasswordSave() {
    if (passwords.newPass !== passwords.confirm) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await ChangePassword({
        password: passwords.current,
        newPassword: passwords.newPass,
      });

      toast.success("Password changed successfully!");
      setPasswords({ current: "", newPass: "", confirm: "" });
      setTimeout(() => onPasswordOpenChange(false), 300);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ToastContainer/>

      {/* Cover Photo */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg relative" />

      {/* Profile Info */}
      <div className="px-6 pb-6 relative">
        <div className="absolute -top-33 left-6">
          <div className="relative">
            <img
              src={preview||  userData?.photo || "../assets/Portrait_Placeholder.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover bg-gray-200 border-4 border-white"
            />
            <button
              onClick={onPhotoOpen}
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
            >
              <i className="fa-solid fa-camera text-gray-700"></i>
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h1 className="text-2xl font-bold">
            {userData?.name || "Unknown User"}
          </h1>
          <p className="text-gray-500">{userData?.email || "username"}</p>

          <div className="flex items-center mt-3 text-gray-500 text-sm space-x-4">
            <span className="flex items-center gap-1">
              <i className="fa-regular fa-calendar"></i>
              Joined {formatCreatedAt(userData?.createdAt) || "Unknown date"}
            </span>
          </div>

          <div className="flex mt-4 space-x-5">
            <div className="flex items-center space-x-1">
              <span className="font-bold">{posts?.length || 0}</span>
              <span className="text-gray-500">Posts</span>
            </div>
          </div>

          {/* Change Password button */}
          <div className="mt-6">
            <Button
              onPress={onPasswordOpen}
              className="bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded-lg"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="lg:p-6 sm:p-0">
        <div className="text-center py-10 text-gray-500">
          <div className="lg:px-[4rem] py-4 space-y-4">
            {isLoading ? (
              <LoadingData times={5} />
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post._id || post.id} post={post} commentLimits={1} />
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>

      {/* --- Change Photo Modal --- */}
      <Modal isOpen={isPhotoOpen} onOpenChange={onPhotoOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Change Profile Photo</ModalHeader>
              <ModalBody>
                <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg hover:border-blue-500 transition">
                  <input
                    id="photoInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span className="text-gray-500">Click to select a photo</span>
                  <span className="text-xs text-gray-400">Max 4 MB</span>
                </label>

                {preview && (
                  <div className="relative mt-3">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={handleRemovePhoto}
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 text-white"
                  onPress={handlePhotoSave}
                  disabled={!selectedPhoto || isUploading}
                >
                  {isUploading ? "Uploading..." : "Save"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

 
      <Modal isOpen={isPasswordOpen} onOpenChange={onPasswordOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Change Password</ModalHeader>
              <ModalBody className="space-y-3">
                <Input
                  type="password"
                  label="Current Password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                />
                <Input
                  type="password"
                  label="New Password"
                  value={passwords.newPass}
                  onChange={(e) =>
                    setPasswords({ ...passwords, newPass: e.target.value })
                  }
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-blue-600 text-white"
                  onPress={handlePasswordSave}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProfilePage;
