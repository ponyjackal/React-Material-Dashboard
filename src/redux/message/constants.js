import { createRequestActionTypes } from './../../lib/createRequestSaga';

export const getActionType = 'MESSAGE_GET';
export const [GET_REQUEST, GET_SUCCESS, GET_FAILED] = createRequestActionTypes(
    getActionType
);

export const sendActionType = 'MESSAGE_SEND';
export const [SEND_REQUEST, SEND_SUCCESS, SEND_FAILED] = createRequestActionTypes(
    sendActionType
);

export const unsubscribeActionType = 'MESSAGE_UNSUBSCRIBE';
export const [UNSUBSCRIBE_REQUEST, UNSUBSCRIBE_SUCCESS, UNSUBSCRIBE_FAILED] = createRequestActionTypes(
    unsubscribeActionType
);

export const archiveActionType = 'MESSAGE_ARCHIVE';
export const [ARCHIVE_REQUEST, ARCHIVE_SUCCESS, ARCHIVE_FAILED] = createRequestActionTypes(
    archiveActionType
);

export const readActionType = 'MESSAGE_READ';
export const [READ_REQUEST, READ_SUCCESS, READ_FAILED] = createRequestActionTypes(
    readActionType
);