import { notification } from 'antd';

// 打开提醒框
export const openNotification = (message, icon) => {
    notification.open({
        duration: 3,
        message,
        icon,
        placement: 'bottomLeft',
    });
};
