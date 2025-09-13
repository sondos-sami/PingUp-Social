import axios from "axios";

export async function updateComment(data, id) {
  console.log("userData", comment);
  try {
    const response = await axios.put(
      `https://linked-posts.routemisr.com/comments/${id}`,
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  } catch (error) {
    console.log("error", error);
  }
  async function updateComment() {
    console.log(comment._id);
    try {
      const response = await axios.put(
        `https://linked-posts.routemisr.com/comments/${comment._id}`,
        {
          content,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  }
}
