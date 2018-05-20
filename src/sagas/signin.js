import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
    fetchLoginSuccess,
    showDealingMessage
} from '../components/Login/actions/signin';

import {
    FETCH_LOGIN,
    FETCH_LOGIN_SUCCESS,
} from '../components/Login/constants/ActionTypes';

import {httpPost} from '../util/Utils';

const getLogin = async (data) =>
    await httpPost('login', data)
        .then((data) => {
            return data;
        }).catch(error => error);


function* fetchLoginRequest(data) {
    try {
        const body = {
            'enrollmentId': data.username,
            'enrollmentSecret': data.password
        };
        const fetchedLogin = yield call(getLogin, body);
        yield put(fetchLoginSuccess(fetchedLogin));
    } catch (error) {
        yield put(showDealingMessage(error));
    }
}


export default function* rootSaga() {
    yield all([takeEvery(FETCH_LOGIN, fetchLoginRequest)]);
}