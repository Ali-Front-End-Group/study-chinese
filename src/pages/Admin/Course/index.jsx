import { useState, useEffect } from 'react';
import CourseCard from '../../../components/CourseCard';
import AddCourse from '../../../components/AddCourse';
import './index.css';

const Course = () => {
    //测试数据
    const [courseData, setCourseData] = useState([]);

    useEffect(() => {
        const data = [
            {
                imgLink: '/img/chinese.jpeg',
                courseName: '111',
                teacherName: '222',
                courseLink: 'http://www.baidu.com',
                courseInfo: '这是课程简介',
                stuNum: 7,
                star: 2,
            },
            {
                imgLink: '/img/math.jpg',
                courseName: '333',
                teacherName: '444',
                courseLink: 'http://www.bilibili.com',
                courseInfo: '这是课程简介',
                stuNum: 2,
                star: 7,
            },
            {
                imgLink: '/img/chinese.jpeg',
                courseName: '1',
                teacherName: '222',
                courseLink: 'http://www.baidu.com',
                courseInfo: '这是课程简介',
                stuNum: 4,
                star: 2,
            },
        ];
        setCourseData(data);
    }, []);
    const [visible, setVisible] = useState(false);
    const [ifDelete, setIfDelete] = useState(false);

    //显示课程信息
    const showModal = () => {
        if (!ifDelete) {
            setVisible(true);
        }
    };

    //跳转到编辑页面
    const handleEdit = () => {
        setVisible(false);
        //跳转到编辑页面（还没写）
    };

    //取消弹窗
    const handleCancel = () => {
        setVisible(false);
    };

    //删除卡片
    const handleDelete = () => {
        setIfDelete(true);
        console.log('delete');
        //还没写
    };

    return (
        <div className="courseLayout">
            <AddCourse />
            {courseData.map(course => (
                <CourseCard
                    key={course.courseName}
                    courseCard={course}
                    onHandleDelete={handleDelete}
                    showModal={showModal}
                    handleEdit={handleEdit}
                    handleCancel={handleCancel}
                    visible={visible}
                />
            ))}
        </div>
    );
};

export default Course;
