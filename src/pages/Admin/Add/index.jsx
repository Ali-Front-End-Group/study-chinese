import { useState, useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineEllipsis } from 'react-icons/ai';
import { Input, Button, Radio, Space } from 'antd';
import { BASE_URL } from '../../../utils/constant';
import { RiVoiceprintFill } from 'react-icons/ri';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { FontColorsOutlined, FileImageOutlined, AudioOutlined } from '@ant-design/icons';
import './index.css';

const Add = ({ history }) => {
    const [time, setTime] = useState('');
    // 左上角时间
    useEffect(() => {
        setTime(dayjs().format('HH:mm:ss'));
        let timer = setTimeout(() => {
            setTime(dayjs().format('HH:mm:ss'));
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    // 课程名
    const [name, setName] = useState('');
    // 文字信息课程
    const [textType, setTextType] = useState([]);
    // 图片信息课程
    const [imgType, setImgType] = useState([]);
    // 声音信息课程
    const [voiceType, setVoiceType] = useState([]);

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
                    const copy = [...imgType];
                    copy[index].url = res.data.url;
                    setImgType(copy);
                }
            });
    };
    const getVoice = (text, index) => {
        axios
            .post(BASE_URL + '/api/tts', {
                text,
            })
            .then(res => {
                if (res.data.status === 200) {
                    const copy = [...voiceType];
                    copy[index].url = res.data.array['思悦'];
                    setVoiceType(copy);
                }
            });
    };
    // 测试题目
    const [question, setQuestion] = useState('');
    const [ansIndex, setAnsIndex] = useState(0);
    const [ansA, setAnsA] = useState('');
    const [ansB, setAnsB] = useState('');
    const [ansC, setAnsC] = useState('');
    const [ansD, setAnsD] = useState('');
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
    // 返回
    const goBack = () => {
        history.push('/admin/course');
    };
    // 添加文字课程
    const addTextType = () => {
        const id = nanoid();
        const newTextType = [...textType, { id, zh: '', en: '' }];
        setTextType(newTextType);
    };
    // 删除文字课程
    const deleteTextById = id => {
        const newTextType = textType.filter(obj => obj.id !== id);
        setTextType(newTextType);
    };
    // 添加图像课程
    const addImgType = () => {
        const id = nanoid();
        const newImgType = [...imgType, { id, url: '' }];
        setImgType(newImgType);
    };
    // 删除图像课程
    const deleteImgById = id => {
        const newImgType = imgType.filter(obj => obj.id !== id);
        setImgType(newImgType);
    };
    // 添加声音课程
    const addVoiceType = () => {
        const id = nanoid();
        const newVoiceType = [...voiceType, { id, url: '' }];
        setVoiceType(newVoiceType);
    };
    // 删除声音课程
    const deleteVoiceById = id => {
        const newVoiceType = voiceType.filter(obj => obj.id !== id);
        setVoiceType(newVoiceType);
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
                            <Button type="primary">发布</Button>
                        </div>
                        <div className="addBtns">
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<FontColorsOutlined />}
                                onClick={addTextType}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<FileImageOutlined />}
                                onClick={addImgType}
                            />
                            <Button
                                type="primary"
                                shape="circle"
                                icon={<AudioOutlined />}
                                onClick={addVoiceType}
                            />
                        </div>
                        <span className="courseItem">课程名称：</span>
                        <br />
                        <Input
                            placeholder="请输入课程名..."
                            value={name}
                            maxLength={10}
                            onChange={e => setName(e.target.value)}
                        />
                        {/* —————————————————————————— */}
                        {!textType.length ? null : (
                            <>
                                <span className="courseItem">文字信息：</span>
                                <br />
                            </>
                        )}
                        {/* 动态渲染文字信息 */}
                        {textType.map((obj, index) => (
                            <div className="autoItem" key={obj.id}>
                                <Input
                                    placeholder="请输入中文课程内容..."
                                    value={obj.zh}
                                    style={{ width: 'calc(100% - 50px)' }}
                                    onChange={e => {
                                        const copy = [...textType];
                                        copy[index].zh = e.target.value;
                                        setTextType(copy);
                                    }}
                                />
                                <Input
                                    placeholder="请输入英文课程内容..."
                                    value={obj.en}
                                    style={{ width: 'calc(100% - 50px)' }}
                                    onChange={e => {
                                        const copy = [...textType];
                                        copy[index].en = e.target.value;
                                        setTextType(copy);
                                    }}
                                />
                                <Button
                                    type="primary"
                                    danger
                                    style={{ width: '50px' }}
                                    onClick={() => deleteTextById(obj.id)}
                                >
                                    -
                                </Button>
                            </div>
                        ))}
                        {/* —————————————————————————— */}
                        {!imgType.length ? null : (
                            <>
                                <span className="courseItem">图片地址：</span>
                                <br />
                            </>
                        )}
                        {/* 动态渲染图片信息 */}
                        {imgType.map((obj, index) => (
                            <div className="autoItem" key={obj.id}>
                                <Input
                                    placeholder="请输入一个汉字，并转化为图片url..."
                                    style={{ width: 'calc(100% - 100px)' }}
                                    maxLength={1}
                                    value={obj.url}
                                    onChange={e => {
                                        const copy = [...imgType];
                                        copy[index].url = e.target.value;
                                        setImgType(copy);
                                    }}
                                />
                                <Button
                                    type="primary"
                                    style={{ width: '50px' }}
                                    onClick={() => getImg(obj.url, index)}
                                >
                                    +
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    style={{ width: '50px' }}
                                    onClick={() => deleteImgById(obj.id)}
                                >
                                    -
                                </Button>
                            </div>
                        ))}

                        {!voiceType.length ? null : (
                            <>
                                <span className="courseItem">声音信息：</span>
                                <br />
                            </>
                        )}
                        {/* 动态渲染声音课程 */}
                        {voiceType.map((obj, index) => (
                            <div className="autoItem" key={obj.id}>
                                <Input
                                    placeholder="请输入中文，并生成语音url..."
                                    style={{ width: 'calc(100% - 100px)' }}
                                    value={obj.url}
                                    maxLength={36}
                                    onChange={e => {
                                        const copy = [...voiceType];
                                        copy[index].url = e.target.value;
                                        setVoiceType(copy);
                                    }}
                                />
                                <Button
                                    type="primary"
                                    style={{ width: '50px' }}
                                    onClick={() => getVoice(obj.url, index)}
                                >
                                    AI
                                </Button>
                                <Button
                                    type="primary"
                                    danger
                                    style={{ width: '50px' }}
                                    onClick={() => deleteVoiceById(obj.id)}
                                >
                                    -
                                </Button>
                            </div>
                        ))}
                        <span className="courseItem">测试题目：</span>
                        <Input
                            placeholder="请输入题目内容..."
                            value={question}
                            maxLength={36}
                            onChange={e => setQuestion(e.target.value)}
                        />
                        <span className="courseItem">题目答案：</span>
                        <br />
                        <Radio.Group
                            name="radiogroup"
                            value={ansIndex}
                            onChange={e => setAnsIndex(e.target.value)}
                        >
                            <Space direction="vertical">
                                <Radio value={0}>
                                    <Input
                                        placeholder="请输入选项答案..."
                                        value={ansA}
                                        onChange={e => setAnsA(e.target.value)}
                                        maxLength={12}
                                    />
                                </Radio>
                                <Radio value={1}>
                                    <Input
                                        placeholder="请输入选项答案..."
                                        value={ansB}
                                        onChange={e => setAnsB(e.target.value)}
                                        maxLength={12}
                                    />
                                </Radio>
                                <Radio value={2}>
                                    <Input
                                        placeholder="请输入选项答案..."
                                        value={ansC}
                                        onChange={e => setAnsC(e.target.value)}
                                        maxLength={12}
                                    />
                                </Radio>
                                <Radio value={3}>
                                    <Input
                                        placeholder="请输入选项答案..."
                                        value={ansD}
                                        onChange={e => setAnsD(e.target.value)}
                                        maxLength={12}
                                    />
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>
                </div>
                {/* 右边预览 */}
                <div className="addRight">
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
                            {textType.map(obj =>
                                obj.zh ? (
                                    <div className="courseContent">
                                        <div className="contentZh">{obj.zh}</div>
                                        {obj.en ? (
                                            <div className="contentEn">翻译：{obj.en}</div>
                                        ) : null}
                                    </div>
                                ) : null
                            )}
                            {imgType.map(obj =>
                                obj.url ? (
                                    <div className="courseImg">
                                        <img src={obj.url} alt="请点击按钮" />
                                    </div>
                                ) : null
                            )}
                            {voiceType.map(obj =>
                                obj.url ? (
                                    <div className="courseVoice">
                                        <RiVoiceprintFill />
                                        voice
                                    </div>
                                ) : null
                            )}
                            {question ? <div className="courseTest">小测试：{question}</div> : null}

                            {ansA || ansB || ansC || ansD ? (
                                <div className="answer">
                                    {[ansA, ansB, ansC, ansD].map((value, index) =>
                                        value ? (
                                            <div className="answerItem" key={index}>
                                                <div className="answerItemIndex">
                                                    {getIndex(index)}
                                                </div>
                                                <div className="answerItemContent">{value}</div>
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Add);
