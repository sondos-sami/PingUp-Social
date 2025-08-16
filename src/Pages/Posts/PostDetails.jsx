import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../../Components/Post";
import LoadingData from "../../Components/LoadingData";
import Comment from "../../Components/Comment"; // Add this import

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null); // Changed to singular 'post'
    const [isLoading, setIsLoading] = useState(true);
   const [visibleCommentsCount, setVisibleCommentsCount] = useState(5);

    async function getSinglePost() {
        try {
            const { data } = await axios.get(
                `https://linked-posts.routemisr.com/posts/${id}`,
                {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }
            );
            setIsLoading(false);
            setPost(data.post);
        } catch (error) {
            setIsLoading(false);
            setError("Failed to load post");
            console.error("Error fetching post:", error);
        }
    }

    useEffect(() => {
        getSinglePost();
    }, [id]);

    if (isLoading) {
        return <LoadingData times={1} />;
    }

   

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="space-y-4">
           <Post post={post} commentLimits={visibleCommentsCount} />
           {post.comments.length>visibleCommentsCount&& <button
                                    onClick={() => setVisibleCommentsCount(prev => prev * 2)}
                                    className="text-blue-500 text-sm hover:underline"
                                >
                                    Load more comments ({post.comments.length - visibleCommentsCount} remaining)
                                </button>}
          
            
        </div>
    );
}

export default PostDetails;