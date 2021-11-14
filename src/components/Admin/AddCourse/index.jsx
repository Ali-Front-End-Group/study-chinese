import { Card } from 'antd';
import './index.css';

// 加入课程卡片
const AddCourse = () => {
    return (
        <a href="#">
            <Card
                hoverable
                className="addCourse"
            >
                <div className="addBox">
                    <img alt="add" src="./img/add.png" className="addIcon" />
                    <p className="addText">添加课程</p>
                </div>
            </Card>
        </a>
    );
};

export default AddCourse;
