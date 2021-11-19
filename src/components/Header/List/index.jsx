import { withRouter } from 'react-router-dom';
import './index.css';

const List = ({ history }) => {
    const route = [
        { id: 0, page: '课程', to: '/admin/course' },
        { id: 1, page: '广场', to: '/admin/square' },
        { id: 2, page: '帮助和关于', to: '/admin/help' },
    ];
    return (
        <div className="list">
            {route.map(obj => (
                <div className="listItem" key={obj.id} onClick={() => history.push(obj.to)}>
                    {obj.page}
                </div>
            ))}
        </div>
    );
};

export default withRouter(List);
