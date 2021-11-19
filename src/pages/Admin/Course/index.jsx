import AddCourse from '../../../components/AddCourse';
import { Card, Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import { setAllCourses } from '../../../redux/actions';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { DB_URL, courseBackground } from '../../../utils/constant';
import './index.css';

const Course = ({ history, userId, allCourses, setAllCourses }) => {
    const text = '确定删除该课程？';
    // 从数据库获取所有课程信息
    const getAllCourseFromDB = () => {
        axios({
            url: `${DB_URL}/course/list?userId=${userId}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    setAllCourses(res.data.data.rows);
                    message.success('获取所有课程成功！');
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
    // 从数据库删除指定课程
    const deleteCourseFromDB = id => {
        axios({
            url: `${DB_URL}/course/delete`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            err => {
                console.log(err);
                message.warning('删除课程失败！');
            }
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
        <div
            className="CourseBox"
            style={{ background: `url(${courseBackground}) 0 / cover fixed` }}
        >
            <div className="courseLayout">
                {/* 添加课程卡片 */}
                <AddCourse />
                {/* 渲染课程卡片列表 */}
                {allCourses.map(obj => {
                    return (
                        <Card
                            key={obj.id}
                            cover={<img alt="图片" src={obj.cover} className="coverImg" />}
                            className="courseCard"
                            onClick={() => toEditCoursePage(obj.id)}
                        >
                            <div className="courseName">{obj.title}</div>
                            <div className="courseDesc">{obj.bio}</div>
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
        </div>
    );
};

export default connect(
    state => ({
        userId: state.userId,
        allCourses: state.allCourses,
    }),
    { setAllCourses }
)(Course);
