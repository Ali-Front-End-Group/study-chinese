import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import { nanoid } from 'nanoid';
import { Modal, Button } from 'antd';

const Square = ({ allCourses }) => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const copy = [...allCourses];
        const num = copy.length % 5;
        if (num >= 2 && num <= 4) {
            for (let i = 0; i < 5 - num; i++) {
                copy.push({});
            }
        }
        setCourses(copy);
    }, [allCourses]);
    // 选中的课程ID
    const [theID, setTheID] = useState('');
    // 打开对话框
    const [modalShow, setModalShow] = useState(false);
    // 关闭对话框
    const closeModal = () => {
        setModalShow(false);
        setTheID('');
    };
    return (
        <div className="CourseBox">
            {/* 对话框 */}
            <Modal
                title="课程二维码"
                visible={modalShow}
                onCancel={closeModal}
                footer={[
                    <Button key="back" type="primary" onClick={closeModal}>
                        完成
                    </Button>,
                ]}
            >
                <div style={{ textAlign: 'center' }}>
                    <h3>使用小程序扫码开始学习</h3>
                    <QRCode
                        style={{ marginTop: '10px' }}
                        value={`https://cbapi.musictrack.cn/course/detail?id=${theID}`}
                        size={200}
                    />
                </div>
            </Modal>
            <div className="courseLayout animated bounceInUp">
                {courses.map(obj => {
                    if (JSON.stringify(obj) !== '{}') {
                        return (
                            <div
                                className="courseCard"
                                key={obj.id}
                                onClick={() => {
                                    setTheID(obj.id);
                                    setModalShow(true);
                                }}
                            >
                                <div
                                    className="courseCardImgBox"
                                    style={{
                                        backgroundImage: `url(${obj.cover})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center center',
                                    }}
                                ></div>
                                <div className="courseCardTitle">{obj.title}</div>
                                <div className="courseCardDesc">{obj.bio}</div>
                            </div>
                        );
                    } else {
                        return <div className="courseCardNull" key={nanoid()}></div>;
                    }
                })}
            </div>
        </div>
    );
};

export default connect(state => ({ allCourses: state.allCourses }), {})(Square);
