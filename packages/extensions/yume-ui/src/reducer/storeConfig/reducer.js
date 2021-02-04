import actions from './action'
import { handleActions } from 'redux-actions';

export const name = 'storeConfig'
export const initialState = {
    config: {},
    isGettingConfig: false,
    getConfigError: false,
};

const reducerMap = {
    [actions.getDefault]: (state, { payload }) => {
        return {...state, payload};
    },
    [actions.storeConfig.request]: (state) => {
        return {
            ...state,
            isGettingConfig: true
        }
    },
    [actions.storeConfig.receive]: (state, { payload, error }) => {
        if (error) {
            return {
                ...state,
                getConfigError: true,
                isGettingConfig: false
            }
        }
        return {
            ...state,
            config: payload,
            isGettingConfig: false
        }
    }
}
export default handleActions(reducerMap, initialState)