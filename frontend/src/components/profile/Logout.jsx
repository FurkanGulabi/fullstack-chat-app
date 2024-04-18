import React from 'react'
import useLogout from '../../hooks/useLogout'

const Logout = () => {
    const { logout, loading } = useLogout()
    return (
        <div><button className="btn btn-outline btn-error" onClick={logout} disabled={loading}>Çıkış Yap</button></div>
    )
}

export default Logout