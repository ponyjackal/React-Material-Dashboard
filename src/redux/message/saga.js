import { takeLatest } from 'redux-saga/effects';
import { GET_REQUEST, getActionType } from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { getMessagesAPI } from './../../api'

const getSaga = createRequestSaga(getActionType, getMessagesAPI);
export default function* messagedSaga() {
    yield takeLatest(GET_REQUEST, getSaga);
}
