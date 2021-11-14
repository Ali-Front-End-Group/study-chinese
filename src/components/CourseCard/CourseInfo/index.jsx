import 'antd/dist/antd.css';
import './index.css';
import { Modal, Button } from 'antd';

const CourseInfo = ({ handleCancel, handleEdit, visible, courseCard }) => {
  const courseName = courseCard.courseName;
  const courseInfo = courseCard.courseInfo;
  const stuNum = courseCard.stuNum;
  const star = courseCard.star;

  return (
    <>
      <Modal
        visible={visible}
        title={courseName}
        handleEdit={handleEdit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            返回
          </Button>,
          <Button key="submit" type="primary" onClick={handleEdit}>
            编辑
          </Button>,
        ]}
      >
        <p>{courseInfo}</p>
        <p>课程参与人数：{stuNum}</p>
        <p>评分：{star}</p>
      </Modal>
    </>
  );
}

export default CourseInfo;