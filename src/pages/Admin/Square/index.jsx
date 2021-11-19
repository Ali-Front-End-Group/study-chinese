// import AddCourse from '../../../components/AddCourse';
import {Card, Popconfirm, message, Modal, Button} from 'antd';
import {connect} from 'react-redux';
// import { setAllCourses } from '../../../redux/actions';
// import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import {DB_URL, courseBackground} from '../../../utils/constant';
import './index.css';
import {useState, useEffect} from 'react';
import QRCode from "qrcode.react";

const Square = ({history}) => {
    const [course, setCourse] = useState([]);
    const [editID, setEditID] = useState('');
    // 对话框的显示
    const [modalVisible, setModalVisible] = useState(false);
    // 从数据库获取所有课程信息
    const getAllCourse = () => {
        axios({
            url: `${DB_URL}/course/listAll`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    setCourse(res.data.data.rows);
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

    useEffect(() => {
        getAllCourse();
    }, []);
    // 跳转到编辑页面
    // 对话框隐藏
    const handleCancel = () => {
        setModalVisible(false);
    };
    return (
        <div
            className="CourseBox"
            style={{background: `url(${courseBackground}) 0 / cover fixed`}}
        >
            {/* 对话框 */}
            <Modal
                title="课程二维码"
                visible={modalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        完成
                    </Button>,
                ]}
            >
                <div style={{textAlign: 'center'}}>
                    <h3>使用小程序扫码开始学习</h3>
                    <QRCode
                        style={{marginTop: '10px'}}
                        value={`https://cbapi.musictrack.cn/course/detail?id=${editID}`}
                        size={200}
                    />
                </div>
            </Modal>
            <div className="courseLayout">
                {course.map(obj => {
                    return (
                        <Card
                            key={obj.id}
                            cover={<img alt="图片" src={obj.cover} className="coverImg"/>}
                            className="courseCard"
                            onClick={() => {
                                setEditID(obj.id);
                                setModalVisible(true)
                            }}
                        >
                            <div className="courseName">{obj.title}</div>
                            <div className="courseDesc">{obj.bio}</div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default connect(() => ({}), {})(Square);
