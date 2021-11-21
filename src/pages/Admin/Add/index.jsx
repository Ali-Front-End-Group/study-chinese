import { useState, useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineEllipsis } from 'react-icons/ai';
import { Input, Button, Radio, Space, message, Popconfirm, Divider, Modal, Tooltip } from 'antd';
import { BASE_URL, DB_URL, appTcb } from '../../../utils/constant';
import { RiVoiceprintFill } from 'react-icons/ri';
import { withRouter } from 'react-router-dom';
import QRCode from 'qrcode.react';
import dayjs from 'dayjs';
import axios from 'axios';
import qs from 'qs';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import { setAllCourses } from '../../../redux/actions';
import {
    CheckOutlined,
    FontColorsOutlined,
    FundOutlined,
    AudioOutlined,
    QuestionOutlined,
    CloudUploadOutlined,
    DeleteOutlined,
    SearchOutlined,
    SoundOutlined,
    CommentOutlined,
    VideoCameraOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import './index.css';

const Add = ({ history, location, userId, allCourses, setAllCourses }) => {
    // 课程名、课程描述、课程封面
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [coverLink, setCoverLink] = useState('');
    // 对话框的显示
    const [modalVisible, setModalVisible] = useState(false);
    // 所有课程
    const [allCourse, setAllCourse] = useState([]);
    // 处理动态时间
    const [time, setTime] = useState(dayjs().format('HH:mm:ss'));
    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(dayjs().format('HH:mm:ss'));
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    // 判断是否是编辑状态
    const [isEdit, setIsEdit] = useState(false);
    const [editID, setEditID] = useState('');
    useEffect(() => {
        if (!location.search) return;
        setIsEdit(true);
        const ID = location.search.split('?id=')[1];
        const theCourse = allCourses.filter(obj => `${obj.id}` === ID)[0];
        const { title, bio, cover, content } = theCourse;
        setEditID(ID);
        setName(title);
        setDesc(bio);
        setCoverLink(cover);
        setAllCourse(JSON.parse(content).data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);
    // 判断是否只有中文
    const isOnlyChinese = str => /^[\u4e00-\u9fa5|？！，。《》（）：；“”‘’]+$/.test(str);
    // 获得图片url
    const getImg = (character, index) => {
        if (!isOnlyChinese(character)) {
            message.info('请输入汉字！');
            return;
        }
        axios
            .get(BASE_URL + '/api/get_pic', {
                params: {
                    character,
                },
            })
            .then(res => {
                if (res.data.status === 200) {
                    const copy = [...allCourse];
                    copy[index].content = res.data.url;
                    setAllCourse(copy);
                    message.success('成功获得图片url！');
                }
            });
    };
    // 获得声音url
    const getVoice = (text, index) => {
        if (!isOnlyChinese(text)) {
            message.info('请输入汉字！');
            return;
        }
        axios
            .post(BASE_URL + '/api/tts', {
                text,
            })
            .then(res => {
                if (res.data.status === 200) {
                    const copy = [...allCourse];
                    copy[index].content = res.data.array['思悦'];
                    copy[index].voiceText = text;
                    setAllCourse(copy);
                    message.success('成功获得音频url！');
                }
            });
    };
    // 获得拼音
    const getPinyin = (str, index, contentType, value) => {
        if (!str) return;
        axios
            .get(`${BASE_URL}/api/get_pinyin`, {
                params: {
                    str,
                },
            })
            .then(res => {
                if (res.data.status === 200) {
                    const copy = [...allCourse];
                    if (contentType === 'text') {
                        copy[index].pinyin = res.data.ret;
                    } else if (contentType === 'quzzle') {
                        copy[index].content[0].pinyin = res.data.ret;
                    } else if (contentType === 'choice') {
                        copy[index].choice[value].pinyin = res.data.ret;
                    } else if (contentType === 'record') {
                        copy[index].pinyin = res.data.ret;
                    }
                    setAllCourse(copy);
                    message.success('成功获得拼音！');
                }
            });
    };
    // 添加课程
    const addCourse = contentType => {
        const id = nanoid();
        let obj;
        if (contentType === 'text') {
            obj = { id, contentType, content: '', engText: '', pinyin: [] };
        } else if (contentType === 'quzzle') {
            obj = {
                id,
                contentType,
                content: [
                    {
                        content: '',
                        contentType: 'text',
                        pinyin: [],
                    },
                ],
                answer: 0,
                choice: [
                    { id: 'A', content: '', contentType: 'text', pinyin: [] },
                    { id: 'B', content: '', contentType: 'text', pinyin: [] },
                    { id: 'C', content: '', contentType: 'text', pinyin: [] },
                    { id: 'D', content: '', contentType: 'text', pinyin: [] },
                ],
            };
        } else if (contentType === 'image') {
            obj = { id, contentType, content: '', engText: '' };
        } else if (contentType === 'voice') {
            obj = { id, contentType, content: '', voiceText: '', voiceType: '-1' };
        } else if (contentType === 'video') {
            obj = { id, contentType, content: '', engText: '' };
        } else if (contentType === 'record') {
            obj = { id, contentType, content: '', pinyin: [] };
        }
        const newCourse = [...allCourse, obj];
        setAllCourse(newCourse);
    };
    // 删除课程
    const deleteCourseById = id => {
        const newCourse = allCourse.filter(obj => obj.id !== id);
        setAllCourse(newCourse);
    };
    // 上传图片
    const beforeUploadImg = async (id, index) => {
        // 获取文件对象
        const imgFile = document.getElementById(`${id}`).files[0];
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
        await appTcb
            .uploadFile({
                // 云存储的路径
                cloudPath: `img/${nanoid()}.${fileEnd}`,
                // 需要上传的文件，File 类型
                filePath: imgFile,
            })
            .then(
                res => {
                    const copy = [...allCourse];
                    copy[index].content = res.download_url;
                    setAllCourse(copy);
                    message.success('添加图片成功！');
                },
                () => message.error('上传失败，请重试！')
            );
    };
    // 上传声音
    const beforeUploadVoice = async (id, index) => {
        // 获取文件对象
        const voiceFile = document.getElementById(`${id}`).files[0];
        // 文件类型
        const fileType = voiceFile.type;
        // 文件后缀
        const fileEnd = fileType.split('/')[1];
        // 1. 判断是否是常见声音格式
        if (!(fileType === 'audio/mpeg')) {
            // 不是声音文件，提醒用户，中止操作
            message.error('请选择音频文件！');
            return;
        }
        // 2. 判断声音大小是否>1M
        if (voiceFile.size / 1024 / 1024 > 1) {
            // 声音大于1M，提醒用户，中止操作
            message.error('音频文件大小不能超过1M！');
            return;
        }
        await appTcb
            .uploadFile({
                // 云存储的路径
                cloudPath: `voice/${nanoid()}.${fileEnd}`,
                // 需要上传的文件，File 类型
                filePath: voiceFile,
            })
            .then(
                res => {
                    const copy = [...allCourse];
                    copy[index].content = res.download_url;
                    setAllCourse(copy);
                    message.success('添加音频成功！');
                },
                () => message.error('上传失败，请重试！')
            );
    };
    // 上传视频
    const beforeUploadVideo = async (id, index) => {
        // 获取文件对象
        const videoFile = document.getElementById(`${id}`).files[0];
        // 文件类型
        const fileType = videoFile.type;
        // 文件后缀
        const fileEnd = fileType.split('/')[1];
        // 1. 判断是否是常见视频格式
        if (
            !(
                fileType === 'video/mp4' ||
                fileType === 'video/avi' ||
                fileType === 'video/flv' ||
                fileType === 'video/wmv'
            )
        ) {
            // 不是声音文件，提醒用户，中止操作
            message.error('请选择支持格式视频文件！目前支持MP4、AVI、FLV、WMV格式！');
            return;
        }
        // 2. 判断视频大小是否>20M
        if (videoFile.size / 1024 / 1024 > 20) {
            // 视频大于20M，提醒用户，中止操作
            message.error('视频文件大小不能超过20M！');
            return;
        }
        await appTcb
            .uploadFile({
                // 云存储的路径
                cloudPath: `video/${nanoid()}.${fileEnd}`,
                // 需要上传的文件，File 类型
                filePath: videoFile,
            })
            .then(
                res => {
                    const copy = [...allCourse];
                    copy[index].content = res.download_url;
                    setAllCourse(copy);
                    message.success('添加视频成功！');
                },
                () => message.error('上传失败，请重试！')
            );
    };
    // 上传课程封面
    const beforeUploadCover = async id => {
        // 获取文件对象
        const imgFile = document.getElementById(`${id}`).files[0];
        // 文件类型
        const fileType = imgFile.type;
        // 文件后缀
        const fileEnd = fileType.split('/')[1];
        // 1. 判断是否是图片
        if (!(fileType === 'image/png' || fileType === 'image/bmp' || fileType === 'image/jpeg')) {
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
        await appTcb
            .uploadFile({
                // 云存储的路径
                cloudPath: `img/${nanoid()}.${fileEnd}`,
                // 需要上传的文件，File 类型
                filePath: imgFile,
            })
            .then(
                res => {
                    setCoverLink(res.download_url);
                    message.success('添加封面成功！');
                },
                () => message.error('上传失败，请重试！')
            );
    };
    // 发布课程 / 更新课程
    const releaseCourse = () => {
        // 检验是否填写课程基本信息
        if (!name || !desc || !coverLink) {
            message.warning('请填写课程基本信息：名称、描述、封面！');
            return;
        }
        // 检验是否为课程添加授课内容
        if (!allCourse.length) {
            message.warning('请为课程添加授课内容！');
            return;
        }
        // 判断每条信息是否有内容
        for (const obj of allCourse) {
            if (obj.contentType === 'text') {
                if (!obj.content || !obj.engText) {
                    message.warning('文字授课内容请填写完整！');
                    return;
                }
            } else if (obj.contentType === 'image' || obj.contentType === 'voice') {
                if (!obj.content) {
                    message.warning(
                        `${obj.contentType === 'image' ? '图片' : '音频'}授课内容请填写完整！`
                    );
                    return;
                }
            } else if (obj.contentType === 'video' || obj.contentType === 'record') {
                if (!obj.content) {
                    message.warning(
                        `${obj.contentType === 'video' ? '视频授课' : '口语任务'}内容请填写完整！`
                    );
                    return;
                }
            } else if (obj.contentType === 'quzzle') {
                if (
                    !obj.content[0].content ||
                    !obj.choice[0].content ||
                    !obj.choice[1].content ||
                    !obj.choice[2].content ||
                    !obj.choice[3].content
                ) {
                    message.warning('测试内容请填写完整！');
                    return;
                }
            }
        }
        const data = {
            user_id: userId,
            title: name,
            update_time: dayjs().format('YYYY-MM-DD'),
            create_time: dayjs().format('YYYY-MM-DD'),
            bio: desc,
            cover: coverLink,
            content: `{"data": ${JSON.stringify(allCourse)}}`,
        };
        axios({
            url: isEdit ? `${DB_URL}/course/update?id=${editID}` : `${DB_URL}/course/create`,
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: qs.stringify(data),
        }).then(
            res => {
                if (res.data.result === 'success') {
                    getAllCourseFromDB();
                    setEditID(res.data.data.id);
                    message.success(`${isEdit ? '更新' : '添加'}课程成功！`);
                    // history.push('/admin/course');
                    setModalVisible(true);
                } else {
                    message.error(`${isEdit ? '更新' : '添加'}课程失败！`);
                }
            },
            () => message.error(`${isEdit ? '更新' : '添加'}课程失败！`)
        );
    };
    // 从数据库获取所有课程信息
    const getAllCourseFromDB = () => {
        axios({
            url: `${DB_URL}/course/listAll`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    setAllCourses(res.data.data.rows);
                    // message.success('获取所有课程成功！');
                } else {
                    message.warning('获取课程信息失败！');
                }
            },
            () => message.warning('获取课程信息失败！')
        );
    };
    // 对话框隐藏
    const handleCancel = () => {
        setModalVisible(false);
        history.push('/admin/course');
    };
    const text = `课程信息未保存，确定取消${isEdit ? '更新' : '发布'}吗？`;
    return (
        <div className="addBox">
            <div className="addCenter">
                {/* 对话框 */}
                <Modal
                    title="课程二维码"
                    visible={modalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            完成
                        </Button>,
                    ]}
                >
                    <div style={{ textAlign: 'center' }}>
                        <h3>请将以下二维码发送给学生扫码以开始学习</h3>
                        <QRCode
                            style={{ marginTop: '10px' }}
                            value={`https://cbapi.musictrack.cn/course/detail?id=${editID}`}
                            size={200}
                        />
                    </div>
                </Modal>
                {/* 左边输入部分 */}
                <div className="addLeft animated bounceInLeft">
                    <div className="inputBox">
                        {/* 必填内容 */}
                        <div className="requiredBox">
                            {/* 取消、发布按钮 */}
                            <div className="addBtnBox">
                                <Popconfirm
                                    placement="top"
                                    title={text}
                                    onConfirm={() => {
                                        message.info(`课程未${isEdit ? '更新' : '发布'}！`);
                                        history.push('/admin/course');
                                    }}
                                    okText="确认"
                                    cancelText="取消"
                                >
                                    <Button
                                        type="primary"
                                        icon={<ArrowLeftOutlined />}
                                        danger
                                        className="backBtn"
                                    >
                                        取消
                                    </Button>
                                </Popconfirm>
                                <Button
                                    type="primary"
                                    icon={<CheckOutlined />}
                                    onClick={releaseCourse}
                                >
                                    {isEdit ? '更新' : '发布'}
                                </Button>
                            </div>
                            <Divider
                                orientation="left"
                                style={{ fontSize: '20px', fontWeight: '700' }}
                            >
                                课程基本信息
                            </Divider>
                            {/* 课程名称、课程描述、课程封面 */}
                            <>
                                <span className="courseItem">课程名称：</span>
                                <br />
                                <Input
                                    placeholder="请输入课程名..."
                                    value={name}
                                    maxLength={10}
                                    onChange={e => setName(e.target.value)}
                                />
                                <span className="courseItem">课程描述：</span>
                                <br />
                                <Input
                                    placeholder="请输入课程描述..."
                                    value={desc}
                                    maxLength={26}
                                    onChange={e => setDesc(e.target.value)}
                                />
                                <span className="courseItem">课程封面：</span>
                                <br />
                                <Input
                                    placeholder="请选择课程封面..."
                                    value={coverLink}
                                    style={{ width: 'calc(100% - 38px)' }}
                                    onChange={e => setCoverLink(e.target.value)}
                                />
                                <Tooltip placement="top" title="本地上传">
                                    <Button
                                        shape="circle"
                                        style={{ marginLeft: '6px' }}
                                        onClick={() =>
                                            document.getElementById('selectCourseCover').click()
                                        }
                                    >
                                        <CloudUploadOutlined />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="selectFile"
                                            id="selectCourseCover"
                                            onChange={() => beforeUploadCover('selectCourseCover')}
                                        />
                                    </Button>
                                </Tooltip>
                            </>
                            <Divider
                                orientation="left"
                                style={{ fontSize: '20px', fontWeight: '700' }}
                            >
                                添加互动信息
                            </Divider>
                            {/* 动态添加项目的按钮 */}
                            <div className="addBtns">
                                <Button
                                    className="addBtnItem"
                                    icon={<FontColorsOutlined />}
                                    onClick={() => addCourse('text')}
                                >
                                    文字信息
                                </Button>
                                <Button
                                    className="addBtnItem"
                                    icon={<FundOutlined />}
                                    onClick={() => addCourse('image')}
                                >
                                    图片信息
                                </Button>
                                <Button
                                    className="addBtnItem"
                                    icon={<AudioOutlined />}
                                    onClick={() => addCourse('voice')}
                                >
                                    音频信息
                                </Button>
                                {/* <br /> */}
                                <Button
                                    className="addBtnItem"
                                    icon={<CommentOutlined />}
                                    onClick={() => addCourse('record')}
                                >
                                    口语任务
                                </Button>
                                <Button
                                    className="addBtnItem"
                                    icon={<VideoCameraOutlined />}
                                    onClick={() => addCourse('video')}
                                >
                                    视频信息
                                </Button>
                                <Button
                                    className="addBtnItem"
                                    icon={<QuestionOutlined />}
                                    onClick={() => addCourse('quzzle')}
                                >
                                    测验信息
                                </Button>
                            </div>
                            <Divider
                                orientation="left"
                                style={{ fontSize: '20px', fontWeight: '700' }}
                            >
                                课程内容
                            </Divider>
                        </div>
                        {/* 选填内容 */}
                        <div className="optionalBox">
                            {/* 渲染所有课程 */}
                            {allCourse.map((obj, index) => {
                                if (obj.contentType === 'text') {
                                    return (
                                        <div className="autoItem" key={obj.id}>
                                            <span className="courseItem">文字信息：</span>
                                            <br />
                                            <Input
                                                placeholder="请输入中文内容..."
                                                value={obj.content}
                                                style={{
                                                    width: 'calc(100% - 38px)',
                                                    marginBottom: '5px',
                                                }}
                                                onChange={e => {
                                                    const copy = [...allCourse];
                                                    copy[index].content = e.target.value;
                                                    setAllCourse(copy);
                                                }}
                                                onBlur={() => getPinyin(obj.content, index, 'text')}
                                            />
                                            <Tooltip placement="top" title="删除">
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    danger
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() => deleteCourseById(obj.id)}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Tooltip>

                                            <Input
                                                placeholder="请输入英文内容..."
                                                value={obj.engText}
                                                style={{ width: 'calc(100% - 38px)' }}
                                                onChange={e => {
                                                    const copy = [...allCourse];
                                                    copy[index].engText = e.target.value;
                                                    setAllCourse(copy);
                                                }}
                                            />
                                        </div>
                                    );
                                } else if (obj.contentType === 'image') {
                                    return (
                                        <div className="autoItem" key={obj.id}>
                                            <span className="courseItem">图片信息：</span>
                                            <br />
                                            <Input
                                                placeholder="请输入一个汉字并转化为图片url，或手动上传图片..."
                                                style={{ width: 'calc(100% - 114px)' }}
                                                maxLength={1}
                                                value={obj.content}
                                                onChange={e => {
                                                    const copy = [...allCourse];
                                                    copy[index].content = e.target.value;
                                                    setAllCourse(copy);
                                                }}
                                            />
                                            <Tooltip placement="top" title="转图">
                                                <Button
                                                    shape="circle"
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() => getImg(obj.content, index)}
                                                >
                                                    <SearchOutlined />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip placement="top" title="本地上传">
                                                <Button
                                                    shape="circle"
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() =>
                                                        document.getElementById(`${obj.id}`).click()
                                                    }
                                                >
                                                    <CloudUploadOutlined />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        id={obj.id}
                                                        className="selectFile"
                                                        onChange={() =>
                                                            beforeUploadImg(obj.id, index)
                                                        }
                                                    />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip placement="top" title="删除">
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    danger
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() => deleteCourseById(obj.id)}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    );
                                } else if (obj.contentType === 'voice') {
                                    return (
                                        <div className="autoItem" key={obj.id}>
                                            <span className="courseItem">声音信息：</span>
                                            <br />
                                            <Input
                                                placeholder="请输入中文并转化为音频url，或手动上传音频..."
                                                style={{ width: 'calc(100% - 114px)' }}
                                                value={obj.content}
                                                maxLength={55}
                                                onChange={e => {
                                                    const copy = [...allCourse];
                                                    copy[index].content = e.target.value;
                                                    setAllCourse(copy);
                                                }}
                                            />
                                            <Tooltip placement="top" title="转语音">
                                                <Button
                                                    shape="circle"
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() => getVoice(obj.content, index)}
                                                >
                                                    <SoundOutlined />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip placement="top" title="本地上传">
                                                <Button
                                                    shape="circle"
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() =>
                                                        document.getElementById(`${obj.id}`).click()
                                                    }
                                                >
                                                    <CloudUploadOutlined />
                                                    <input
                                                        type="file"
                                                        accept="audio/*"
                                                        id={obj.id}
                                                        className="selectFile"
                                                        onChange={() =>
                                                            beforeUploadVoice(obj.id, index)
                                                        }
                                                    />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip placement="top" title="删除">
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    danger
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() => deleteCourseById(obj.id)}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    );
                                } else if (obj.contentType === 'video') {
                                    return (
                                        <div className="autoItem" key={obj.id}>
                                            <span className="courseItem">视频信息：</span>
                                            <br />
                                            <Input
                                                placeholder="请输入视频地址..."
                                                style={{ width: 'calc(100% - 76px)' }}
                                                // maxLength={1}
                                                value={obj.content}
                                                onChange={e => {
                                                    const copy = [...allCourse];
                                                    copy[index].content = e.target.value;
                                                    setAllCourse(copy);
                                                }}
                                            />
                                            <Tooltip placement="top" title="本地上传">
                                                <Button
                                                    shape="circle"
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() =>
                                                        document.getElementById(`${obj.id}`).click()
                                                    }
                                                >
                                                    <CloudUploadOutlined />
                                                    <input
                                                        type="file"
                                                        accept=".mp4,.avi,.flv,.wmv"
                                                        id={obj.id}
                                                        className="selectFile"
                                                        onChange={() =>
                                                            beforeUploadVideo(obj.id, index)
                                                        }
                                                    />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip placement="top" title="删除">
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    danger
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() => deleteCourseById(obj.id)}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    );
                                } else if (obj.contentType === 'quzzle') {
                                    return (
                                        <div className="autoItem" key={obj.id}>
                                            <span className="courseItem">测试题目：</span>
                                            <br />
                                            <Input
                                                placeholder="请输入题目内容..."
                                                value={obj.content[0].content}
                                                maxLength={36}
                                                style={{ width: 'calc(100% - 38px)' }}
                                                onChange={e => {
                                                    const copy = [...allCourse];
                                                    copy[index].content[0].content = e.target.value;
                                                    setAllCourse(copy);
                                                }}
                                                onBlur={() =>
                                                    getPinyin(
                                                        obj.content[0].content,
                                                        index,
                                                        'quzzle'
                                                    )
                                                }
                                            />
                                            <Tooltip placement="top" title="删除">
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    danger
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() => deleteCourseById(obj.id)}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Tooltip>
                                            <span className="courseItem">题目答案：</span>
                                            <br />
                                            <Radio.Group
                                                name="radiogroup"
                                                value={obj.answer}
                                                onChange={e => {
                                                    const copy = [...allCourse];
                                                    copy[index].answer = e.target.value;
                                                    setAllCourse(copy);
                                                }}
                                            >
                                                <Space direction="vertical">
                                                    <Radio value={0}>
                                                        <Input
                                                            placeholder="请输入选项答案..."
                                                            value={obj.choice[0].content}
                                                            onChange={e => {
                                                                const copy = [...allCourse];
                                                                copy[index].choice[0].content =
                                                                    e.target.value;
                                                                setAllCourse(copy);
                                                            }}
                                                            maxLength={12}
                                                            onBlur={() =>
                                                                getPinyin(
                                                                    obj.choice[0].content,
                                                                    index,
                                                                    'choice',
                                                                    0
                                                                )
                                                            }
                                                        />
                                                    </Radio>
                                                    <Radio value={1}>
                                                        <Input
                                                            placeholder="请输入选项答案..."
                                                            value={obj.choice[1].content}
                                                            onChange={e => {
                                                                const copy = [...allCourse];
                                                                copy[index].choice[1].content =
                                                                    e.target.value;
                                                                setAllCourse(copy);
                                                            }}
                                                            maxLength={12}
                                                            onBlur={() =>
                                                                getPinyin(
                                                                    obj.choice[1].content,
                                                                    index,
                                                                    'choice',
                                                                    1
                                                                )
                                                            }
                                                        />
                                                    </Radio>
                                                    <Radio value={2}>
                                                        <Input
                                                            placeholder="请输入选项答案..."
                                                            value={obj.choice[2].content}
                                                            onChange={e => {
                                                                const copy = [...allCourse];
                                                                copy[index].choice[2].content =
                                                                    e.target.value;
                                                                setAllCourse(copy);
                                                            }}
                                                            maxLength={12}
                                                            onBlur={() =>
                                                                getPinyin(
                                                                    obj.choice[2].content,
                                                                    index,
                                                                    'choice',
                                                                    2
                                                                )
                                                            }
                                                        />
                                                    </Radio>
                                                    <Radio value={3}>
                                                        <Input
                                                            placeholder="请输入选项答案..."
                                                            value={obj.choice[3].content}
                                                            onChange={e => {
                                                                const copy = [...allCourse];
                                                                copy[index].choice[3].content =
                                                                    e.target.value;
                                                                setAllCourse(copy);
                                                            }}
                                                            maxLength={12}
                                                            onBlur={() =>
                                                                getPinyin(
                                                                    obj.choice[3].content,
                                                                    index,
                                                                    'choice',
                                                                    3
                                                                )
                                                            }
                                                        />
                                                    </Radio>
                                                </Space>
                                            </Radio.Group>
                                        </div>
                                    );
                                } else if (obj.contentType === 'record') {
                                    return (
                                        <div className="autoItem" key={obj.id}>
                                            <span className="courseItem">口语任务：</span>
                                            <br />
                                            <Input
                                                maxLength={20}
                                                placeholder="请输入口语任务内容，仅限中文，字数在20字以内..."
                                                value={obj.content}
                                                style={{ width: 'calc(100% - 38px)' }}
                                                onChange={e => {
                                                    const copy = [...allCourse];
                                                    copy[index].content = e.target.value;
                                                    setAllCourse(copy);
                                                }}
                                                onBlur={() => {
                                                    obj.content = obj.content.replace(
                                                        /[^\u4e00-\u9fa5,.'?!:;]/g,
                                                        ''
                                                    );
                                                    if (obj.content) {
                                                        getPinyin(obj.content, index, 'record');
                                                    }
                                                }}
                                            />
                                            <Tooltip placement="top" title="删除">
                                                <Button
                                                    type="primary"
                                                    shape="circle"
                                                    danger
                                                    style={{ marginLeft: '6px' }}
                                                    onClick={() => deleteCourseById(obj.id)}
                                                >
                                                    <DeleteOutlined />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                </div>
                {/* 右边预览 */}
                <div className="addRight animated bounceInRight">
                    {/* 手机 */}
                    <div className="mobileBox">
                        <div className="mobileTime">
                            <span>{time}</span>
                            <FaWifi />
                        </div>
                        <div className="mobileTitle">
                            <AiOutlineLeft />
                            <span>{name ? name : '未命名课程'}</span>
                            <AiOutlineEllipsis />
                        </div>
                        <div className="mobileBody">
                            <div className="mobileBodyScreen">
                                {/* 渲染可视化预览 */}
                                {allCourse.map(obj => {
                                    if (obj.contentType === 'text') {
                                        return obj.content ? (
                                            <div className="courseContent" key={obj.id}>
                                                <div className="contentZh">{obj.content}</div>
                                                {obj.engText ? (
                                                    <div className="contentEn">
                                                        翻译：{obj.engText}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ) : null;
                                    } else if (obj.contentType === 'image') {
                                        return obj.content ? (
                                            <div className="courseImg" key={obj.id}>
                                                <img src={obj.content} alt="请点击按钮" />
                                            </div>
                                        ) : null;
                                    } else if (obj.contentType === 'voice') {
                                        return obj.content ? (
                                            <div
                                                key={obj.id}
                                                className="courseVoice"
                                                onClick={() =>
                                                    document
                                                        .getElementById(`${obj.id}+voicePlay`)
                                                        .play()
                                                }
                                            >
                                                <RiVoiceprintFill />
                                                声音信息
                                                <video
                                                    controls
                                                    name="media"
                                                    className="voiceVideo"
                                                    id={`${obj.id}+voicePlay`}
                                                    src={obj.content}
                                                ></video>
                                            </div>
                                        ) : null;
                                    } else if (obj.contentType === 'video') {
                                        return obj.content ? (
                                            <video
                                                controls="controls"
                                                className="courseVideo"
                                                src={obj.content}
                                            />
                                        ) : null;
                                    } else if (obj.contentType === 'quzzle') {
                                        return (
                                            <div key={obj.id}>
                                                {obj.content[0].content ? (
                                                    <div className="courseTest">
                                                        小测试：{obj.content[0].content}
                                                    </div>
                                                ) : null}
                                                {obj.choice[0].content ||
                                                obj.choice[1].content ||
                                                obj.choice[2].content ||
                                                obj.choice[3].content ? (
                                                    <div className="answer">
                                                        {obj.choice.map((choiceObj, index) =>
                                                            choiceObj.content ? (
                                                                <div
                                                                    className="answerItem"
                                                                    key={index}
                                                                >
                                                                    <div className="answerItemIndex">
                                                                        {choiceObj.id}
                                                                    </div>
                                                                    <div className="answerItemContent">
                                                                        {choiceObj.content}
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                        )}
                                                    </div>
                                                ) : null}
                                            </div>
                                        );
                                    } else if (obj.contentType === 'record') {
                                        return obj.content ? (
                                            <div className="courseContent" key={obj.id}>
                                                <div className="contentZh">{obj.content}</div>
                                                <div className="contentEn">(派送的口语任务)</div>
                                            </div>
                                        ) : null;
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(
    connect(
        state => ({
            userId: state.userInfo.id,
            allCourses: state.allCourses,
        }),
        { setAllCourses }
    )(Add)
);
