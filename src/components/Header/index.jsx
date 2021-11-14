// import { useState, useEffect } from 'react';
import { MdSpellcheck } from 'react-icons/md';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';
import './index.css';

const Header = ({ isLogin, setIsLogin }) => {
    return (
        <header>
            <MdSpellcheck className="logo" />
            <span>这是header</span>
            {isLogin ? <LogoutBtn setIsLogin={setIsLogin} /> : <LoginBtn setIsLogin={setIsLogin} />}
        </header>
    );
};

export default Header;
