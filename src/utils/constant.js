import tcb from '@cloudbase/js-sdk';

export const BASE_URL = 'https://cb.musictrack.cn';
// export const DB_URL = 'http://cbapi.musictrack.cn';
export const DB_URL = 'https://cbapi.musictrack.cn';

// 腾讯云开发环境ID
const env = 'study-chinese-5gkh7t4aa5273394';
export const appTcb = tcb.init({
    env,
});
