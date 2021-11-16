import tcb from '@cloudbase/js-sdk';

export const BASE_URL = 'https://cb.musictrack.cn';
export const DB_URL = 'http://cbapi.musictrack.cn';
export const TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiJzZGZzZGYiLCJpYXQiOjE2MzY4Nzc1Mzd9.gnh25ESDt0lCxN1e_Dmfy38r312TN-AhH9RxfxbeqnA';

// 腾讯云开发环境ID
const env = 'study-chinese-5gkh7t4aa5273394';
export const appTcb = tcb.init({
    env,
});
