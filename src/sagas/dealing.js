import {all, call, put, takeEvery} from 'redux-saga/effects';
import {fetchDealingsSuccess, showDealingMessage} from 'components/fnzdashboard/actions/dealing';
import {FETCH_ALL_DEALINGS} from 'constants/ActionTypes';
import { httpDirectGet,httpDirectPost}  from '../util/Utils';

const getDealings = async (data) =>
await httpDirectPost('dealquery',data)
    .then((data) => {
    return data;
}).catch(error => error);


function* fetchDealingRequest(data) {
    try {
        var post_data = '{"selector": {"tradeTime": {"$gt": "'+data.date+'"}}}';
        const fetchedDealing = yield call(getDealings,post_data);
        yield put(fetchDealingsSuccess(fetchedDealing));
    } catch (error) {
        yield put(showDealingMessage(error));
    }
}


export default function* rootSaga() {
    yield all([takeEvery(FETCH_ALL_DEALINGS, fetchDealingRequest)]);
}