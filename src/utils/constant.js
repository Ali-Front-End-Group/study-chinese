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
export const defaultAvatar = 'https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20211118192629.jpg';

// logo
export const logoLink = 'https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20211118183107.jpg';

export const welcomeBackground =
    'https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20211118183058.png';

export const courseBackground =
    'https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20211118194626.png';
