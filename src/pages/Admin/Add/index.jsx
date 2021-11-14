import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { FaWifi } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineEllipsis } from 'react-icons/ai';
import { Input, Button, Upload } from 'antd';
import { BASE_URL } from '../../../utils/constant';
import { RiVoiceprintFill } from 'react-icons/ri';
import axios from 'axios';
import './index.css';

const Add = () => {
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
    const getQiniuToken = () => {
        return axios.post(BASE_URL + '/api/get_uploadToken', {}).then(res => res.data.uptoken);
    };

    return (
        <div className="addBox">
            <div className="addCenter">
                {/* 左边输入部分 */}
                <div className="addLeft">
                    <div className="inputBox">
                        <div className="addBtnBox">
                            <div className="addBackBtn">取消</div>
                            <div className="addBtn">确认</div>
                        </div>
                        <span>课程名称：</span>
                        <Input
                            placeholder="请输入课程名..."
                            value={name}
                            maxLength={10}
                            onChange={e => setName(e.target.value)}
                        />
                        <span>课程内容：</span>
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
                        <span>图片地址：</span>
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
                        <span>声音信息：</span>
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
                        <span>视频信息：</span>
                        <Input
                            placeholder="请选择视频，并声称视频url..."
                            style={{ width: 'calc(100% - 50px)' }}
                        />
                        <Upload multiple={false} accept=".mp4,.avi,.flv,.wmv">
                            <Button type="primary" style={{ width: '50px' }}>
                                +
                            </Button>
                        </Upload>
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
                            <div className="courseVoice">
                                <RiVoiceprintFill />
                                voice
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;
