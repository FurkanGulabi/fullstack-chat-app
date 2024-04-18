import React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { useAuthContext } from "../../contexts/AuthContext";
import useSendVerificationEmail from "../../hooks/useSendVerificationEmail";
import { message } from "antd";

const VerifyEmail = () => {
    const { authUser } = useAuthContext();
    const { sendVerificationEmail } = useSendVerificationEmail()

    const handleSendVerificationEmail = async () => {
        try {
            await sendVerificationEmail()

        } catch (error) {
            message.error(error.message)
        }
    }
    return (
        <div className="ml-3">
            {!authUser.isVerified ? (
                <button onClick={handleSendVerificationEmail} className="btn btn-outline btn-info">E-Posta Doğrula</button>
            ) : (
                <button className="btn btn-outline btn-info" disabled={authUser.isVerified}>
                    <div className="flex">
                        <AiOutlineCheck className="mr-2" />
                        E-posta doğrulandı
                    </div>
                </button>
            )}
        </div>
    );
};

export default VerifyEmail;
