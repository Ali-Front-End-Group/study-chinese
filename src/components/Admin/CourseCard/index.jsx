import { Card } from 'antd';
import './index.css';

// 单个课程卡片
const CourseCard = ({imgLink, courseName, teacherName, courseLink}) => {
    const { Meta } = Card;
    return (
        <a href={courseLink}>
            <Card
                hoverable
                cover={<img alt="图片" src={imgLink} />}
                className="courseCard"
            >
                <Meta title={courseName} description={teacherName} />
            </Card>
        </a>
    );
};

export default CourseCard;
