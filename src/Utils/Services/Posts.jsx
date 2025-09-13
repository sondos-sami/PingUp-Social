import axios from "axios";

export async function getPosts() {
    try {
      const {data } = await axios.get(
        "https://linked-posts.routemisr.com/posts?limit=50",
        {
          headers: {
            token: localStorage.getItem("token"),
        
          },
          params:{
         sort:"-createdAt"
           
          }
        }
      );
       
  return data ;
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  
export async function updatePosts(id,content) {
    try {
      const {data } = await axios.put(
        `https://linked-posts.routemisr.com/posts/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
            data:content,
        
          },
         
        }
      );
      console.log("API Response:", data);
  return data ;
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }