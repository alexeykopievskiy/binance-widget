import { Models } from "../interfaces"
import { Dispatch } from "redux";

export const ActionTypes = {
  WS_CONNECT: 'WS_CONNECT',
  WS_CONNECTING: 'WS_CONNECTING',
  WS_CONNECTED: 'WS_CONNECTED',
  WS_DISCONNECT: 'WS_DISCONNECT',
  WS_DISCONNECTED: 'WS_DISCONNECTED',
  WS_FORCE_DISCONNECT: 'WS_FORCE_DISCONNECT',
}

const initialState = {
  wsIsConnecting: false,
  wsIsConnected: false
}

export const wsConnect = (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.WS_CONNECT })
};
export const wsConnecting = (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.WS_CONNECTING })
};
export const wsConnected = (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.WS_CONNECTED })
};
export const wsDisconnect = (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.WS_DISCONNECT })
};
export const wsDisconnected = (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.WS_DISCONNECTED })
};
export const wsForceDisconnect = (dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.WS_FORCE_DISCONNECT })
};

const websocketReducer = (state = initialState, action: Models.IAction) => {
  switch (action.type) {
    case ActionTypes.WS_CONNECTING:
      return {
        ...state,
        wsIsConnecting: true,
        wsIsConnected: false,
      };
    case ActionTypes.WS_CONNECTED:
      return {
        ...state,
        wsIsConnecting: false,
        wsIsConnected: true,
      };
    case ActionTypes.WS_CONNECT:
      return { ...state };
    case ActionTypes.WS_DISCONNECT:
      return { ...state };
    case ActionTypes.WS_DISCONNECTED:
      return {
        ...state,
        wsIsConnecting: false,
        wsIsConnected: false,
      };
    case ActionTypes.WS_FORCE_DISCONNECT:
      return {
        ...state,
        wsIsConnecting: false,
        wsIsConnected: false,
      };
    default:
      return state;
  }
};

export default websocketReducer
