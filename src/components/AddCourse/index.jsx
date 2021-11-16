import { withRouter } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import './index.css';

// 加入课程卡片
const AddCourse = ({ history }) => (
    <div className="courseCard addCourseCard" onClick={() => history.push('/admin/add')}>
        <PlusOutlined className="addCourseBtn" />
        <span className="addCourseText">添加课程</span>
    </div>
);

export default withRouter(AddCourse);
