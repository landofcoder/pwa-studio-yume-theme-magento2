import { createActions } from 'redux-actions';

const prefix = 'STORE';
const actionTypes = ['GET_DEFAULT']

const actionMap = {
    STORE_CONFIG: {
        REQUEST: null,
        RECEIVE: null
    }
}

export default createActions(actionMap, ...actionTypes, { prefix })