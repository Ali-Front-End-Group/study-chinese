import { SET_USER_INFO } from '../constant';

const initState = { avatar: '', bio: '', nickname: '' };

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case SET_USER_INFO:
            return data;
        default:
            return preState;
    }
}
