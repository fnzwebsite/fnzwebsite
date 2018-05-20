import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
    fetchAcdTodaySuccess,
    showDealingMessage
} from 'components/fnzdashboard/actions/acdToday';

import {
    FETCH_ACD_TODAY,
    FETCH_ACD_TODAY_SUCCESS,
} from 'constants/ActionTypes';

import {httpDirectGet, httpDirectPost} from '../util/Utils';

const getAcdToday = async (date,acd) =>
    await httpDirectGet('box/'+ date+'/organisation/'+acd)
        .then((data) => {
            return data;
        }).catch(error => error);


function* fetchAcdTodayRequest(data) {
    try {
        const fetchedAcdToday = yield call(getAcdToday, data.date, data.acd);
        yield put(fetchAcdTodaySuccess(fetchedAcdToday));
    } catch (error) {
        yield put(showDealingMessage(error));
    }
}


export default function* rootSaga() {
    yield all([takeEvery(FETCH_ACD_TODAY, fetchAcdTodayRequest)]);
}