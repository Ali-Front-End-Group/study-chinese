import { SET_USER_ID } from '../constant';

const initState = '';

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_USER_ID:
            return data;
        default:
            return preState;
    }
}
