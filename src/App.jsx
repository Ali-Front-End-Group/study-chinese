import { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLogin } from './redux/actions';
import { checkLogin } from './utils/api';
import Header from './components/Header';
import Admin from './pages/Admin';
import Welcome from './pages/Welcome';

const App = ({ isLogin, setIsLogin }) => {
    useEffect(() => {
        const fetchData = async () => {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            if (!id || !token) {
                setIsLogin(false);
                return;
            }
            const flag = await checkLogin(id, token);
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
