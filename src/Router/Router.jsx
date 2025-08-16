import { createBrowserRouter } from "react-router-dom";
import PostDetails from "../Pages/Posts/PostDetails";
import AuthLayout from "../Components/AuthLayout";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import MainLayout from "../Components/MainLayout";
import ProfilePage from "../ProfilePage";
import FeedPage from "../Pages/FeedPage";
import NotFound from "../Pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAuthRoute from "./ProtectedAuthRoute";
  const Router=createBrowserRouter([
    {path:'',element:<AuthLayout/>,children:[
      {path:"login",element:<ProtectedAuthRoute><LoginPage/></ProtectedAuthRoute> },
      {path:"register",element:<ProtectedAuthRoute><RegisterPage/></ProtectedAuthRoute>},
    ]},
   
{path:'',element:<MainLayout/>,children:[
    {index:true,element:<ProtectedRoute><FeedPage/></ProtectedRoute>},
    {path:'profile',element:<ProtectedRoute><ProfilePage/></ProtectedRoute>},
    {path:"postDetails/:id",element:<ProtectedRoute><PostDetails/></ProtectedRoute>},
     {path:'*',element:<NotFound/>}
]}
     
])
export default Router; 