import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
    fetchAcdPreviousSuccess,
    showDealingMessage
} from 'components/fnzdashboard/actions/acdPrevious';

import {
    FETCH_ACD_PREVIOUS,
    FETCH_ACD_PREVIOUS_SUCCESS
} from 'constants/ActionTypes';

import {httpDirectGet, httpDirectPost} from '../util/Utils';

const getAcdPrevious = async (date,acd) =>
    await httpDirectGet('box/'+ date+'/organisation/'+acd)
        .then((data) => {
            return data;
        }).catch(error => error);


function* fetchAcdPreviousRequest(data) {
    try {
        const fetchedAcdPrevious = yield call(getAcdPrevious, data.date, data.acd);
        yield put(fetchAcdPreviousSuccess(fetchedAcdPrevious));
    } catch (error) {
        yield put(showDealingMessage(error));
    }
}


export default function* rootSaga() {
    yield all([takeEvery(FETCH_ACD_PREVIOUS, fetchAcdPreviousRequest)]);
}