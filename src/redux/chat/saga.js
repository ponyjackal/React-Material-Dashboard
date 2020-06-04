import { takeLatest } from 'redux-saga/effects';
import { GET_REQUEST, getActionType } from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { getChatAPI } from './../../api'

const getSaga = createRequestSaga(getActionType, getChatAPI);
export default function* chatSaga() {
    yield takeLatest(GET_REQUEST, getSaga);
}
