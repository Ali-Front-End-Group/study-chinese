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
    // 返回
    const goBack = () => {
        history.push('/admin/course');
    };
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    // 课程名
    const [name, setName] = useState('');
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

    // 添加课程
    const addCourse = type => {
        const id = nanoid();
        let obj;
        if (type === 'text') {
            obj = { id, type, zh: '', en: '' };
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
                        </div>
                        <span className="courseItem">课程名称：</span>
                        <br />
                        <Input
                            placeholder="请输入课程名..."
                            value={name}
                            maxLength={10}
                            onChange={e => setName(e.target.value)}
                        />

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
                                            -
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
                                            style={{ width: 'calc(100% - 100px)' }}
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
                                            +
                                        </Button>
                                        <Button
                                            type="primary"
                                            danger
                                            style={{ width: '50px' }}
                                            onClick={() => deleteCourseById(obj.id)}
                                        >
                                            -
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
                                            style={{ width: 'calc(100% - 100px)' }}
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
                                            AI
                                        </Button>
                                        <Button
                                            type="primary"
                                            danger
                                            style={{ width: '50px' }}
                                            onClick={() => deleteCourseById(obj.id)}
                                        >
                                            -
                                        </Button>
                                    </div>
                                );
                            }
                        })}
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
                                        <div className="courseVoice" key={obj.id}>
                                            <RiVoiceprintFill />
                                            voice
                                        </div>
                                    ) : null;
                                }
                            })}
                            {/* 渲染测试题目 */}
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
