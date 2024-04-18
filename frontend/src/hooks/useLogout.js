import { message } from "antd"
import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            })
            const data = res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.removeItem("auth-user")
            setAuthUser(null)
        } catch (error) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    return { loading, logout }
}
export default useLogout