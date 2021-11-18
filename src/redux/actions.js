import { SET_IS_LOGIN, SET_USER_ID, SET_ALL_COURSES, SET_USER_INFO } from './constant';

// 登入
export const setIsLogin = data => ({
    type: SET_IS_LOGIN,
    data,
});

// 修改用户ID
export const setUserId = data => ({
    type: SET_USER_ID,
    data,
});

// 获得所有课程
export const setAllCourses = data => ({
    type: SET_ALL_COURSES,
    data,
});

// 更改用户个人信息
export const setUserInfo = data => ({
    type: SET_USER_INFO,
    data,
});
