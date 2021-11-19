import { NavLink } from 'react-router-dom';
import './index.css';

const List = () => {
    const route = [
        { id: 0, page: '课程', to: '/admin/course' },
        { id: 1, page: '广场', to: '/admin/square' },
        { id: 2, page: '关于', to: '/admin/help' },
    ];
    return (
        <div className="list">
            {route.map(obj => (
                <NavLink
                    activeClassName="activePage"
                    className="listItem"
                    to={obj.to}
                    key={obj.key}
                >
                    {obj.page}
                </NavLink>
            ))}
        </div>
    );
};

export default List;
