import { takeLatest } from 'redux-saga/effects';
import { GET_REQUEST, getActionType } from './constants';
import createRequestSaga from './../../lib/createRequestSaga';
import { getDashboardAPI } from './../../api'

const getSaga = createRequestSaga(getActionType, getDashboardAPI);
export default function* dashboardSaga() {
    yield takeLatest(GET_REQUEST, getSaga);
}
