import {all, call, put, takeEvery} from 'redux-saga/effects';
import {fetchContactsSuccess, showContactMessage} from 'components/fnzdashboard/actions/dealing';
import {FETCH_ALL_DEALINGS} from 'constants/ActionTypes';
import { httpDirectGet,httpDirectPost}  from '../util/Utils';

const getContacts = async () =>
    await httpDirectGet('dealing')
        .then((data) => {
            return data;
        }).catch(error => error);



function* fetchContactRequest() {
    try {
        const fetchedContact = yield call(getContacts);
        yield put(fetchContactsSuccess(fetchedContact));
    } catch (error) {
        yield put(showContactMessage(error));
    }
}


export default function* rootSaga() {
    yield all([takeEvery(FETCH_ALL_DEALINGS, fetchContactRequest)]);
}