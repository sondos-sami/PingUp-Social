 import { ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function CreatePosts({ onClose, mode = "create", postId, initialBody = "", initialImage = null }) {
  const [body, setBody] = useState(initialBody);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialImage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

 
  useEffect(() => {
    setBody(initialBody);
    setImage(null);
    setImagePreview(initialImage);
  }, [initialBody, initialImage]);

  function handleFileChange(e) {
    if (e.target.files.length !== 0) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleRemoveImage() {
    setImage(null);
    setImagePreview(null);
    document.querySelector("#fileInput").value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (body.trim() === "" && !image && !imagePreview) {
      setError("Post cannot be empty.");
      return;
    }

    const formData = new FormData();
    if (body.trim() !== "") formData.append("body", body);
    if (image) formData.append("image", image);

    setIsSubmitting(true);

    try {
      let response;
      if (mode === "create") {
        response = await axios.post(
          "https://linked-posts.routemisr.com/posts",
          formData,
          { headers: { token: localStorage.getItem("token") } }
        );
      } else if (mode === "edit" && postId) {
        response = await axios.put(
          `https://linked-posts.routemisr.com/posts/${postId}`,
          formData,
          { headers: { token: localStorage.getItem("token") } }
        );
      }

      if (response.data.message === "success") {
        handleRemoveImage();
        setBody("");
        onClose();
        queryClient.invalidateQueries({ queryKey: ["userPosts"] }); 
          queryClient.invalidateQueries({ queryKey: ['posts'] }); 
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {mode === "create" ? "Create Post" : "Edit Post"}
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <div className="space-y-4">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="3"
            />

            {imagePreview && (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200"
                >
                  ✕
                </button>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex items-center justify-between w-full">
            <label className="cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200">
              <input
                onChange={handleFileChange}
                type="file"
                accept="image/*"
                className="hidden"
                id="fileInput"
              />
              <div className="flex items-center space-x-2">
                📷 <span className="text-sm font-medium">Photo</span>
              </div>
            </label>

            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                type="button"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
              >
                Cancel
              </button>
              <button
                disabled={isSubmitting || (body.trim() === "" && !image && !imagePreview)}
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {isSubmitting ? (mode === "create" ? "Posting..." : "Updating...") : mode === "create" ? "Post" : "Update"}
              </button>
            </div>
          </div>
        </ModalFooter>
      </form>
    </>
  );
}
