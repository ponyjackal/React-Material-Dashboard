import { takeLatest } from 'redux-saga/effects';
import {
    ADD_REQUEST,
    GET_REQUEST,
    PUBLISH_REQUEST,
    ARCHIVE_REQUEST,
    publishActionType,
    addActionType,
    getActionType,
    archiveActionType
} from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import {
    addBroadcastAPI,
    getBroadcastsAPI,
    publishBroadcastAPI,
    archiveBroadcastAPI,
} from './../../api';

const getSaga = createRequestSaga(getActionType, getBroadcastsAPI);
const addSaga = createRequestSaga(addActionType, addBroadcastAPI);
const publishSaga = createRequestSaga(publishActionType, publishBroadcastAPI);
const archiveSaga = createRequestSaga(archiveActionType, archiveBroadcastAPI);
export default function* broadcastSaga() {
    yield takeLatest(GET_REQUEST, getSaga);
    yield takeLatest(ADD_REQUEST, addSaga);
    yield takeLatest(PUBLISH_REQUEST, publishSaga);
    yield takeLatest(ARCHIVE_REQUEST, archiveSaga);
}
