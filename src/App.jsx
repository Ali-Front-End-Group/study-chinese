import { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Admin from './pages/Admin';
import Welcome from './pages/Welcome';

const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
            <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            {isLogin ? (
                <>
                    <Route path="/admin" component={Admin} />
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
