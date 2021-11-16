import { MdSpellcheck } from 'react-icons/md';
import List from './List';
import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';
import './index.css';

const Header = ({ isLogin, setIsLogin }) => {
    return (
        <>
            <header>
                <MdSpellcheck className="logo" />
                <span>这是header</span>
                {isLogin ? <List /> : null}
                {isLogin ? (
                    <LogoutBtn setIsLogin={setIsLogin} />
                ) : (
                    <LoginBtn setIsLogin={setIsLogin} />
                )}
            </header>
            <div className="placeholderBox"></div>
        </>
    );
};

export default Header;
