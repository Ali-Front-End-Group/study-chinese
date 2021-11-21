import { useState, useEffect } from 'react';
import AddCourse from '../../../components/AddCourse';
import { Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import { setAllCourses } from '../../../redux/actions';
import { DeleteOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { deleteCourseFromDB_API, getAllCourseFromDB_API } from '../../../utils/api';
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
    // 点击垃圾桶，删除课程
    const deleteCourseById = async (e, id) => {
        // 阻止事件冒泡
        e.stopPropagation();
        const token = localStorage.getItem('token');
        const { isTrue, text } = await deleteCourseFromDB_API(id, token);
        if (isTrue) {
            message.success(text);
            // 若删除成功，获取所有课程
            const { isTrue: isTrue_, data } = await getAllCourseFromDB_API(token);
            isTrue_ && setAllCourses(data);
        } else {
            message.error(text);
        }
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
