import { useState, useEffect } from 'react';
import AddCourse from '../../../components/AddCourse';
import { Modal, Button, Card, Popconfirm, message, Rate } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.css';

const Course = () => {
    //测试数据
    const [courseData, setCourseData] = useState([]);
    useEffect(() => {
        const data = [
            {
                id: '00',
                imgLink: '/img/chinese.jpeg',
                courseName: '语文',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 7,
                star: 3.5,
            },
            {
                id: '01',
                imgLink: '/img/math.jpg',
                courseName: '数学',
                courseLink: 'http://www.bilibili.com',
                courseDesc: '这是课程简介',
                stuNum: 2,
                star: 4.5,
            },
            {
                id: '02',
                imgLink: '/img/chinese.jpeg',
                courseName: '英语',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 2.5,
            },
            {
                id: '03',
                imgLink: '/img/chinese.jpeg',
                courseName: '物理',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3,
            },
            {
                id: '04',
                imgLink: '/img/chinese.jpeg',
                courseName: '化学',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3.5,
            },
            {
                id: '05',
                imgLink: '/img/chinese.jpeg',
                courseName: '生物',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 2.5,
            },
            {
                id: '06',
                imgLink: '/img/chinese.jpeg',
                courseName: '地理',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 5,
            },
            {
                id: '07',
                imgLink: '/img/chinese.jpeg',
                courseName: '历史',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 2.5,
            },
            {
                id: '08',
                imgLink: '/img/chinese.jpeg',
                courseName: '政治',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3,
            },
            {
                id: '09',
                imgLink: '/img/chinese.jpeg',
                courseName: '政治',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3,
            },
            {
                id: '10',
                imgLink: '/img/chinese.jpeg',
                courseName: '政治',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3,
            },
            {
                id: '11',
                imgLink: '/img/chinese.jpeg',
                courseName: '政治',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3,
            },
            {
                id: '12',
                imgLink: '/img/chinese.jpeg',
                courseName: '政治',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3,
            },
            {
                id: '13',
                imgLink: '/img/chinese.jpeg',
                courseName: '政治',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3,
            },
            {
                id: '14',
                imgLink: '/img/chinese.jpeg',
                courseName: '政治',
                courseLink: 'http://www.baidu.com',
                courseDesc: '这是课程简介',
                stuNum: 4,
                star: 3,
            },
        ];
        setCourseData(data);
    }, []);
    // 控制对话框显示
    const [modalShow, setModalShow] = useState(false);
    // 课程ID
    const [courseId, setCourseId] = useState('');
    // 课程名、课程信息、学生人数、星星数
    const [courseName, setCourseName] = useState('');
    const [courseDesc, setCourseDesc] = useState('');
    const [stuNum, setStuNum] = useState(0);
    const [star, setStar] = useState(0);
    const text = '确定删除该课程？';
    // 点击卡片，打开对话框
    const openCourseInfo = id => {
        // 根据传入的id，找到某个课程对象
        // 过滤出的是个数组，只有一项
        const courseObj = courseData.filter(obj => obj.id === id)[0];
        // 获得该课程的具体信息
        const { courseName, courseDesc, stuNum, star } = courseObj;
        // 更新状态
        setCourseId(id);
        setCourseName(courseName);
        setCourseDesc(courseDesc);
        setStuNum(stuNum);
        setStar(star);
        // 先更新状态后，再打开对话框，避免可能出现的白屏
        setModalShow(modalShow => !modalShow);
    };
    // 点击取消，关闭对话框
    const closeCourseInfo = () => {
        // 先关闭对话框
        setModalShow(modalShow => !modalShow);
        // 再清空状态
        setCourseId('');
        setCourseName('');
        setCourseDesc('');
        setStuNum(0);
        setStar(0);
    };
    // 点击垃圾桶，删除课程
    const deleteCourseById = (e, id) => {
        // 阻止事件冒泡
        e.stopPropagation();
        // 将相应id过滤掉
        const newCourseData = courseData.filter(obj => obj.id !== id);
        // 更新状态
        setCourseData(newCourseData);
        message.success('课程删除成功！');
    };
    // 跳转到编辑页面
    const toEditCoursePage = id => {
        console.log(id, '根据id，跳转到编辑页面');
    };
    return (
        <div className="courseLayout">
            <Modal
                zIndex={9999}
                visible={modalShow}
                title={courseName}
                style={{ top: 200 }}
                onCancel={closeCourseInfo}
                footer={[
                    <Button key="back" onClick={closeCourseInfo}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => toEditCoursePage(courseId)}>
                        编辑
                    </Button>,
                ]}
            >
                <p>{courseDesc}</p>
                <p>参与人数：{stuNum}</p>
                课程评分：
                <Rate disabled allowHalf value={star} />
            </Modal>
            <AddCourse />
            {courseData.map(obj => {
                return (
                    <Card
                        key={obj.id}
                        cover={<img alt="图片" src={obj.imgLink} className="coverImg" />}
                        className="courseCard"
                        onClick={() => openCourseInfo(obj.id)}
                    >
                        <div className="courseName">{obj.courseName}</div>
                        <div className="courseDesc">{obj.courseDesc}</div>
                        <Popconfirm
                            placement="bottom"
                            title={text}
                            onConfirm={e => deleteCourseById(e, obj.id)}
                            onCancel={e => e.stopPropagation()}
                            okText="删除"
                            cancelText="取消"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="deleteCourseBtn">
                                <DeleteOutlined />
                            </div>
                        </Popconfirm>
                    </Card>
                );
            })}
        </div>
    );
};

export default Course;
