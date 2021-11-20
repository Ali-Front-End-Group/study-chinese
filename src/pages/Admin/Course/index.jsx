import { useState, useEffect } from 'react';
import AddCourse from '../../../components/AddCourse';
import { Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import { setAllCourses } from '../../../redux/actions';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { DB_URL } from '../../../utils/constant';
import './index.css';

const Course = ({ history, userId, allCourses, setAllCourses }) => {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const myCourses = allCourses.filter(obj => `${obj.user_id}` === userId);
        const num = (myCourses.length + 1) % 5;
        if (num >= 2 && num <= 4) {
            for (let i = 0; i < 5 - num; i++) {
                myCourses.push({});
            }
        }
        setCourses(myCourses);
    }, [allCourses, userId]);
    const text = '确定删除该课程？';
    // 从数据库获取所有课程信息
    const getAllCourseFromDB = () => {
        axios({
            url: `${DB_URL}/course/listAll`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    setAllCourses(res.data.data.rows);
                    // message.success('获取所有课程成功！');
                } else {
                    message.warning('获取课程信息失败！');
                }
            },
            () => message.warning('获取课程信息失败！')
        );
    };
    // 从数据库删除指定课程
    const deleteCourseFromDB = id => {
        axios({
            url: `${DB_URL}/course/delete`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
            data: {
                id: `${id}`,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    message.success('删除课程成功！');
                    getAllCourseFromDB();
                } else {
                    message.warning('删除课程失败！');
                }
            },
            () => message.warning('删除课程失败！')
        );
    };
    // 点击垃圾桶，删除课程
    const deleteCourseById = (e, id) => {
        // 阻止事件冒泡
        e.stopPropagation();
        deleteCourseFromDB(id);
        // 将相应id过滤掉
        // const newCourseData = courseData.filter(obj => obj.id !== id);
        // 更新状态
        // setCourseData(newCourseData);
        // message.success('课程删除成功！');
    };
    // 跳转到编辑页面
    const toEditCoursePage = id => {
        history.push(`/admin/add?id=${id}`);
    };
    return (
        <div className="CourseBox">
            <div className="courseLayout animated bounceInUp">
                {/* 添加课程卡片 */}
                <AddCourse />
                {/* 渲染课程卡片列表 */}
                {courses.map(obj => {
                    if (JSON.stringify(obj) !== '{}') {
                        return (
                            <div
                                className="courseCard"
                                key={obj.id}
                                onClick={() => toEditCoursePage(obj.id)}
                            >
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

export default connect(
    state => ({
        userId: state.userInfo.id,
        allCourses: state.allCourses,
    }),
    { setAllCourses }
)(Course);
