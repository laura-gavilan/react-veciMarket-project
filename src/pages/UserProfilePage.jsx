import { Link } from "react-router-dom"


export const UserProfilePage = () => {
    return(
                <div className="user-profile">
            <h1>User</h1>

            <div className="links-profile">
                <Link to="/user/profile" className="link-item">
                    Profile
                </Link>
            </div>

            <Outlet />
        </div>
    )
}