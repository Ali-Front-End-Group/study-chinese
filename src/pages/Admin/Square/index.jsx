import AddCourse from '../../../components/AddCourse';
import { Card, Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import { setAllCourses } from '../../../redux/actions';
import { DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import { DB_URL, courseBackground } from '../../../utils/constant';
import './index.css';
import {useState} from "react";

const Square = ({ history }) => {
    const [courses, setCourses] = useState([]);
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
                    setCourses(res.data.data.rows);
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
    // getAllCourse();
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
                {courses.map(obj => {
                    return (
                        <Card
                            key={obj.id}
                            cover={<img alt="图片" src={obj.cover} className="coverImg" />}
                            className="courseCard"
                            // onClick={() => toEditCoursePage(obj.id)}
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

export default connect(() => ({}), {
})(Square);
