// import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import AddCourse from './AddCourse';
import './index.css';

const Admin = () => {
    //测试数据
    const courseData = [
        {
            imgLink: "/img/语文.jpeg",
            courseName: "111",
            teacherName: "222",
            courseLink: "http://www.baidu.com"
        },
        {
            imgLink: "/img/数学.jpg",
            courseName: "333",
            teacherName: "444",
            courseLink: "http://www.bilibili.com"
        },
        {
            imgLink: "/img/语文.jpeg",
            courseName: "111",
            teacherName: "222",
            courseLink: "http://www.baidu.com"
        },
        {
            imgLink: "/img/数学.jpg",
            courseName: "333",
            teacherName: "444",
            courseLink: "http://www.bilibili.com"
        },
    ]

    return (
        <div className="courseLayout">
            <AddCourse />
            {
                courseData.map(course => (
                    <CourseCard 
                        key={course.courseName}
                        imgLink={course.imgLink}
                        courseName={course.courseName} 
                        teacherName={course.teacherName}
                        courseLink={course.courseLink}
                    />
                ))
            }
        </div>
    );
};

export default Admin;
