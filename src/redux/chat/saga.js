import { takeLatest, takeEvery } from 'redux-saga/effects';
import {
    GET_REQUEST,
    getActionType,
    ARCHIVE_REQUEST,
    archiveActionType,
    SEND_REQUEST,
    sendActionType,
    UNSUBSCRIBE_REQUEST,
    unsubscribeActionType,
    READ_REQUEST,
    readActionType,
} from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import {
    getChatAPI,
    archiveAPI,
    sendMessageAPI,
    unsubscribeAPI,
    markAsReadAPI,
} from './../../api'

const getSaga = createRequestSaga(getActionType, getChatAPI);
const archiveSaga = createRequestSaga(archiveActionType, archiveAPI);
const sendSaga = createRequestSaga(sendActionType, sendMessageAPI);
const unsubscribeSaga = createRequestSaga(unsubscribeActionType, unsubscribeAPI);
const markAsReadSaga = createRequestSaga(readActionType, markAsReadAPI);

export default function* chatSaga() {
    yield takeLatest(GET_REQUEST, getSaga);
    yield takeLatest(ARCHIVE_REQUEST, archiveSaga);
    yield takeEvery(SEND_REQUEST, sendSaga);
    yield takeLatest(UNSUBSCRIBE_REQUEST, unsubscribeSaga);
    yield takeLatest(READ_REQUEST, markAsReadSaga);
}
