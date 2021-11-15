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
    const [ifDelete, setIfDelete] = useState(false); //FIXME:img启用的逻辑

    //删除课程数据
    const deleteData = (courseId) => {
        if (ifDelete === true) {
            let newCourseData = [...courseData];
            newCourseData.splice(courseId, 1);
            setCourseData(newCourseData);
            setIfDelete(false);
        }
    };

    //显示课程信息
    const showModal = () => {
        console.log(ifDelete);
        if (!ifDelete) {
            setVisible(true);
        }
    };

    //跳转到编辑页面
    const handleEdit = () => {
        setVisible(false);
        //TODO:跳转到编辑页面
    };

    //取消弹窗
    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div className="courseLayout">
            <AddCourse />
            {courseData.map(course => (
                <CourseCard
                    key={course.courseName}
                    courseCard={course}
                    handleDeleteData={deleteData}
                    showModal={showModal}
                    handleEdit={handleEdit}
                    handleCancel={handleCancel}
                    visible={visible}
                    courseId={course.id}
                    setIfDelete={setIfDelete}
                />
            ))}
        </div>
    );
};

export default Course;
