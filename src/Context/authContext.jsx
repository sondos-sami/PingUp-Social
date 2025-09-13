import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();
function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
  const [userData, setUserData] = useState(null);
  async function getUserData() {
    try {
      const {
        data: { user },
      } = await axios.get(
        "https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setUserData(user);
     
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (isLoggedIn){ getUserData();  console.log(userData)}
    
  }, [isLoggedIn]);
  return (
    <authContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, setUserData, userData }}
    >
      {children}
    </authContext.Provider>
  );
}

export default AuthContextProvider;
