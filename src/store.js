import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from "./reducers"

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

export default createStore(reducers, applyMiddleware(logger, thunk));