import { useState, useContext } from 'react';
import { message } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationOutlined } from '@ant-design/icons';
import axios from 'axios';
import qs from 'qs';
import { LoginContext } from '../ContextManager';
import { DB_URL } from '../../utils/constant';
import { openNotification } from '../../utils/functions';
import './index.css';

const Login = () => {
    const { setIsLogin } = useContext(LoginContext);
    const [isFront, setIsFront] = useState(true);
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [rname, setRname] = useState('');
    const [rpwd, setRpwd] = useState('');
    const register = () => {
        if (!rname || !rpwd) {
            message.warning('请输入账号和密码再注册！');
            return;
        }
        const data = { username: rname, password: rpwd };
        axios({
            url: `${DB_URL}/register`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            method: 'post',
            data: qs.stringify(data),
        }).then(
            res => {
                if (res.data.result === 'success') {
                    openNotification('注册成功，请登录！', <CheckOutlined />);
                    toggle();
                    setRname('');
                    setRpwd('');
                } else {
                    openNotification('帐号已存在，请更换一个！', <ExclamationOutlined />);
                }
            },
            err => {
                openNotification('注册失败，请重试！', <CloseOutlined />);
                console.log(err);
            }
        );
    };
    const login = () => {
        if (!name || !pwd) {
            message.warning('请输入账号和密码再登录！');
            return;
        }
        const data = { username: name, password: pwd };
        axios({
            url: `${DB_URL}/login`,
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
        }).then(
            res => {
                if (res.data.result === 'success') {
                    setName('');
                    setPwd('');
                    localStorage.setItem('token', res.data.data.token);
                    localStorage.setItem('id', res.data.data.id);
                    // 设置登录状态
                    setIsLogin(true);
                    openNotification('登录成功！欢迎进入不学汉语！', <CheckOutlined />);
                } else {
                    message.error('登录失败，请重试！');
                }
            },
            err => {
                message.error('登录失败，请重试！');
                console.log(err);
            }
        );
    };
    const toggle = () => setIsFront(isFront => !isFront);
    return (
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
    );
};

export default Login;
