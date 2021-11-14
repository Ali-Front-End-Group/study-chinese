import { Card } from 'antd';
import { withRouter } from 'react-router-dom';
import './index.css';

// 加入课程卡片
const AddCourse = ({ history }) => (
    <Card hoverable className="addCourse" onClick={() => history.push('/admin/add')}>
        <div className="addBox">
            <img alt="add" src="/img/add.png" className="addIcon" />
            <p className="addText">添加课程</p>
        </div>
    </Card>
);

export default withRouter(AddCourse);
