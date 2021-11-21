import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLogin } from './redux/actions';
import { DB_URL } from './utils/constant';
import axios from 'axios';
import Header from './components/Header';
import Admin from './pages/Admin';
import Welcome from './pages/Welcome';

const App = ({ isLogin, setIsLogin }) => {
    // 获取个人信息
    const getUserInfo = async (id, token) => {
        let flag = false;
        await axios({
            url: `${DB_URL}/user/detail?id=${id}`,
            method: 'get',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                if (res.data.data) {
                    flag = true;
                } else {
                    flag = false;
                }
            })
            .catch(() => (flag = false));
        return flag;
    };
    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            if (!id || !token) {
                setIsLogin(false);
                return;
            }
            const flag = await getUserInfo(id, token);
            setIsLogin(flag);
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <Header />
            {isLogin ? (
                <>
                    <Route path="/admin" component={Admin} />
                    <Redirect to="/admin" />
                </>
            ) : (
                <>
                    <Route path="/" component={Welcome} />
                    <Redirect to="/" />
                </>
            )}
        </>
    );
};

export default connect(
    state => ({
        isLogin: state.isLogin,
    }),
    {
        setIsLogin,
    }
)(App);
