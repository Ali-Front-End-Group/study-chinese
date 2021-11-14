import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import Admin from './components/Admin';

const App = () => {
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        setIsLogin(true);
    }, []);
    return <>{isLogin ? <Admin /> : <Welcome />}</>;
};

export default App;
