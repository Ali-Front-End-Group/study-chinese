import { useState } from 'react';
import { message } from 'antd';
import { CheckOutlined, ExclamationOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { setIsLogin } from '../../redux/actions';
import { registerAPI, loginAPI } from '../../utils/api';
import { openNotification } from '../../utils/functions';
import './index.css';

const Login = ({ setIsLogin }) => {
    const [isFront, setIsFront] = useState(true);
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [rname, setRname] = useState('');
    const [rpwd, setRpwd] = useState('');
    // 注册
    const register = async () => {
        if (!rname || !rpwd) {
            message.warning('请输入账号和密码再注册！');
            return;
        }
        const { isTrue, text } = await registerAPI(rname, rpwd);
        if (isTrue) {
            openNotification(text, <CheckOutlined />);
            toggle();
            setRname('');
            setRpwd('');
        } else {
            openNotification(text, <ExclamationOutlined />);
        }
    };
    // 登录
    const login = async () => {
        if (!name || !pwd) {
            message.warning('请输入账号和密码再登录！');
            return;
        }
        const { isTrue, id, token, text } = await loginAPI(name, pwd);
        if (isTrue) {
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            openNotification(text, <CheckOutlined />);
            setIsLogin(true);
        } else {
            message.error(text);
        }
    };
    // 切换登录/注册
    const toggle = () => setIsFront(isFront => !isFront);
    // 判断按下回车
    const enter = (e, isLogin) => {
        if (e.key !== 'Enter') return;
        if (isLogin) {
            login();
        } else {
            register();
        }
    };
    return (
        <div className="animated bounceInDown">
            <div className="loginRegister" style={isFront ? {} : { transform: 'rotateY(-90deg)' }}>
                <div className="loginBox" style={isFront ? {} : { boxShadow: 'none' }}>
                    <input
                        className="userInput"
                        type="text"
                        placeholder="登录用户名"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        onClick={e => e.stopPropagation()}
                    />
                    <br />
                    <input
                        className="userInput"
                        type="password"
                        placeholder="登录密码"
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        onKeyDown={e => enter(e, true)}
                    />
                    <br />
                    <div className="longBtn" onClick={login}>
                        登录
                    </div>
                    <div className="loginLine"></div>
                    <div className="loginBtnBox">
                        <div className="shortBtn" onClick={toggle}>
                            去注册
                        </div>
                    </div>
                </div>
                <div className="registerBox" style={isFront ? { boxShadow: 'none' } : {}}>
                    <input
                        className="userInput"
                        type="text"
                        placeholder="注册用户名"
                        value={rname}
                        onChange={e => setRname(e.target.value)}
                        onClick={e => e.stopPropagation()}
                    />
                    <br />
                    <input
                        className="userInput"
                        type="password"
                        placeholder="注册密码"
                        value={rpwd}
                        onChange={e => setRpwd(e.target.value)}
                        onClick={e => e.stopPropagation()}
                        onKeyDown={e => enter(e, false)}
                    />
                    <br />
                    <div className="longBtn" onClick={register}>
                        注册
                    </div>
                    <div className="loginLine"></div>
                    <div className="loginBtnBox">
                        <div className="shortBtn" onClick={toggle}>
                            去登录
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(() => ({}), {
    setIsLogin,
})(Login);
