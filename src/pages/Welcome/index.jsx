// import { useState, useEffect } from 'react';
import Login from '../../components/Login';
import './index.css';

const Welcome = () => {
    return (
        <div className="welcomeBox">
            <div className="left">大图、特效、Logo</div>
            <div className="right">
                <Login className="login" />
            </div>
        </div>
    );
};

export default Welcome;
