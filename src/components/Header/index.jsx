import { MdSpellcheck } from 'react-icons/md';
import { EnterOutlined } from '@ant-design/icons';
import { openNotification } from '../../utils/functions';
import { Popconfirm } from 'antd';
import List from './List';
import './index.css';

const Header = ({ isLogin, setIsLogin }) => {
    const logout = () => {
        setIsLogin(false);
        sessionStorage.removeItem('token');
        openNotification('推出成功！欢迎再次使用！', <EnterOutlined />);
    };
    const text = '确认要退出吗？';
    return (
        <>
            <header>
                <MdSpellcheck className="logo" />
                <span>不学汉语</span>
                {isLogin ? (
                    <>
                        <List />
                        <Popconfirm
                            placement="bottomLeft"
                            title={text}
                            onConfirm={logout}
                            okText="确认"
                            cancelText="取消"
                        >
                            <div className="logoutBtn">退出</div>
                        </Popconfirm>
                    </>
                ) : null}
            </header>
            <div className="placeholderBox"></div>
        </>
    );
};

export default Header;
