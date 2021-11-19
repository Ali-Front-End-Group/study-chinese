import { withRouter } from 'react-router-dom';
import { addCourseImg } from '../../utils/constant';
import './index.css';

// 加入课程卡片
const AddCourse = ({ history }) => (
    <div className="courseCard" onClick={() => history.push('/admin/add')}>
        <img src={addCourseImg} alt="addCourse" className="addCourseImg" />
    </div>
);

export default withRouter(AddCourse);
