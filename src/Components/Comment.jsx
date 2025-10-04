import image from "../assets/Portrait_Placeholder.png";
import { formatCreatedAt } from "../Utils/FormatDate";
import axios from "axios";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
} from "@heroui/react";
import { authContext } from "../Context/authContext";
import { useContext, useState } from "react";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

function Comment({ comment, userId }) {
  const { userData } = useContext(authContext);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(comment?.content);
const queryClient= useQueryClient()
  async function deleteComment() {
    try {
      const response = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${comment?._id}`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
       queryClient.invalidateQueries({ queryKey: ['posts'] }); 
      console.log("Comment deleted:", response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

 
  const { mutate: handleUpdate, isLoading: updating } = useMutation({
    mutationKey: ["UpdateComment", comment?._id],
    mutationFn: async () => {
      const response = await axios.put(
        `https://linked-posts.routemisr.com/comments/${comment?._id}`,
        { content },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      setIsEditing(false);  
       queryClient.invalidateQueries({ queryKey: ['posts'] }); 
    },
    onError: (err) => {
      console.log("Update error:", err);
    },
  });

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Profile picture */}
      <div className="flex-shrink-0">
        <img
          onError={(e) => {
            e.target.src = image;
          }}
         
           src={
    comment?.commentCreator?._id === userData?._id
      ? userData?.photo || image
      : comment.commentCreator?.photo || image
  }
          alt={`${comment?.commentCreator?.name}'s profile`}
          className="w-10 h-10 rounded-full bg-gray-200 object-cover"
        />
      </div>
  
      {/* Comment content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <h1 className="font-bold text-gray-900 truncate">
              {comment?.commentCreator?.name || "Unknown User"}
            </h1>
            <span className="text-xs text-gray-400">•</span>
            <h3 className="text-gray-500 text-sm whitespace-nowrap">
              {formatCreatedAt(comment?.createdAt)}
            </h3>
          </div>

          {/* Dropdown menu for actions */}
          {comment?.commentCreator?._id === userData?._id &&
            userId === userData._id && (
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    isIconOnly
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Comment actions"
                  onAction={(key) => {
                    if (key === "delete") {
                      deleteComment();
                    } else if (key === "edit") {
                      setIsEditing(true);
                    }
                  }}
                >
                  <DropdownItem key="edit">Edit</DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
        </div>

        {/* Content */}
        {!isEditing ? (
          <p className="mt-1 text-gray-800 break-words">{comment?.content}</p>
        ) : (
          <div className="mt-2">
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full"
              variant="bordered"
              fullWidth
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                color="default"
                variant="bordered"
                onClick={() => {
                  setIsEditing(false);
                  setContent(comment?.content);
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => handleUpdate()}
                isLoading={updating}
              >
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
