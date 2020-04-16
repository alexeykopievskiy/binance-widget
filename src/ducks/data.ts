import { ReactText } from 'react'
import { Models, Enums } from '../interfaces'
import { Dispatch } from "redux";

const ActionTypes = {
  SAVE_PRODUCTS: 'SAVE_PRODUCTS',
  UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
  UPDATE_FAVORITES: 'UPDATE_FAVORITES',
  SAVE_FILTERS: 'SAVE_FILTERS',
  SAVE_IndicatorType: 'SAVE_IndicatorType',
  SAVE_SEARCH: 'SAVE_SEARCH',
}

const initialState = {
  products: {},
  filters: {
    tab: Enums.Currencies.BTC,
    alts: Enums.MainTabs.ALTS,
    fiat: Enums.MainTabs.FIAT
  },
  IndicatorType: Enums.IndicatorType.CHANGE,
  search: '',
  favoriteKeys: []
}

export const saveProducts = (products: Models.IProduct[], dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.SAVE_PRODUCTS,
    payload: {
      ...products.reduce((result, item) => ({
        ...result,
        [item.s]: {...item, isFavorite: false},
      }), {})
    }
  })
}

export const updateProducts = (products: Models.IProduct[], dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_PRODUCTS,
    payload: products
  })
};

export const updateFavorites = (favorites: ReactText[], dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_FAVORITES,
    payload: favorites
  })
};


export const saveFilters = (tab: string, alts: string, fiat: string, dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.SAVE_FILTERS,
    payload: {
      tab,
      alts,
      fiat
    }
  })
}

export const saveIndicatorType = (IndicatorType: string, dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.SAVE_IndicatorType,
    payload: IndicatorType
  })
}

export const saveSearch = (search: string, dispatch: Dispatch) => {
  dispatch({ type: ActionTypes.SAVE_SEARCH,
    payload: search
  })
}

const dataReducer = (state = initialState, action: Models.IAction) => {
  switch (action.type) {
    case ActionTypes.SAVE_PRODUCTS:
      return { ...state, products: action.payload }
    case ActionTypes.UPDATE_PRODUCTS:
      return {
        ...state,
        products: {
          ...action.payload.reduce((result: any, item: any) => ({
            ...result,
            [item.s]: {...result[item.s], isFavorite: item.isFavorite, o: item.o, c: item.c, qv: item.q},
          }), state.products)
        }
      }
    case ActionTypes.UPDATE_FAVORITES:
      return {
        ...state,
        favoriteKeys: action.payload
      }
    case ActionTypes.SAVE_FILTERS:
      return { ...state, filters: action.payload }
    case ActionTypes.SAVE_IndicatorType:
      return { ...state, IndicatorType: action.payload }
    case ActionTypes.SAVE_SEARCH:
      return { ...state, search: action.payload }
    default:
      return state
  }
}

export default dataReducer
