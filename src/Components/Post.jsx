import Comment from "./Comment";
import { formatCreatedAt } from "../Utils/FormatDate";
import { useNavigate } from "react-router-dom";
import { Input } from "@heroui/react";
function Post({ post ,commentLimits}) {
    const navigate = useNavigate();
console.log(commentLimits);
    const handleClick = () => {
        navigate(`/PostDetails/${post._id}`);  
    };
 
    if (!post) return <div>Loading post...</div>;

    return (
        <div>
            <div className="shadow-2xl bg-white p-4 rounded-2xl space-y-4">
                {/* Author Section */}
                <div className="flex items-center space-x-3">
                    <img
                        src={post.user?.photo || "/default-profile.png"}
                        alt="Profile"
                        className="w-10 h-10 rounded-full bg-gray-300"
                    />
                    <div className="space-y-1">
                        <h1 className="font-bold">{post.user?.name || "Unknown User"}</h1>
                        <h3 className="text-gray-500 text-sm">
                            {formatCreatedAt(post.createdAt)}
                        </h3>
                    </div>
                </div>

                {/* Content Section */}
                <div className="space-y-3">
                    <p>{post.body}</p>
                    {post.image && (
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full rounded-xl"
                        />
                    )}

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-2"></div>

                    {/* Actions */}
                    <button 
                        className="flex items-center space-x-1 hover:text-blue-500" 
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-comment"></i>
                        <span>{post.comments?.length || 0} Comments</span>
                    </button>
              
         
                  {post.comments?.length > 0 && (
                <div className="mt-4">
                   
                    {post.comments.slice(0,commentLimits+1).map(comment => (
                        <Comment key={comment._id} comment={comment} />
                    ))}
                </div>
            )}
                </div>
            </div>
        </div>
    );
}

export default Post;