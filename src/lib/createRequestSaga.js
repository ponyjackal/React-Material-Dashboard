import { call, put, delay } from 'redux-saga/effects';
import { startLoading, finishLoading } from './../redux/loading/actions';

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILED`;

    return function* (action) {
        yield put(startLoading(type));
        try {
            const response = yield call(request, action.payload);
            yield console.log("response", response);
            yield put({
                type: SUCCESS,
                payload: response.data,
                meta: response,
            });
        } catch (e) {
            yield console.log("error", e);
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type));
    };
}
