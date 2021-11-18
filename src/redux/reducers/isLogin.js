import { SET_IS_LOGIN } from '../constant';

const initState = false;

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_IS_LOGIN:
            return data;
        default:
            return preState;
    }
}
