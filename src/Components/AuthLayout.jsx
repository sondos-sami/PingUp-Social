import { Outlet } from "react-router-dom"

function AuthLayout() {
    return (
        <div>
           <Outlet></Outlet>
        </div>
    )
}

export default AuthLayout
