// import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import './index.css';

const Admin = () => {
    return (
        <div className="courseLayout">
            <CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
        </div>
    );
};

export default Admin;
