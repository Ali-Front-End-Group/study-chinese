import tcb from '@cloudbase/js-sdk';

export const BASE_URL = 'https://cb.musictrack.cn';
// export const DB_URL = 'http://cbapi.musictrack.cn';
export const DB_URL = 'https://cbapi.musictrack.cn';

// 腾讯云开发环境ID
const env = 'study-chinese-5gkh7t4aa5273394';
export const appTcb = tcb.init({
  env
});

// 默认用户头像
export const defaultAvatar = 'https://img.lzxjack.top:99/20211118192629.jpg';

// logo
export const logoLink = 'https://img.lzxjack.top:99/20211118183107.jpg';

// 课程卡片页面添加图
export const addCourseImg = 'https://img.lzxjack.top:99/20211119184151.png';

// 登录页面背景
export const welcomeBackground = 'https://img.lzxjack.top:99/20211118183058.png';

// Admin页面背景
export const backGroundImg = 'https://img.lzxjack.top:99/20211119190810.jpg';

// 帮助页面的一些信息
export const appName = '「不学汉语」';
export const groupMember = ['余世龙(组长)', '李姿轩', '董琛琛', '程云来'];
export const appDescription =
  '是一个以提高学习者听说能力为重点、以“即学即用”为目的的综合类智能汉语学习平台。通过AI对话驱动的学习模式，能够有效补足用户在学习时缺乏对话互动环节的空白。对外汉语教师可以通过「不学汉语」的在线可视化平台轻松设计出包含文字、语音、影片、测验、口语任务等多种互动形式的趣味课程，使得学习者能在与AI对话的过程中轻松掌握知识，提升学习的效率与水平。';
export const contact = [
  {
    key: 'PC前端',
    value: '965555169@qq.com'
  },
  {
    key: '小程序',
    value: 'charliemills@qq.com'
  },
  {
    key: '后端',
    value: 'charliemills@qq.com'
  },
  {
    key: 'GitHub',
    value: 'https://github.com/Ali-Front-End-Group/study-chinese'
  }
];
export const QRCodeLink = 'https://img.lzxjack.top:99/20211120190328.jpg';
