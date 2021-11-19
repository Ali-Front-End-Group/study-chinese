import { logoLink, about_img, Inner_bg } from '../../../utils/constant';
import s from './index.module.css';

const Help = () => {
    const name = '不学汉语';
    const text =
        '是一个以提高学习者听说能力为重点、以“即学即用”为目的的综合类智能汉语学习平台。通过AI对话驱动的学习模式，能够有效补足用户在学习时缺乏对话互动环节的空白。对外汉语教师可以通过「不学汉语」的在线可视化平台轻松设计出包含文字、语音、影片、测验、口语任务等多种互动形式的趣味课程，使得学习者能在与AI对话的过程中轻松掌握知识，提升学习的效率与水平。';
    return (
        <div className={s.HelpBox}>
            <div className={s.left}>
                <div style={{ textAlign: 'center' }}>
                    <img
                        src={logoLink}
                        alt="logo"
                        style={{ width: '120px', transform: 'skewX(-10deg)' }}
                    />
                </div>

                <div className={s.contact} style={{ boxSizing: 'border-box', padding: '30px' }}>
                    <h2 style={{ fontWeight: 'normal', fontSize: '23px', letterSpacing: '5px' }}>
                        介绍
                    </h2>
                    <hr
                        style={{
                            height: '1px',
                            backgroundColor: '#bcbfc0',
                            border: 'none',
                            margin: '10px 0 20px 0',
                        }}
                    />
                    <p style={{ letterSpacing: '3px', lineHeight: '38px' }}>
                        <b style={{ marginLeft: '38px' }}>{name}</b>
                        {text}
                    </p>
                </div>
            </div>
            <div className={s.right}>
                <div className={s.left_top} style={{ textAlign: 'center' }}>
                    <img src={about_img} style={{ width: '1000px', height: '293px' }} />
                </div>
                <div className={s.left_bottom}>
                    <div className={s.left_bottom_left}>
                        <h2
                            style={{ fontWeight: 'normal', fontSize: '23px', letterSpacing: '5px' }}
                        >
                            小队名称
                        </h2>
                        <hr
                            style={{
                                height: '1px',
                                backgroundColor: '#bcbfc0',
                                border: 'none',
                                margin: '10px 0 20px 0',
                            }}
                        />
                        <p style={{ letterSpacing: '10px', fontSize: '18px', marginLeft: '60px' }}>
                            <b>取名好难</b>
                        </p>
                        <br />
                        <br />
                        <h3
                            style={{ fontWeight: 'normal', fontSize: '23px', letterSpacing: '5px' }}
                        >
                            小队成员
                        </h3>
                        <hr
                            style={{
                                height: '1px',
                                backgroundColor: '#bcbfc0',
                                border: 'none',
                                margin: '10px 0 20px 0',
                            }}
                        />
                        <div style={{ display: 'flex', marginLeft: '60px' }}>
                            <p
                                style={{
                                    letterSpacing: '5px',
                                    fontSize: '18px',
                                    marginRight: '10px',
                                }}
                            >
                                <b>余世龙</b>
                            </p>
                            <p
                                style={{
                                    letterSpacing: '5px',
                                    fontSize: '18px',
                                    marginRight: '10px',
                                }}
                            >
                                <b>李姿轩</b>
                            </p>
                            <p
                                style={{
                                    letterSpacing: '5px',
                                    fontSize: '18px',
                                    marginRight: '10px',
                                }}
                            >
                                <b>董琛琛</b>
                            </p>
                            <p
                                style={{
                                    letterSpacing: '5px',
                                    fontSize: '18px',
                                    marginRight: '10px',
                                }}
                            >
                                <b>程云来</b>
                            </p>
                        </div>
                    </div>
                    <div className={s.left_bootom_right}>
                        <h2
                            style={{
                                fontWeight: 'normal',
                                fontSize: '23px',
                                marginBottom: '10px',
                                letterSpacing: '5px',
                            }}
                        >
                            联系
                        </h2>
                        <hr style={{ height: '1px', backgroundColor: '#bcbfc0', border: 'none' }} />
                        <p>
                            <span>后端维护：</span>charliemills@qq.com
                        </p>
                        <p>
                            <span>后端维护：</span>15958129629@qq.com
                        </p>
                        <p>
                            <span>前端维护：</span>389269570@qq.com
                        </p>
                        <p>
                            <span>联系方式：</span>+86 0571 8503 8814
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
