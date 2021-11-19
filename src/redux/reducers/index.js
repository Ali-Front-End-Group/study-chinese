import { combineReducers } from 'redux';

import isLogin from './isLogin';
import allCourses from './allCourses';
import userInfo from './userInfo';

export default combineReducers({
    isLogin,
    allCourses,
    userInfo,
});
