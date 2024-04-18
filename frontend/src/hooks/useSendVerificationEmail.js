import { useState } from "react";
import { message } from 'antd'

const useSendVerificationEmail = () => {
    const [loading, setLoading] = useState(false);


    const sendVerificationEmail = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/verify");
            const data = await res.json();

            if (data.error) {
                message.error("Doğrulama mailini her 1 saate bir gönderebilirsiz")
            } else {
                message.success("Doğrulama e-postası gönderildi, gereksiz kutunuzu kontrol etmeyi unutmayın!")
            }


        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false);
        }
    };

    return { sendVerificationEmail, loading };
};
export default useSendVerificationEmail;