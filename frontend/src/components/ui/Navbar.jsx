import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import useLogout from '../../hooks/useLogout'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { authUser } = useAuthContext()
    const { logout, loading } = useLogout()
    return (
        <div className='absolute top-0 left-0 right-0'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Chat-App</a>
                </div>
                <div className='flex-1'><Link to={"/"}>Chat</Link></div>
                <div className="flex-none">

                    <div className="dropdown dropdown-end">
                        <div className='tooltip tooltip-left ' data-tip={authUser.username}>
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className={`w-10 rounded-full ${authUser.username == "furkan" ? "ring ring-red-500 ring-offset-base-100 ring-offset-2" : ""}`}>
                                    <img alt="Tailwind CSS Navbar component" src={authUser.profilePic} />
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li className='label-text mb-2 mt-1 ml-2'>{authUser.email}</li>
                            <li>
                                <Link to={"/profile"}>Profile <span className="badge">New</span></Link>
                            </li>
                            <li><Link to={"/settings"}>Settings <span className="badge">New</span></Link></li>
                            <li><a onClick={logout} className={loading ? "disabled" : ""}>
                                {loading ? "Logging Out..." : "Logout"}
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar