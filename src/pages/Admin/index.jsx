import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAllCourses, setUserInfo } from '../../redux/actions';
import { DB_URL } from '../../utils/constant';
import { message } from 'antd';
import axios from 'axios';
import Help from './Help';
import Course from './Course';
import Add from './Add';
import Square from './Square';
import './index.css';

const Admin = ({ isLogin, setAllCourses, setUserInfo }) => {
    // 从数据库获取所有课程信息
    const getAllCourseFromDB = TOKEN => {
        axios({
            url: `${DB_URL}/course/listAll`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    setAllCourses(res.data.data.rows);
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
    // 获取个人信息
    const getUserInfo = (id, token) => {
        axios({
            url: `${DB_URL}/user/detail?id=${id}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(
            res => {
                if (res.data.result === 'success') {
                    const { nickname, avatar, bio } = res.data.data;
                    setUserInfo({ id, nickname, avatar, bio });
                    // setAllCourses(res.data.data.rows);
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
    useEffect(() => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        getUserInfo(id, token);
        getAllCourseFromDB(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);
    return (
        <div className="adminBox">
            <Switch>
                <Route path="/admin/add" component={Add} />
                <Route path="/admin/course" component={Course} />
                <Route path="/admin/square" component={Square} />
                <Route path="/admin/help" component={Help} />
                <Redirect to="/admin/course" />
            </Switch>
        </div>
    );
};

export default connect(
    state => ({
        isLogin: state.isLogin,
    }),
    { setAllCourses, setUserInfo }
)(Admin);
