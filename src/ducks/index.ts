import { combineReducers } from 'redux'

import data from './data'
import socket from './socket'

const rootReducer = combineReducers({
  data,
  socket,
})

export default rootReducer
