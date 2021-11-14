const LogoutBtn = ({ setIsLogin }) => {
    // 退出登录
    const logout = () => {
        setIsLogin(false);
    };
    return (
        <div className="loginBtn" onClick={logout}>
            退出
        </div>
    );
};

export default LogoutBtn;
