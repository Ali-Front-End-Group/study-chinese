import { useState, useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineEllipsis } from 'react-icons/ai';
import { Input, Button, Radio, Space, Card, message } from 'antd';
import { BASE_URL, appTcb } from '../../../utils/constant';
import { RiVoiceprintFill } from 'react-icons/ri';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { nanoid } from 'nanoid';
import {
    FontColorsOutlined,
    FileImageOutlined,
    AudioOutlined,
    QuestionOutlined,
    FolderOpenOutlined,
    DeleteOutlined,
    SearchOutlined,
    SoundOutlined,
} from '@ant-design/icons';
import './index.css';

const Add = ({ history }) => {
    // 返回
    const goBack = () => {
        history.push('/admin/course');
    };
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
    // 课程名、课程描述、课程封面
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [coverLink, setCoverLink] = useState('');
    // 所有课程
    const [allCourse, setAllCourse] = useState([]);
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
                    copy[index].url = res.data.url;
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
                    copy[index].url = res.data.array['思悦'];
                    setAllCourse(copy);
                    message.success('成功获得音频url！');
                }
            });
    };
    const getIndex = index => {
        switch (index) {
            case 0:
                return 'A';
            case 1:
                return 'B';
            case 2:
                return 'C';
            case 3:
                return 'D';
            default:
                return null;
        }
    };
    // 添加课程
    const addCourse = type => {
        const id = nanoid();
        let obj;
        if (type === 'text') {
            obj = { id, type, zh: '', en: '' };
        } else if (type === 'ques') {
            obj = {
                id,
                type,
                question: '',
                ansIndex: 0,
                ans: {
                    A: '',
                    B: '',
                    C: '',
                    D: '',
                },
            };
        } else {
            obj = { id, type, url: '' };
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
                    copy[index].url = res.download_url;
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
                    copy[index].url = res.download_url;
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
            if (obj.type === 'text') {
                if (!obj.zh || !obj.en) {
                    message.warning('文字授课内容请填写完整！');
                    return;
                }
            } else if (obj.type === 'img' || obj.type === 'voice') {
                if (!obj.url) {
                    message.warning(`${obj.type === 'img' ? '图片' : '音频'}授课内容请填写完整！`);
                    return;
                }
            } else if (obj.type === 'ques') {
                if (!obj.question || !obj.ans.A || !obj.ans.B || !obj.ans.C || !obj.ans.D) {
                    message.warning('测试内容请填写完整！');
                    return;
                }
            }
        }
        message.success('添加课程成功！');
    };
    return (
        <div className="addBox">
            <div className="addCenter">
                {/* 左边输入部分 */}
                <div className="addLeft">
                    <div className="inputBox">
                        <div className="addBtnBox">
                            <Button type="primary" danger onClick={goBack} className="backBtn">
                                取消
                            </Button>
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
                                icon={<FileImageOutlined />}
                                onClick={() => addCourse('img')}
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
                                onClick={() => addCourse('ques')}
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
                            if (obj.type === 'text') {
                                return (
                                    <div className="autoItem" key={obj.id}>
                                        <span className="courseItem">文字信息：</span>
                                        <br />
                                        <Input
                                            placeholder="请输入中文课程内容..."
                                            value={obj.zh}
                                            style={{ width: 'calc(100% - 50px)' }}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].zh = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                        />
                                        <Input
                                            placeholder="请输入英文课程内容..."
                                            value={obj.en}
                                            style={{ width: 'calc(100% - 50px)' }}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].en = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                        />
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
                            } else if (obj.type === 'img') {
                                return (
                                    <div className="autoItem" key={obj.id}>
                                        <span className="courseItem">图片地址：</span>
                                        <br />
                                        <Input
                                            placeholder="请输入一个汉字，并转化为图片url..."
                                            style={{ width: 'calc(100% - 150px)' }}
                                            maxLength={1}
                                            value={obj.url}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].url = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                        />
                                        <Button
                                            type="primary"
                                            style={{ width: '50px' }}
                                            onClick={() => getImg(obj.url, index)}
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
                            } else if (obj.type === 'voice') {
                                return (
                                    <div className="autoItem" key={obj.id}>
                                        <span className="courseItem">声音信息：</span>
                                        <br />
                                        <Input
                                            placeholder="请输入中文，并生成语音url..."
                                            style={{ width: 'calc(100% - 150px)' }}
                                            value={obj.url}
                                            maxLength={36}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].url = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                        />
                                        <Button
                                            type="primary"
                                            style={{ width: '50px' }}
                                            onClick={() => getVoice(obj.url, index)}
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
                            } else if (obj.type === 'ques') {
                                return (
                                    <div className="autoItem" key={obj.id}>
                                        <span className="courseItem">测试题目：</span>
                                        <br />
                                        <Input
                                            placeholder="请输入题目内容..."
                                            value={obj.question}
                                            maxLength={36}
                                            style={{ width: 'calc(100% - 50px)' }}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].question = e.target.value;
                                                setAllCourse(copy);
                                            }}
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
                                            value={obj.ansIndex}
                                            onChange={e => {
                                                const copy = [...allCourse];
                                                copy[index].ansIndex = e.target.value;
                                                setAllCourse(copy);
                                            }}
                                        >
                                            <Space direction="vertical">
                                                <Radio value={0}>
                                                    <Input
                                                        placeholder="请输入选项答案..."
                                                        value={obj.ans.A}
                                                        onChange={e => {
                                                            const copy = [...allCourse];
                                                            copy[index].ans.A = e.target.value;
                                                            setAllCourse(copy);
                                                        }}
                                                        maxLength={12}
                                                    />
                                                </Radio>
                                                <Radio value={1}>
                                                    <Input
                                                        placeholder="请输入选项答案..."
                                                        value={obj.ans.B}
                                                        onChange={e => {
                                                            const copy = [...allCourse];
                                                            copy[index].ans.B = e.target.value;
                                                            setAllCourse(copy);
                                                        }}
                                                        maxLength={12}
                                                    />
                                                </Radio>
                                                <Radio value={2}>
                                                    <Input
                                                        placeholder="请输入选项答案..."
                                                        value={obj.ans.C}
                                                        onChange={e => {
                                                            const copy = [...allCourse];
                                                            copy[index].ans.C = e.target.value;
                                                            setAllCourse(copy);
                                                        }}
                                                        maxLength={12}
                                                    />
                                                </Radio>
                                                <Radio value={3}>
                                                    <Input
                                                        placeholder="请输入选项答案..."
                                                        value={obj.ans.D}
                                                        onChange={e => {
                                                            const copy = [...allCourse];
                                                            copy[index].ans.D = e.target.value;
                                                            setAllCourse(copy);
                                                        }}
                                                        maxLength={12}
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
                            {/* 渲染可视化预览 */}
                            {allCourse.map(obj => {
                                if (obj.type === 'text') {
                                    return obj.zh ? (
                                        <div className="courseContent" key={obj.id}>
                                            <div className="contentZh">{obj.zh}</div>
                                            {obj.en ? (
                                                <div className="contentEn">翻译：{obj.en}</div>
                                            ) : null}
                                        </div>
                                    ) : null;
                                } else if (obj.type === 'img') {
                                    return obj.url ? (
                                        <div className="courseImg" key={obj.id}>
                                            <img src={obj.url} alt="请点击按钮" />
                                        </div>
                                    ) : null;
                                } else if (obj.type === 'voice') {
                                    return obj.url ? (
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
                                                src={obj.url}
                                            ></video>
                                        </div>
                                    ) : null;
                                } else if (obj.type === 'ques') {
                                    return (
                                        <div key={obj.id}>
                                            {obj.question ? (
                                                <div className="courseTest">
                                                    小测试：{obj.question}
                                                </div>
                                            ) : null}
                                            {obj.ans.A || obj.ans.B || obj.ans.C || obj.ans.D ? (
                                                <div className="answer">
                                                    {[
                                                        obj.ans.A,
                                                        obj.ans.B,
                                                        obj.ans.C,
                                                        obj.ans.D,
                                                    ].map((value, index) =>
                                                        value ? (
                                                            <div className="answerItem" key={index}>
                                                                <div className="answerItemIndex">
                                                                    {getIndex(index)}
                                                                </div>
                                                                <div className="answerItemContent">
                                                                    {value}
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
    );
};

export default withRouter(Add);
