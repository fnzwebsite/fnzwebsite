import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
    fetchAcdNextSuccess,
    showDealingMessage
} from 'components/fnzdashboard/actions/acdNext';

import {
    FETCH_ACD_NEXT,
    FETCH_ACD_NEXT_SUCCESS,
} from 'constants/ActionTypes';

import {httpDirectGet, httpDirectPost} from '../util/Utils';

const getAcdNext= async (date,acd) =>
    await httpDirectGet('box/'+ date+'/organisation/'+acd)
        .then((data) => {
            return data;
        }).catch(error => error);


function* fetchAcdNextRequest(data) {
    try {
        const fetchedAcdNext= yield call(getAcdNext, data.date, data.acd);
        yield put(fetchAcdNextSuccess(fetchedAcdNext));
    } catch (error) {
        yield put(showDealingMessage(error));
    }
}


export default function* rootSaga() {
    yield all([takeEvery(FETCH_ACD_NEXT, fetchAcdNextRequest)]);
}