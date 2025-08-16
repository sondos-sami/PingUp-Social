import image from "../assets/Portrait_Placeholder.png"
import {formatCreatedAt } from "../Utils/FormatDate";
function Comment({comment}) {
                
    return (
        <div>




           <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
  {/* Profile picture with better error handling */}
  <div className="flex-shrink-0">
    <img 
      onError={(e) => {
        e.target.src = image;
        // e.target.className = "w-10 h-10 rounded-full bg-gray-200 object-cover";
      }}
      src={comment.commentCreator?.photo } 
      alt={`${comment.commentCreator?.name}'s profile`}
      className="w-10 h-10 rounded-full bg-gray-200 object-cover"
    />
  </div>
  
  {/* Comment content */}
  <div className="flex-1 min-w-0">
    <div className="flex items-baseline space-x-2">
      <h1 className="font-bold text-gray-900 truncate">
        {comment.commentCreator?.name || "Unknown User"}
      </h1>
      <span className="text-xs text-gray-400">•</span>
      <h3 className="text-gray-500 text-sm whitespace-nowrap">
        {formatCreatedAt(comment.createdAt)}
      </h3>
    </div>
    
    <p className="mt-1 text-gray-800 break-words">
      {comment.content}
    </p>
    
 
   
  </div>
</div>
        </div>
    )
}

export default Comment
