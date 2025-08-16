
 import axios from "axios";
import { useState,useEffect } from "react";
 import Comment from "../Components/Comment";
import Post from "../Components/Post";
import LoadingData from "../Components/LoadingData";
function FeedPage() {
    let [posts,setPosts]=useState([])
    let [isLoading,setIsLoading]=useState(true);
   async function getPosts() {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts?limit=10",
      {
        headers: {
         token:localStorage.getItem("token")
        }
      }
    );
    setIsLoading(false);
    setPosts(data.posts);
    console.log("API Response:", data.posts);
  } catch(error) {
    
    console.error("Error fetching posts:", error); }
}
useEffect(() => {
        getPosts();
    }, []);
    return (
        <div className="px-[4rem] py-4 space-y-4">
           
         
         {isLoading?<LoadingData times={5}/>:posts.map((post)=>
         <Post key={post.id} post={post} commentLimits={1}/>
          
         
        )}
           
        </div>
    )
}

export default FeedPage;