import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import dealingSagas from './dealing';
import acdTodaySagas from './acdToday';
import acdPreviousSagas from './acdPrevious';
import acdNextSagas from './acdNext';
import signinSagas from './signin';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        dealingSagas(),
        acdTodaySagas(),
        acdPreviousSagas(),
        acdNextSagas(),
        signinSagas()
    ]);
}
