import axios from 'axios';
import qs from 'qs';
import { DB_URL, BASE_URL } from './constant';

// 获取登录状态
export const checkLogin = (id, token) => {
    return axios({
        url: `${DB_URL}/user/detail?id=${id}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            if (res.data.data) {
                return true;
            } else {
                return false;
            }
        })
        .catch(() => false);
};

// 注册
export const registerAPI = (username, password) => {
    const data = { username, password };
    return axios({
        url: `${DB_URL}/register`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'post',
        data: qs.stringify(data),
    })
        .then(res => {
            if (res.data.result === 'success') {
                return { isTrue: true, text: '注册成功，请登录！' };
            } else {
                return { isTrue: false, text: '帐号已存在，请更换一个！' };
            }
        })
        .catch(() => ({ isTrue: false, text: '注册失败，请重试！' }));
};

// 登录
export const loginAPI = (username, password) => {
    const data = { username, password };
    return axios({
        url: `${DB_URL}/login`,
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
    })
        .then(res => {
            if (res.data.result === 'success') {
                const { id, token } = res.data.data;
                return { isTrue: true, id, token, text: '登录成功！欢迎进入「不学汉语」！' };
            } else {
                return { isTrue: false, id: '', token: '', text: '登录失败，请重试！' };
            }
        })
        .catch(() => ({ isTrue: false, id: '', token: '', text: '登录失败，请重试！' }));
};

// 更新用户信息
export const updateUserInfoAPI = ({
    id,
    token,
    avatarInput: avatar,
    bioInput: bio,
    nicknameInput: nickname,
}) => {
    return axios({
        url: `${DB_URL}/user/update?id=${id}`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            avatar,
            bio,
            nickname,
        },
    })
        .then(res => {
            if (res.data.result === 'success') {
                console.log(res.data.data);
                const { id, avatar, bio, nickname } = res.data.data;
                return { isTrue: true, id, avatar, bio, nickname, text: '更新个人信息成功！' };
            } else {
                return {
                    isTrue: false,
                    id: '',
                    avatar: '',
                    bio: '',
                    nickname: '',
                    text: '更新个人信息失败！',
                };
            }
        })
        .catch(() => ({
            isTrue: false,
            id: '',
            avatar: '',
            bio: '',
            nickname: '',
            text: '更新个人信息失败！',
        }));
};

// 获取个人信息
export const getUserInfoAPI = (id, token) => {
    return axios({
        url: `${DB_URL}/user/detail?id=${id}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            if (res.data.result === 'success') {
                const { nickname, avatar, bio } = res.data.data;
                return { isTrue: true, nickname, avatar, bio, text: '' };
            } else {
                return {
                    isTrue: false,
                    nickname: '',
                    avatar: '',
                    bio: '',
                    text: '获取个人信息失败！',
                };
            }
        })
        .catch(() => ({
            isTrue: false,
            nickname: '',
            avatar: '',
            bio: '',
            text: '获取个人信息失败！',
        }));
};

// 获取所有课程信息
export const getAllCourseFromDB_API = token => {
    return axios({
        url: `${DB_URL}/course/listAll`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            if (res.data.result === 'success') {
                return { isTrue: true, data: res.data.data.rows, text: '' };
            } else {
                return { isTrue: false, data: [], text: '获取课程信息失败！' };
            }
        })
        .catch(() => ({ isTrue: false, data: [], text: '获取课程信息失败！' }));
};

// 删除指定课程
export const deleteCourseFromDB_API = (id, token) => {
    return axios({
        url: `${DB_URL}/course/delete`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            id: `${id}`,
        },
    })
        .then(res => {
            if (res.data.result === 'success') {
                return { isTrue: true, text: '删除课程成功！' };
            } else {
                return { isTrue: false, text: '删除课程失败！' };
            }
        })
        .catch(() => ({ isTrue: false, text: '删除课程失败！' }));
};

// 发布/更新课程
export const releaseCourseAPI = ({ isEdit, editID, token, data }) => {
    const textSuccess = `${isEdit ? '更新' : '添加'}课程成功！`;
    const textFail = `${isEdit ? '更新' : '添加'}课程成功！`;
    return axios({
        url: isEdit ? `${DB_URL}/course/update?id=${editID}` : `${DB_URL}/course/create`,
        method: 'post',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
        },
        data: qs.stringify(data),
    })
        .then(res => {
            if (res.data.result === 'success') {
                return { isTrue: true, text: textSuccess, ID: res.data.data.id };
            } else {
                return { isTrue: false, text: textFail, ID: null };
            }
        })
        .catch(() => ({ isTrue: false, text: textFail, ID: null }));
};

// 获得图片url
export const getImgAPI = character => {
    return axios
        .get(BASE_URL + '/api/get_pic', {
            params: {
                character,
            },
        })
        .then(res => {
            if (res.data.status === 200) {
                return { isTrue: true, url: res.data.url, text: '图片url获取成功！' };
            } else {
                return { isTrue: false, url: '', text: '图片url获取失败！' };
            }
        })
        .catch(() => ({ isTrue: false, url: '', text: '图片url获取失败！' }));
};

// 获得声音url
export const getVoiceAPI = text => {
    return axios
        .post(BASE_URL + '/api/tts', {
            text,
        })
        .then(res => {
            if (res.data.status === 200) {
                return { isTrue: true, url: res.data.array['思悦'], resText: '音频url获取成功！' };
            } else {
                return { isTrue: false, url: '', resText: '音频url获取失败！' };
            }
        })
        .catch(() => ({ isTrue: false, url: '', resText: '音频url获取失败！' }));
};

// 获得拼音
export const getPinyinAPI = str => {
    return axios
        .get(`${BASE_URL}/api/get_pinyin`, {
            params: {
                str,
            },
        })
        .then(res => {
            if (res.data.status === 200) {
                return { isTrue: true, pinyin: res.data.ret, text: '获取拼音成功！' };
            } else {
                return { isTrue: false, pinyin: '', text: '获取拼音失败！' };
            }
        })
        .catch(() => ({ isTrue: false, pinyin: '', text: '获取拼音失败！' }));
};
