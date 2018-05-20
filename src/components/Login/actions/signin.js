import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
} from '../constants/ActionTypes';

export const fetchLogin = (username,password) => {
    return {
        type: FETCH_LOGIN,
        username:username,
        password:password,
    };
};

export const fetchLoginSuccess = (data) => {
    return {
        type: FETCH_LOGIN_SUCCESS,
        payload: data
    }
};

