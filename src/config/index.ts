const PREFIX = `/exchange-api/v1/public/asset-service`
const WS_URL = `wss://stream.binance.com/stream?streams=!miniTicker@arr`

const ENDPOINTS = {
  GET_BINANCE_DATA: `${PREFIX}/product/get-products`,
}

export {
  ENDPOINTS,
  WS_URL
}
