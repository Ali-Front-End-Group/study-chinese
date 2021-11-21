import { Route, Switch, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setAllCourses, setUserInfo } from '../../redux/actions';
import { getUserInfoAPI, getAllCourseFromDB_API } from '../../utils/api';
import { backGroundImg } from '../../utils/constant';
import { message } from 'antd';
import Help from './Help';
import Course from './Course';
import Add from './Add';
import Square from './Square';
import './index.css';

const Admin = ({ isLogin, setAllCourses, setUserInfo }) => {
    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            const { isTrue, nickname, avatar, bio, text } = await getUserInfoAPI(id, token);
            if (isTrue) {
                setUserInfo({ id, nickname, avatar, bio });
            } else {
                message.error(text);
            }
            const { isTrue: isTrue_, data, text: text_ } = await getAllCourseFromDB_API(token);
            if (isTrue_) {
                setAllCourses(data);
            } else {
                message.warning(text_);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin]);
    return (
        <div className="adminBox" style={{ background: `url(${backGroundImg}) 0 / cover fixed` }}>
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
