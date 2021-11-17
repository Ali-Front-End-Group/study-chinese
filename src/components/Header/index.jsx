import { MdSpellcheck } from 'react-icons/md';
import { EnterOutlined } from '@ant-design/icons';
import { openNotification } from '../../utils/functions';
import List from './List';
import './index.css';

const Header = ({ isLogin, setIsLogin }) => {
    const logout = () => {
        setIsLogin(false);
        sessionStorage.removeItem('token');
        openNotification('推出成功！欢迎再次使用！', <EnterOutlined />);
    };
    return (
        <>
            <header>
                <MdSpellcheck className="logo" />
                <span>这是header</span>
                {isLogin ? (
                    <>
                        <List />
                        <div className="logoutBtn" onClick={logout}>
                            退出
                        </div>
                    </>
                ) : null}
            </header>
            <div className="placeholderBox"></div>
        </>
    );
};

export default Header;
