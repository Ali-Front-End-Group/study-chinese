import { combineReducers } from 'redux';

import isLogin from './isLogin';
import userId from './userId';
import allCourses from './allCourses';

export default combineReducers({
    isLogin,
    userId,
    allCourses,
});
