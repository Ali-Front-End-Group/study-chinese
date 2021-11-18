import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setIsLogin } from './redux/actions';
import Header from './components/Header';
import Admin from './pages/Admin';
import Welcome from './pages/Welcome';

const App = ({ isLogin, setIsLogin }) => {
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
