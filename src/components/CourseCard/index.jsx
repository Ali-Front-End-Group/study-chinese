import { Card } from 'antd';
import CourseInfo from './CourseInfo';
import './index.css';

// 单个课程卡片
const CourseCard = ({
    courseCard,
    handleDeleteData,
    showModal,
    handleEdit,
    handleCancel,
    visible,
    courseId,
    setIfDelete
}) => {
    const { Meta } = Card;
    const {imgLink, courseName, teacherName} = courseCard;

    const handleDelete = () => {
        setIfDelete(true);
        console.log("setTrue");
        handleDeleteData({courseId});
    }

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
                    onClick={handleDelete}
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
