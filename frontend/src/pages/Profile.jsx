import { Typography } from 'antd';
import React, { useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import Logout from '../components/profile/Logout';
import VerifyEmail from '../components/profile/VerifyEmail.jsx';
import { useLocation } from 'react-router-dom'
import useReAuth from '../hooks/useReAuth.js';

const { Title } = Typography;

const Profile = () => {
    const { authUser } = useAuthContext();
    const location = useLocation(); // useLocation hook'unu ekliyoruz
    const { reAuth } = useReAuth()
    const searchParams = new URLSearchParams(location.search);
    const verifiedParam = searchParams.get('verified');

    useEffect(() => {
        if (verifiedParam === 'true') {
            // Kullanıcı doğrulandı, yapılacak işlemler buraya
            reAuth()
        }
    }, [verifiedParam]); // v


    // Üye olduğu tarih
    const memberSince = new Date(authUser.createdAt);
    // Şu anki tarih
    const today = new Date();

    // Farkı hesapla
    const diffInDays = Math.floor((today - memberSince) / (1000 * 60 * 60 * 24)); // Gün cinsinden fark

    let memberSinceText = '';
    if (diffInDays < 30) {
        memberSinceText = `${diffInDays} Gün`;
    } else if (diffInDays < 365) {
        const diffInMonths = Math.floor(diffInDays / 30);
        memberSinceText = `${diffInMonths} Ay`;
    } else {
        const diffInYears = Math.floor(diffInDays / 365);
        memberSinceText = `${diffInYears} Yıl`;
    }

    return (
        <div className='h-100 w-1/3 border flex flex-col items-center border-white rounded-xl backdrop:blur-md  pt-11 pb-11'>
            <div className="avatar">
                <div className="w-44 rounded-full">
                    <img src={authUser.profilePic} alt="Avatar" />
                </div>
            </div>
            <div className='text-center'>
                <Title level={2} className='mt-2 !mb-0' style={{ color: 'white' }}>{authUser.username}</Title>
                <span className='label-text-alt italic'> {authUser.email}</span>
                {/* Member Since */}
                <div className="text-sm text-gray-400 mt-2 mb-2">Üyelik Süresi {memberSinceText}</div>
            </div>
            <div className='flex flex-row'>
                <Logout />
                <VerifyEmail />
            </div>
        </div>
    );
};

export default Profile;
