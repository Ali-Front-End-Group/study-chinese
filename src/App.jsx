import { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Admin from './pages/Admin';
import Welcome from './pages/Welcome';

const App = () => {
    const [isLogin, setIsLogin] = useState(false);
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
