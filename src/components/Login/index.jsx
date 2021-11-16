import { useState } from 'react';
// import axios from 'axios';
import './index.css';

const Login = () => {
    const [isFront, setIsFront] = useState(true);
    // const [name, setName] = useState('');
    // const [pwd, setPwd] = useState('');
    // const [rname, setRname] = useState('');
    // const [rpwd, setRpwd] = useState('');
    // const register = () => {};
    const toggle = () => setIsFront(isFront => !isFront);
    return (
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
            <div
                className="row container_card center-block"
                style={isFront ? {} : { transform: 'rotateY(180deg)' }}
            >
                {/* <!-- 登录页面 --> */}
                <div className="login" id="login">
                    {/* <!-- 登录页面的表单上的提示信息及图形跳转 --> */}
                    <div className="row">
                        <div
                            id="info_login"
                            className="text-center info_login contatiner col-lg-8 col-xs-8"
                            style={{ visibility: 'visible' }}
                        >
                            <p>hi！老朋友</p>
                            <div
                                className="text-center"
                                id="info_login_toLogin"
                                style={{
                                    borderRadius: '30px',
                                    backgroundColor: '#5fb563',
                                    width: '35px',
                                    height: '22px',
                                    position: 'absolute',
                                    bottom: '40px',
                                    right: '5%',
                                }}
                            >
                                {/* <span
                                    style={{ color: 'white' }}
                                    className="glyphicon glyphicon-share-alt"
                                ></span> */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- 登录表单 --> */}
                    <div action="" method="" className="form-horizontal" role="form">
                        {/* <!-- 登录的用户名组 --> */}
                        <div className="form-group">
                            <label htmlFor="login_userName" className=" col-lg-5 col-md-5 col-xs-5">
                                <span style={{ color: 'indianred' }}>登录</span>
                                用户名
                            </label>
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    required="required"
                                    className="form-control"
                                    name="login_userName"
                                    id="login_userName"
                                    placeholder="请输入登录用户名"
                                />
                            </div>
                        </div>
                        {/* <!-- 登录的密码组 --> */}
                        <div className="form-group">
                            <label
                                htmlFor="login_passWord"
                                className="col-lg-12 col-md-12 col-xs-12"
                            >
                                密码
                            </label>
                            <div className="col-md-12">
                                <input
                                    type="password"
                                    required="required"
                                    className="form-control"
                                    name="login_passWord"
                                    id="login_passWord"
                                    placeholder="请输入登录密码"
                                />
                            </div>
                        </div>
                        {/* <!-- 登录的提交组 --> */}
                        <div className="form-group">
                            <div className="col-md-12">
                                <input
                                    id="login_btn"
                                    className="col-lg-12 col-xs-12 btn btn-primary"
                                    type="submit"
                                    name=""
                                    value="登录"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <!-- 文字跳转去注册页面 --> */}
                    <span className="tabText" onClick={toggle}>
                        点击这里注册
                    </span>
                </div>
                {/* <!-- 注册页面 --> */}
                <div className="register" id="register">
                    {/* <!-- 注册页面的表单上的提示信息及图形跳转 --> */}
                    <div className="row">
                        <div
                            id="info_register"
                            className="text-center info_register contatiner col-lg-8 col-xs-8"
                            style={{ visibility: 'visible' }}
                        >
                            <p>hi！新老师</p>
                            <div
                                className="text-center"
                                id="info_register_toRegister"
                                style={{
                                    borderRadius: '3px',
                                    backgroundColor: 'gray',
                                    width: '35px',
                                    height: '22px',
                                    position: 'absolute',
                                    bottom: '40px',
                                    right: '5%',
                                }}
                            >
                                {/* <span className="glyphicon glyphicon-share-alt"></span> */}
                            </div>
                        </div>
                    </div>
                    {/* <!-- 注册表单 --> */}
                    <div action="" method="" className="form-horizontal" role="form">
                        {/* <!-- 注册的用户名组 --> */}
                        <div className="form-group">
                            <label htmlFor="userName" className="col-lg-5 col-md-5 col-xs-5">
                                <span style={{ color: 'indianred' }}>注册</span>
                                用户名
                            </label>
                            <div className="col-md-12">
                                <input
                                    type="text"
                                    required="required"
                                    className="form-control"
                                    name="userName"
                                    id="register_userName"
                                    placeholder="请输入注册用户名"
                                />
                            </div>
                        </div>
                        {/* <!-- 注册的密码组 --> */}
                        <div className="form-group">
                            <label
                                htmlFor="register_passWord"
                                required="required"
                                className="col-lg-12 col-md-12 col-xs-12"
                            >
                                密码
                            </label>
                            <div className="col-md-12">
                                <input
                                    type="password"
                                    className="form-control"
                                    name="register_passWord"
                                    id="register_passWord"
                                    placeholder="请输入注册密码"
                                />
                            </div>
                        </div>
                        {/* <!-- 注册的提交组 --> */}
                        <div className="form-group">
                            <div className="col-md-12">
                                <input
                                    id="register_btn"
                                    className="col-lg-12 col-xs-12 btn btn-primary"
                                    type="submit"
                                    value="注册"
                                />
                            </div>
                        </div>
                    </div>
                    <span className="tabText" onClick={toggle}>
                        点击这里登录
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
