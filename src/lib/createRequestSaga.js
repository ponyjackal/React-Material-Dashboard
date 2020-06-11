import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from './../redux/loading/actions';

export const createRequestActionTypes = type => {
    const REQUEST = `${type}_REQUEST`;
    const SUCCESS = `${type}_SUCCESS`;
    const FAILED = `${type}_FAILED`;
    return [REQUEST, SUCCESS, FAILED];
};

export default function createRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILED = `${type}_FAILED`;

    return function* (action) {
        yield put(startLoading(type));
        try {
            const response = yield call(request, action.payload);
            yield console.log("response", response);
            yield put({
                type: SUCCESS,
                payload: response ? response.data : null,
                meta: response,
            });
        } catch (e) {
            yield console.log("error", e);
            yield put({
                type: FAILED,
                payload: e,
                error: true,
            });
        }
        yield put(finishLoading(type));
    };
}
