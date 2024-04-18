import { message } from "antd";
import { useState } from "react";

import { useAuthContext } from "../contexts/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (values) => {
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
                credentials: "include",
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            //localstorage
            localStorage.setItem("auth-user", JSON.stringify(data));

            //context
            setAuthUser(data);
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { login, loading };
};

export default useLogin;
