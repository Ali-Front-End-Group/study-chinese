// import { useState, useEffect } from 'react';
import Login from '../../components/Login';
import './index.css';

const Welcome = () => {
    return (
        <div className="welcomeBox">
            {/* 左边 */}
            <div className="left">
                <img style={{ width: ' 500px' }} src="/img/Saly-10_2.png" alt="logo" />
            </div>
            {/* 右边 */}
            <div className="right">
                <Login />
            </div>
        </div>
    );
};

export default Welcome;
