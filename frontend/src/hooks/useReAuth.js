import { message } from "antd"
import { useState } from "react"
import { useAuthContext } from "../contexts/AuthContext"

const useReAuth = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const reAuth = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/re-auth")
            const data = await res.json()



            if (data.error) {
                throw new Error(data.error)
            }
            if (data && data._id && data.email) {
                localStorage.setItem("auth-user", JSON.stringify(data)); // JSON.stringify kullanarak objeyi stringe dönüştür
                setAuthUser(data);
            }

        } catch (error) {
            message.error(error.message)
        } finally {
            setLoading(false)
        }

    }
    return { loading, reAuth }
}
export default useReAuth