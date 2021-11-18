import { SET_ALL_COURSES } from '../constant';

const initState = [];

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_ALL_COURSES:
            return data;
        default:
            return preState;
    }
}
