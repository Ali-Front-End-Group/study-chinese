import { useState, useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineEllipsis } from 'react-icons/ai';
import { Input, Button, Radio, Space } from 'antd';
import { BASE_URL } from '../../../utils/constant';
import { RiVoiceprintFill } from 'react-icons/ri';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import './index.css';
import { forOfStatement } from '@babel/types';

const Add = ({ history }) => {
    const { TextArea } = Input;
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
    });
    // 课程名
    const [name, setName] = useState('');
    // 课程内容中文
    const [contentZh, setContentZh] = useState('');
    // 课程内容英文
    const [contentEn, setContentEn] = useState('');
    // 获得图像url
    const [imgText, setImgText] = useState('');
    const getImg = () => {
        axios
            .get(BASE_URL + '/api/get_pic', {
                params: {
                    character: imgText,
                },
            })
            .then(res => {
                res.data.status === 200 && setImgText(res.data.url);
            });
    };
    // 获得声音url
    const [voiceText, setVoiceText] = useState('');
    const getVoice = () => {
        axios
            .post(BASE_URL + '/api/tts', {
                text: voiceText,
            })
            .then(res => {
                res.data.status === 200 && setVoiceText(res.data.array['思悦']);
            });
    };

    // 视频
    // 获得七牛云token
    // const getQiniuToken = () => {
    //     return axios.post(BASE_URL + '/api/get_uploadToken', {}).then(res => res.data.uptoken);
    // };
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
        }
    };
    // 返回
    const goBack = () => {
        history.push('/admin/course');
    };
    return (
        <div className="addBox">
            <div className="addCenter">
                {/* 左边输入部分 */}
                <div className="addLeft">
                    <div className="inputBox">
                        <div className="addBtnBox">
                            <div className="addBackBtn" onClick={goBack}>
                                取消
                            </div>
                            <div className="addBtn">确认</div>
                        </div>
                        <span className="courseItem">课程名称：</span>
                        <Input
                            placeholder="请输入课程名..."
                            value={name}
                            maxLength={10}
                            onChange={e => setName(e.target.value)}
                        />
                        <span className="courseItem">课程内容：</span>
                        <TextArea
                            placeholder="请输入中文课程内容..."
                            rows={3}
                            style={{ resize: 'none' }}
                            value={contentZh}
                            onChange={e => setContentZh(e.target.value)}
                        />
                        <TextArea
                            placeholder="请输入英文课程内容..."
                            rows={3}
                            style={{ resize: 'none' }}
                            value={contentEn}
                            onChange={e => setContentEn(e.target.value)}
                        />
                        <span className="courseItem">图片地址：</span>
                        <Input
                            placeholder="请输入一个汉字，并转化为图片url..."
                            style={{ width: 'calc(100% - 50px)' }}
                            maxLength={1}
                            value={imgText}
                            onChange={e => setImgText(e.target.value)}
                        />
                        <Button type="primary" style={{ width: '50px' }} onClick={getImg}>
                            +
                        </Button>
                        <span className="courseItem">声音信息：</span>
                        <Input
                            placeholder="请输入中文，并生成语音url..."
                            style={{ width: 'calc(100% - 50px)' }}
                            value={voiceText}
                            maxLength={36}
                            onChange={e => setVoiceText(e.target.value)}
                        />
                        <Button type="primary" style={{ width: '50px' }} onClick={getVoice}>
                            AI
                        </Button>
                        {/* <span className="courseItem">视频信息：</span>
                        <Input
                            placeholder="请选择视频，并生成视频url..."
                            style={{ width: 'calc(100% - 50px)' }}
                        />
                        <Upload multiple={false} accept=".mp4,.avi,.flv,.wmv">
                            <Button type="primary" style={{ width: '50px' }}>
                                +
                            </Button>
                        </Upload> */}
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
                            {contentZh ? (
                                <div className="courseContent">
                                    <div className="contentZh">{contentZh}</div>
                                    {contentEn ? (
                                        <div className="contentEn">翻译：{contentEn}</div>
                                    ) : null}
                                </div>
                            ) : null}
                            {imgText ? (
                                <div className="courseImg">
                                    <img src={imgText} alt="请点击按钮" />
                                </div>
                            ) : null}
                            {voiceText ? (
                                <div className="courseVoice">
                                    <RiVoiceprintFill />
                                    voice
                                </div>
                            ) : null}
                            {question ? <div className="courseTest">小测试：{question}</div> : null}

                            {ansA || ansB || ansC || ansD ? (
                                <div className="answer">
                                    {[ansA, ansB, ansC, ansD].map((value, index) => {
                                        if (value) {
                                            return (
                                                <div className="answerItem" key={index}>
                                                    <div className="answerItemIndex">
                                                        {getIndex(index)}
                                                    </div>
                                                    <div className="answerItemContent">{value}</div>
                                                </div>
                                            );
                                        }
                                    })}
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
