import { combineReducers, createStore } from 'redux';
import { enhancer, reducers } from '@magento/peregrine';
import storeConfig from './reducer/storeConfig/reducer';
import { getStoreConfig } from './reducer/storeConfig/asyncAction';

// This is the connective layer between the Peregrine store and the
// venia-concept UI. You can add your own reducers/enhancers here and combine
// them with the Peregrine exports.
//
// example:
// const rootReducer = combineReducers({ ...reducers, ...myReducers });
// const rootEnhancer = composeEnhancers(enhancer, myEnhancer);
// export default createStore(rootReducer, rootEnhancer);
const rootReducer = combineReducers({ ...reducers, storeConfig: storeConfig });
// const store = createStore(rootReducer, enhancer);
// store.dispatch(getStoreConfig())
export default createStore(rootReducer, enhancer);
