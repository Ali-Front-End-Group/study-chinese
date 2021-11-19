import { useState } from 'react';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import { Card, Modal, Button } from 'antd';
import { courseBackground } from '../../../utils/constant';

const Square = ({ allCourses }) => {
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
        <div
            className="CourseBox"
            style={{ background: `url(${courseBackground}) 0 / cover fixed` }}
        >
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
            <div className="courseLayout">
                {allCourses.map(obj => (
                    <Card
                        key={obj.id}
                        cover={<img alt="图片" src={obj.cover} className="coverImg" />}
                        className="courseCard"
                        onClick={() => {
                            setTheID(obj.id);
                            setModalShow(true);
                        }}
                    >
                        <div className="courseName">{obj.title}</div>
                        <div className="courseDesc">{obj.bio}</div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default connect(state => ({ allCourses: state.allCourses }), {})(Square);
