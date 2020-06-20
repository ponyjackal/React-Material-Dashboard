import { createRequestActionTypes } from './../../lib/createRequestSaga';

export const addActionType = 'BROADCAST_ADD';
export const [ADD_REQUEST, ADD_SUCCESS, ADD_FAILED] = createRequestActionTypes(
    addActionType
);

export const publishActionType = 'BROADCAST_PUBLISH';
export const [PUBLISH_REQUEST, PUBLISH_SUCCESS, PUBLISH_FAILED] = createRequestActionTypes(
    publishActionType
);

export const archiveActionType = 'BROADCAST_ARCHIVE';
export const [ARCHIVE_REQUEST, ARCHIVE_SUCCESS, ARCHIVE_FAILED] = createRequestActionTypes(
    archiveActionType
);

export const getActionType = 'BROADCAST_GET';
export const [GET_REQUEST, GET_SUCCESS, GET_FAILED] = createRequestActionTypes(
    getActionType
);
