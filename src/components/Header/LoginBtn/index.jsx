// import { useState, useEffect } from 'react';
import './index.css';

const LoginBtn = ({ setIsLogin }) => {
    // 登录
    const login = () => {
        setIsLogin(true);
    };
    return (
        <div className="loginBtn" onClick={login}>
            登录
        </div>
    );
};

export default LoginBtn;
