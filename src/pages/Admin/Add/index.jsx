import { useState, useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineEllipsis } from 'react-icons/ai';
import { Input, Button, Radio, Space, Card, message, Popconfirm } from 'antd';
import { BASE_URL, DB_URL, appTcb } from '../../../utils/constant';
import { RiVoiceprintFill } from 'react-icons/ri';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import qs from 'qs';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import { setAllCourses } from '../../../redux/actions';
import {
    FontColorsOutlined,
    FundOutlined,
    AudioOutlined,
    QuestionOutlined,
    FolderOpenOutlined,
    DeleteOutlined,
    SearchOutlined,
    SoundOutlined,
} from '@ant-design/icons';
import './index.css';

const Add = ({ history, location, userId, setAllCourses }) => {
    // 课程名、课程描述、课程封面
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [coverLink, setCoverLink] = useState('');
    // 所有课程
    const [allCourse, setAllCourse] = useState([]);
    // 处理动态时间
    const [time, setTime] = useState('');
    const runPerSed = () => setTime(dayjs().format('HH:mm:ss'));
    useEffect(() => {
        runPerSed();
        let timer = setTimeout(() => {
            runPerSed();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    // 判断是否是编辑状态
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');
    useEffect(() => {
        if (!location.search) {
            setIsEdit(false);
        } else {
            setIsEdit(true);
            setId(location.search.split('?id=')[1]);
        }
    }, [location]);
    // 若是编辑状态，则获得该课程的具体信息
    useEffect(() => {
        if (isEdit) {
            // 是编辑状态，获得此课程的具体信息
            axios({
                url: `${DB_URL}/course/detail?id=${id}`,
                method: 'get',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then(
                res => {
                    if (res.data.result === 'success') {
                        console.log(decodeURI(res.data.data.content));
                    }
                },
                err => {
                    console.log(err);
                }
            );
        }
    }, [isEdit, id]);
    // 获得图片url
    const getImg = (character, index) => {
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
        axios
            .post(BASE_URL + '/api/tts', {
                text,
            })
            .then(res => {
                if (res.data.status === 200) {
                    const copy = [...allCourse];
                    copy[index].content = res.data.array['思悦'];
                    setAllCourse(copy);
                    message.success('成功获得音频url！');
                }
            });
    };
    // 获得拼音
    const getPinyin = (str, index, contentType, value) => {
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
                        copy[index].content.pinyin = res.data.ret;
                    } else if (contentType === 'choice') {
                        copy[index].choice[value].pinyin = res.data.ret;
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
            obj = { id, contentType, content: '', engText: 'voice', voiceType: '-1' };
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
    // 发布课程
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
            } else if (obj.contentType === 'quzzle') {
                if (
                    !obj.content.content ||
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
            url: `${DB_URL}/course/create`,
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
                    message.success('添加课程成功！');
                    history.push('/admin/course');
                } else {
                    message.error('添加课程失败！');
                }
            },
            err => message.error('添加课程失败！')
        );
    };
    // 从数据库获取所有课程信息
    const getAllCourseFromDB = () => {
        axios({
            url: `${DB_URL}/course/list?userId=${userId}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    setAllCourses(res.data.data.rows);
                    message.success('获取所有课程成功！');
                } else {
                    message.warning('获取课程信息失败！');
                }
            },
            err => {
                console.log(err);
                message.warning('获取课程信息失败！');
            }
        );
    };
    const text = '课程信息未保存，确定取消发布吗？';
    return (
        <div className="addBox">
            <div className="addCenter">
                {/* 左边输入部分 */}
                <div className="addLeft">
                    <div className="inputBox">
                        {/* 取消、发布按钮 */}
                        <div className="addBtnBox">
                            <Popconfirm
                                placement="top"
                                title={text}
                                onConfirm={() => history.push('/admin/course')}
                                okText="确认"
                                cancelText="取消"
                            >
                                <Button type="primary" danger className="backBtn">
                                    取消
                                </Button>
                            </Popconfirm>
                            <Button type="primary" onClick={releaseCourse}>
                                发布
                            </Button>
                        </div>
                        {/* 动态添加项目的按钮 */}
                        <div className="addBtns">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<FontColorsOutlined />}
                                onClick={() => addCourse('text')}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<FundOutlined />}
                                onClick={() => addCourse('image')}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<AudioOutlined />}
                                onClick={() => addCourse('voice')}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<QuestionOutlined />}
                                onClick={() => addCourse('quzzle')}
                            />
                        </div>
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
                                style={{ width: 'calc(100% - 50px)' }}
                                onChange={e => setCoverLink(e.target.value)}
                            />
                            <Button
                                type="primary"
                                style={{ width: '50px' }}
                                onClick={() => document.getElementById('selectCourseCover').click()}
                            >
                                <FolderOpenOutlined />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="selectFile"
                                    id="selectCourseCover"
                                    onChange={() => beforeUploadCover('selectCourseCover')}
                                />
                            </Button>
                        </>
                        {/* 渲染所有课程 */}
                        {allCourse.map((obj, index) => {
                            if (obj.contentType === 'text') {
                                return (
                                    <div className="autoItem" key={obj.id}>
                                        <span className="courseItem">文字信息：</span>
                                        <br />
                                        <Input
                                            placeholder="请输入中文课程内容..."
                                            value={obj.content}
                                            style={{ width: 'calc(100% - 50px)' }}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].content = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                            onBlur={() => getPinyin(obj.content, index, 'text')}
                                        />
                                        <Input
                                            placeholder="请输入英文课程内容..."
                                            value={obj.engText}
                                            style={{ width: 'calc(100% - 50px)' }}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].engText = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                        />
                                        <Button
                                            type="primary"
                                            danger
                                            style={{ width: '50px' }}
                                            onClick={() => {
                                                deleteCourseById(obj.id);
                                            }}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                );
                            } else if (obj.contentType === 'image') {
                                return (
                                    <div className="autoItem" key={obj.id}>
                                        <span className="courseItem">图片地址：</span>
                                        <br />
                                        <Input
                                            placeholder="请输入一个汉字，并转化为图片url..."
                                            style={{ width: 'calc(100% - 150px)' }}
                                            maxLength={1}
                                            value={obj.content}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].content = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                        />
                                        <Button
                                            type="primary"
                                            style={{ width: '50px' }}
                                            onClick={() => getImg(obj.content, index)}
                                        >
                                            <SearchOutlined />
                                        </Button>
                                        <Button
                                            type="primary"
                                            style={{ width: '50px' }}
                                            onClick={() =>
                                                document.getElementById(`${obj.id}`).click()
                                            }
                                        >
                                            <FolderOpenOutlined />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id={obj.id}
                                                className="selectFile"
                                                onChange={() => beforeUploadImg(obj.id, index)}
                                            />
                                        </Button>
                                        <Button
                                            type="primary"
                                            danger
                                            style={{ width: '50px' }}
                                            onClick={() => deleteCourseById(obj.id)}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                );
                            } else if (obj.contentType === 'voice') {
                                return (
                                    <div className="autoItem" key={obj.id}>
                                        <span className="courseItem">声音信息：</span>
                                        <br />
                                        <Input
                                            placeholder="请输入中文，并生成语音url..."
                                            style={{ width: 'calc(100% - 150px)' }}
                                            value={obj.content}
                                            maxLength={36}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].content = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                        />
                                        <Button
                                            type="primary"
                                            style={{ width: '50px' }}
                                            onClick={() => getVoice(obj.content, index)}
                                        >
                                            <SoundOutlined />
                                        </Button>
                                        <Button
                                            type="primary"
                                            style={{ width: '50px' }}
                                            onClick={() =>
                                                document.getElementById(`${obj.id}`).click()
                                            }
                                        >
                                            <FolderOpenOutlined />
                                            <input
                                                type="file"
                                                accept="audio/*"
                                                id={obj.id}
                                                className="selectFile"
                                                onChange={() => beforeUploadVoice(obj.id, index)}
                                            />
                                        </Button>
                                        <Button
                                            type="primary"
                                            danger
                                            style={{ width: '50px' }}
                                            onClick={() => deleteCourseById(obj.id)}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                );
                            } else if (obj.contentType === 'quzzle') {
                                return (
                                    <div className="autoItem" key={obj.id}>
                                        <span className="courseItem">测试题目：</span>
                                        <br />
                                        <Input
                                            placeholder="请输入题目内容..."
                                            value={obj.content.content}
                                            maxLength={36}
                                            style={{ width: 'calc(100% - 50px)' }}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].content.content = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                            onBlur={() =>
                                                getPinyin(obj.content.content, index, 'quzzle')
                                            }
                                        />
                                        <Button
                                            type="primary"
                                            style={{ width: '50px' }}
                                            danger
                                            onClick={() => deleteCourseById(obj.id)}
                                        >
                                            <DeleteOutlined />
                                        </Button>
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
                            } else {
                                return null;
                            }
                        })}
                    </div>
                </div>
                {/* 右边预览 */}
                <div className="addRight">
                    {/* 手机 */}
                    <div className="mobileBox">
                        {/* 卡片 */}
                        <Card
                            cover={
                                coverLink ? (
                                    <img
                                        alt="请选择图片或输入正确的图片url..."
                                        src={coverLink}
                                        className="coverImg"
                                    />
                                ) : null
                            }
                            className="courseCardPre"
                        >
                            <div className="courseName">{name}</div>
                            <div className="courseDesc">{desc}</div>
                        </Card>
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
                                                voice
                                                <video
                                                    controls
                                                    name="media"
                                                    className="voiceVideo"
                                                    id={`${obj.id}+voicePlay`}
                                                    src={obj.content}
                                                ></video>
                                            </div>
                                        ) : null;
                                    } else if (obj.contentType === 'quzzle') {
                                        return (
                                            <div key={obj.id}>
                                                {obj.content.content ? (
                                                    <div className="courseTest">
                                                        小测试：{obj.content.content}
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
            userId: state.userId,
        }),
        { setAllCourses }
    )(Add)
);
