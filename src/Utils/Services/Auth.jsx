import axios from "axios";

export async function getUserPosts(id) {
  if (!id) return;

  try {
    const { data } = await axios.get(
      `https://linked-posts.routemisr.com/users/${id}/posts`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
 
    return data;
  } catch (err) {
    console.log(err);
  }
}
 

export async function ChangePassword(passwords) {
  try {
    console.log(localStorage.getItem('token'))
    const { data } = await axios.patch(
      "https://linked-posts.routemisr.com/users/change-password",
      {
       "password": passwords.password,  
        "newPassword": passwords.newPassword,
      },
      {
        headers: {
          
          token: localStorage.getItem("token"),  
        },
      }
    );
    localStorage.setItem("token",data.token);
    return data;
  } catch (err) {
    console.error("ChangePassword error:", err.response?.data || err.message);
    throw err;
  }
}
export async function UploadPhoto() {
  try {
     
    const { data } = await axios.put(
      "https://linked-posts.routemisr.com/users/upload-photo",
      {
       
      },
      {
        headers: {
          
          token: localStorage.getItem("token"),  
        },
      }
    );
  
    return data;
  } catch (err) {
    console.error("upload photo error:", err.response?.data || err.message);
    throw err;
  }
}

