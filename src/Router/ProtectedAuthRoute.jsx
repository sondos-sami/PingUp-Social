import { Navigate } from "react-router-dom"

function ProtectedAuthRoute({children}) {
    let isLoggedIn=localStorage.getItem("token")
    return (
       !isLoggedIn?children:<Navigate to={"/auth/login"}/>
    )
}

export default ProtectedAuthRoute
