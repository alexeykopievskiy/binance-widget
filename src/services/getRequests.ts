import Axios from 'axios'
import { ENDPOINTS } from '../config'

export const getBinanceData = () => {
  return Axios.get(ENDPOINTS.GET_BINANCE_DATA)
}
