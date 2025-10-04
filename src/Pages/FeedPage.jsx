import axios from "axios";
import { useState, useEffect } from "react";
import Comment from "../Components/Comment";
import Post from "../Components/Post";
import LoadingData from "../Components/LoadingData";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../Utils/Services/Posts";
function FeedPage() {
  const{data,isLoading}= useQuery(
    {
      queryKey:['posts'],
      queryFn:getPosts,
      
    }
  )
  const posts=data?.posts||[];
 
  return (
    <div className="sm:px-[2rem] px-0.5 py-4 space-y-4">
      {isLoading ? (
        <LoadingData times={5} />
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} commentLimits={1} />
        ))
      )}
    </div>
  );
}

export default FeedPage;
