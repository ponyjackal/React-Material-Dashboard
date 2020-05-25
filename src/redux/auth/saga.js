import { takeLatest } from 'redux-saga/effects';
import { SIGNIN_REQUEST } from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { signinAPI } from './../../api'

const loginSaga = createRequestSaga('SIGNIN', signinAPI);
export default function* authSaga() {
    yield takeLatest(SIGNIN_REQUEST, loginSaga);
}
