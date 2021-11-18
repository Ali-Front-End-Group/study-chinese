import tcb from '@cloudbase/js-sdk';

export const BASE_URL = 'https://cb.musictrack.cn';
// export const DB_URL = 'http://cbapi.musictrack.cn';
export const DB_URL = 'https://cbapi.musictrack.cn';

// 腾讯云开发环境ID
const env = 'study-chinese-5gkh7t4aa5273394';
export const appTcb = tcb.init({
    env,
});

// 默认用户头像
export const defaultAvatar = 'https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20201204121004.jpg';

// logo
export const logoLink =
    'https://7374-study-chinese-5gkh7t4aa5273394-1304393382.tcb.qcloud.la/avatar/XcDg9CIuc1saMhagfUiti.jpeg';
