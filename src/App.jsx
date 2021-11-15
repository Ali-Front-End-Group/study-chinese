import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Admin from './pages/Admin';
import Welcome from './pages/Welcome';

const App = () => {
    const [isLogin, setIsLogin] = useState(false);
    // 判断是否登录过
    useEffect(() => {
        // 判断是否已经登录的逻辑
        // ....
        setIsLogin(false);
    }, []);
    return (
        <>
            <Header isLogin={isLogin} setIsLogin={setIsLogin} />
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

export default App;
