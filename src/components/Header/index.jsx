import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { EnterOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';
import { openNotification } from '../../utils/functions';
import { connect } from 'react-redux';
import { setIsLogin, setUserInfo, setAllCourses } from '../../redux/actions';
import { defaultAvatar } from '../../utils/constant';
import { Popconfirm, Modal, Input, Button, message } from 'antd';
import { DB_URL, appTcb, logoLink } from '../../utils/constant';
import axios from 'axios';
import { nanoid } from 'nanoid';
import List from './List';
import './index.css';

const Header = ({ isLogin, setIsLogin, userInfo, setUserInfo, setAllCourses, history }) => {
    const { TextArea } = Input;
    const text = '确认要退出吗？';
    const [avatarInput, setAvatarInput] = useState(defaultAvatar);
    const [bioInput, setBioInput] = useState('');
    const [nicknameInput, setNicknameInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { avatar, bio, nickname } = userInfo;
    useEffect(() => {
        setAvatarInput(avatar);
        setBioInput(bio);
        setNicknameInput(nickname);
    }, [avatar, bio, nickname]);
    // 上传图片
    const beforeUploadAvatar = () => {
        // 获取文件对象
        const imgFile = document.getElementById('selectAvatar').files[0];
        // 文件类型
        const fileType = imgFile.type;
        // 文件后缀
        const fileEnd = fileType.split('/')[1];
        // 1. 判断是否是图片
        if (
            !(
                fileType === 'image/png' ||
                fileType === 'image/bmp' ||
                fileType === 'image/jpeg' ||
                fileType === 'image/gif'
            )
        ) {
            // 不是图片文件，提醒用户，中止操作
            message.error('请选择图片文件！');
            return;
        }
        // 2. 判断图片大小是否>1M
        if (imgFile.size / 1024 / 1024 > 1) {
            // 图片大于1M，提醒用户，中止操作
            message.error('图片文件大小不能超过1M！');
            return;
        }
        appTcb
            .uploadFile({
                // 云存储的路径
                cloudPath: `avatar/${nanoid()}.${fileEnd}`,
                // 需要上传的文件，File 类型
                filePath: imgFile,
            })
            .then(
                res => {
                    console.log(res.download_url);
                    setAvatarInput(res.download_url);
                    message.success('上传图片成功！');
                },
                () => message.error('上传失败，请重试！')
            );
    };
    // 更新用户信息
    const updateUserInfo = () => {
        axios({
            url: `${DB_URL}/user/update?id=${userInfo.id}`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            data: {
                avatar: avatarInput,
                bio: bioInput,
                nickname: nicknameInput,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    setModalVisible(false);
                    const { avatar, bio, nickname } = res.data.data;
                    setUserInfo({ avatar, bio, nickname });
                    // setAvatarInput(avatar);
                    // setBioInput(bio);
                    // setNicknameInput(nickname);
                    message.success('更新个人信息成功！');
                } else {
                    message.warning('更新个人信息失败！');
                }
            },
            () => {
                message.warning('更新个人信息失败！');
            }
        );
    };
    // 关闭对话框
    const closeModal = () => {
        setModalVisible(false);
        setAvatarInput(avatar);
        setBioInput(bio);
        setNicknameInput(nickname);
    };
    // 去课程页
    const toCoursePage = () => {
        if (!isLogin) return;
        history.push('/admin/course');
    };
    // 退出登录
    const logout = () => {
        setIsLogin(false);
        setUserInfo({ id: '', avatar: '', bio: '', nickname: '' });
        setAllCourses([]);
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('token');
        openNotification('推出成功！欢迎再次使用！', <EnterOutlined />);
    };
    return (
        <>
            <header>
                {isLogin ? (
                    <>
                        <Modal
                            title="教师信息"
                            visible={modalVisible}
                            onCancel={closeModal}
                            bodyStyle={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '350px',
                            }}
                            cancelText="取消"
                            okText="确认"
                            onOk={updateUserInfo}
                        >
                            <img
                                src={avatarInput ? avatarInput : defaultAvatar}
                                alt="avatar"
                                className="avatarModal"
                            />
                            <Button
                                type="primary"
                                icon={<UploadOutlined />}
                                shape="circle"
                                onClick={() => document.getElementById('selectAvatar').click()}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="selectFile"
                                    id="selectAvatar"
                                    onChange={beforeUploadAvatar}
                                />
                            </Button>
                            <Input
                                placeholder="请输入昵称..."
                                value={nicknameInput}
                                onChange={e => setNicknameInput(e.target.value)}
                                maxLength={6}
                            />
                            <TextArea
                                placeholder="请输入个人描述..."
                                rows={3}
                                style={{ resize: 'none' }}
                                value={bioInput}
                                onChange={e => setBioInput(e.target.value)}
                                maxLength={70}
                            />
                        </Modal>
                        <div className="userInfoBox" onClick={() => setModalVisible(true)}>
                            <img
                                className="userAvatar"
                                src={avatar ? avatar : defaultAvatar}
                                alt="avatar"
                            />
                            <div className="userNameBox">{nickname ? nickname : '老师昵称'}</div>
                        </div>
                    </>
                ) : null}
                <div className="centerLogo" onClick={toCoursePage}>
                    <img src={logoLink} alt="logo" className="headerLogo" />
                    &nbsp;
                    <span>不学汉语</span>
                </div>

                {isLogin ? (
                    <>
                        <List />
                        <Popconfirm
                            placement="bottomLeft"
                            title={text}
                            onConfirm={logout}
                            okText="确认"
                            cancelText="取消"
                        >
                            <div className="logoutBtn">
                                <CloseOutlined />
                            </div>
                        </Popconfirm>
                    </>
                ) : null}
            </header>
            <div className="placeholderBox"></div>
        </>
    );
};

export default withRouter(
    connect(
        state => ({
            isLogin: state.isLogin,
            userInfo: state.userInfo,
        }),
        {
            setIsLogin,
            setUserInfo,
            setAllCourses,
        }
    )(Header)
);
