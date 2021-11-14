import { Card } from 'antd';
import './index.css';

// 单个课程卡片
const CourseCard = () => {
    const { Meta } = Card;
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="/img/math.jpg" />}
            className="courseCard"
        >
            <Meta title="{courseName}" description="{teacherName}" />
        </Card>
    );
};

export default CourseCard;
