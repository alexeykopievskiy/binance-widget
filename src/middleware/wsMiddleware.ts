import { ActionTypes, wsConnected, wsConnecting } from '../ducks/socket';
import { updateProducts } from '../ducks/data';
import { Models } from "../interfaces"
import { WS_URL } from "../config"
import { Dispatch } from "redux";

const WS_CLOSE_CODES = {
  WS_NORMAL_CLOSE: 1000,
  WS_ABNORMAL_CLOSE: 1006,
}

const wsMiddleware = () => {
  let socket: any = null;

  const onOpen = (dispatch: Dispatch) => () => {
    wsConnected(dispatch);
  };

  const onClose = (dispatch: Dispatch) => ({ code }: { code: number }) => {
    if ([WS_CLOSE_CODES.WS_NORMAL_CLOSE, WS_CLOSE_CODES.WS_ABNORMAL_CLOSE].includes(code)) {
      return;
    }

    openWSConnection(dispatch)
  };

  const onMessage = (dispatch: Dispatch) => ({ data }: { data: any }) => {
    let parsedData;

    try {
      parsedData = JSON.parse(data)
    } catch (e) {
      console.log('Parsing data error', data, e)
      return;
    }

    updateProducts(parsedData.data, dispatch)
  };

  const openWSConnection = (dispatch: Dispatch) => {

    wsConnecting(dispatch)

    // connect to the remote host
    socket = new WebSocket(WS_URL);

    // websocket handlers
    socket.onmessage = onMessage(dispatch);
    socket.onclose = onClose(dispatch);
    socket.onopen = onOpen(dispatch);
  }

  return (store: any) => (next: any) => (action: Models.IAction) => {
    const { dispatch } = store;

    switch (action.type) {
      case ActionTypes.WS_CONNECT:
        if (socket !== null) {
          socket.close(WS_CLOSE_CODES.WS_NORMAL_CLOSE);
        }

        openWSConnection(dispatch);

        break;
      default:
        return next(action);
    }
  };
};

export default wsMiddleware();
