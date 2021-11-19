import { logoLink, appName, groupMember, appDescription, contact } from '../../../utils/constant';
import s from './index.module.css';

const Help = () => (
    <div className={s.HelpBox}>
        <div className={s.left}>
            <div style={{ textAlign: 'center' }}>
                <img src={logoLink} alt="logo" style={{ width: '120px' }} />
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
                <p style={{ letterSpacing: '3px', lineHeight: '38px', fontSize: '16px' }}>
                    <b style={{ marginLeft: '38px' }}>{appName}</b>
                    {appDescription}
                </p>
            </div>
        </div>
        <div className={s.right}>
            <div style={{ textAlign: 'center' }}>
                <img
                    alt="BG"
                    src="/img/aboutBG.png"
                    style={{ width: '1000px', height: '293px', marginBottom: '40px' }}
                />
            </div>
            <div className={s.left_bottom}>
                <div>
                    <h2 style={{ fontWeight: 'normal', fontSize: '23px', letterSpacing: '5px' }}>
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
                    <h3 style={{ fontWeight: 'normal', fontSize: '23px', letterSpacing: '5px' }}>
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
                        {groupMember.map((item, index) => (
                            <p
                                key={index}
                                style={{
                                    letterSpacing: '5px',
                                    fontSize: '18px',
                                    marginRight: '10px',
                                }}
                            >
                                <b>{item}</b>
                            </p>
                        ))}
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
                    {contact.map((obj, index) => (
                        <p key={index} className={s.contactBox}>
                            <div className={s.contactKey}>{obj.key}：</div>
                            <div className={s.contactValue}>{obj.value}</div>
                        </p>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default Help;
