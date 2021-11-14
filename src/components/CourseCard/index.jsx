import { Card } from 'antd';
import CourseInfo from './CourseInfo'
import './index.css';

// 单个课程卡片
const CourseCard = ({ courseCard, onHandleDelete, showModal, handleEdit, handleCancel, visible }) => {
    const { Meta } = Card;

    const imgLink = courseCard.imgLink;
    const courseName = courseCard.courseName;
    const teacherName = courseCard.teacherName;

    return (
        <>
            <Card
                hoverable
                cover={<img alt="图片" src={imgLink} className="coverImg" />}
                className="courseCard"
                onClick={showModal}
            >
                <Meta title={courseName} description={teacherName} />
                <img
                    alt="delete"
                    src="/img/delete.png"
                    className="extraImg"
                    onClick={onHandleDelete}
                />
            </Card>
            <CourseInfo 
                showModal={showModal}
                handleCancel={handleCancel}
                handleEdit={handleEdit}
                visible={visible}
                courseCard={courseCard}
            />
        </>
    );
};

export default CourseCard;
