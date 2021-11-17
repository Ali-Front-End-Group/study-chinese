import { notification } from 'antd';

export const openNotification = (message, icon) => {
    notification.open({
        duration: 3,
        message,
        icon,
        placement: 'bottomLeft',
    });
};
