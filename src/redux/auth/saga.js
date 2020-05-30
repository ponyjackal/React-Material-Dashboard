import { takeLatest } from 'redux-saga/effects';
import { SIGNIN_REQUEST, actionType } from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { signinAPI } from './../../api'

const loginSaga = createRequestSaga(actionType, signinAPI);
export default function* authSaga() {
    yield takeLatest(SIGNIN_REQUEST, loginSaga);
}
