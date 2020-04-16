import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import wsMiddleware from '../middleware/wsMiddleware';

import rootReducer from '../ducks'

const initStore = () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, wsMiddleware)
  );

  return { store }
}

export default initStore
