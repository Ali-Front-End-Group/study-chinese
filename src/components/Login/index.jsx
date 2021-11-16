import { useState } from 'react';
import { message } from 'antd';
import axios from 'axios';
import { DB_URL, TOKEN } from '../../utils/constant';
import './index.css';

const Login = () => {
    // const [isFront, setIsFront] = useState(true);
    const [name, setName] = useState('');
    const [pwd, setPwd] = useState('');
    const [rname, setRname] = useState('');
    const [rEmail, setREmail] = useState('');
    const [rpwd, setRpwd] = useState('');
    const register = () => {
        if (!rname || !rpwd) {
            message.warning('请输入账号和密码再注册！');
            return;
        }
        axios({
            url: `${DB_URL}/register`,
            method: 'post',
            body: {
                username: rname,
                password: rpwd,
                email: rEmail,
                date_joined: '2021-11-14',
                nickname: 'jack',
                avatar: 'afasdf',
                bio: 'sdfasdfsf',
                gender: '男',
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    message.success('注册成功，请登录！');
                    console.log(res);
                    setRname('');
                    setREmail('');
                    setRpwd('');
                } else {
                    message.error('注册失败，请重试！');
                }
            },
            err => {
                message.error('注册失败，请重试！');
                console.log(err);
            }
        );
    };
    const login = () => {
        if (!name || !pwd) {
            message.warning('请输入账号和密码再登录！');
            return;
        }
        axios({
            url: `${DB_URL}/login`,
            method: 'post',
            params: {
                username: name,
                password: pwd,
            },
        }).then(
            res => {
                // if (res.data.result === 'success') {
                //     message.success('注册成功，请登录！');
                //     setRname('');
                //     setREmail('');
                //     setRpwd('');
                // } else {
                //     message.error('注册失败，请重试！');
                // }
                console.log(res);
            },
            err => {
                message.error('注册失败，请重试！');
                console.log(err);
            }
        );
    };
    // const toggle = () => setIsFront(isFront => !isFront);
    return (
        <div className="loginBox">
            账户：
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <br />
            密码：
            <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
            <br />
            <button onClick={login}>登录</button>
            <br />
            账户：
            <input type="text" value={rname} onChange={e => setRname(e.target.value)} />
            <br />
            邮箱：
            <input type="text" value={rEmail} onChange={e => setREmail(e.target.value)} />
            <br />
            密码：
            <input type="password" value={rpwd} onChange={e => setRpwd(e.target.value)} />
            <br />
            <button onClick={register}>注册</button>
        </div>
    );
};

export default Login;
