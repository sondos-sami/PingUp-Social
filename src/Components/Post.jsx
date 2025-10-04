import axios from "axios";
import Comment from "./Comment";
import { formatCreatedAt } from "../Utils/FormatDate";
import { useNavigate } from "react-router-dom";
import DropDwon from "./DropDwon";
import { Input, Button } from "@heroui/react";
import { useContext, useState } from "react";
import { authContext } from "../Context/authContext";
import { useQueryClient } from "@tanstack/react-query";
function Post({ post, commentLimits }) {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(authContext);
  const [commentContent, setCommentContent] = useState("");
  const queryClient = useQueryClient();
  async function addComment(e) {
    e.preventDefault();
    if (commentContent.length < 2) return;

    try {
      await axios.post(
        "https://linked-posts.routemisr.com/comments",
        {
          content: commentContent,
          post: post?._id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCommentContent("");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("respos");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  }

  const handleClick = () => {
    navigate(`/PostDetails/${post?._id}`);
  };

  return (
    <div className="shadow-2xl bg-white p-4 rounded-2xl space-y-4">
      {/* Author Section */}
      <div className="flex items-center justify-between space-x-3">
        <div className="flex items-center space-x-3">
          <img
            src={post.user?.photo || "/default-profile.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full bg-gray-300"
          />
          <div className="space-y-1">
            <h1 className="font-bold">{post.user?.name || "Unknown User"}</h1>
            <h3 className="text-gray-500 text-sm">
              {formatCreatedAt(post?.createdAt)}
            </h3>
          </div>
        </div>

        {userData?._id === post?.user?._id && <DropDwon post={post} />}
      </div>

      {/* Content Section */}
      <div className="space-y-3">
        <p>{post.body}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="w-full rounded-xl   object-cover "
          />
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 my-2"></div>

        {/* Comment Form */}
        <form
          onSubmit={addComment}
          className="flex sm:gap-0.5  md:gap-2 md:mb-2"
        >
          <Input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            variant="bordered"
            placeholder="Add a comment..."
            aria-label="Comment input"
          />
          <Button
            type="submit"
            disabled={commentContent.length < 2}
            color="primary"
            className="sm:p-1 md:p-4"
          >
            add comment
          </Button>
        </form>

        {/* Comments Section */}
        <button
          className="flex items-center space-x-1 hover:text-blue-500"
          onClick={handleClick}
          aria-label="View comments"
        >
          <i className="fa-solid fa-comment"></i>
          <span>{post.comments?.length || 0} Comments</span>
        </button>

        {post?.comments.reverse()?.length > 0 && (
          <div className="mt-4">
            {post?.comments.slice(0, commentLimits).map((comment) => (
              <Comment
                key={comment?._id}
                comment={comment}
                userId={post?.user?._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
