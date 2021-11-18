import { combineReducers } from 'redux';

import isLogin from './isLogin';
import userId from './userId';
import allCourses from './allCourses';
import userInfo from './userInfo';

export default combineReducers({
    isLogin,
    userId,
    allCourses,
    userInfo,
});
