// import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CourseCard from '../../../components/CourseCard';
import './index.css';

const Course = ({ history }) => {
    return (
        <div className="courseLayout">
            <div className="addTest" onClick={() => history.push('/admin/add')}>
                添加班级
            </div>
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </div>
    );
};

export default withRouter(Course);
