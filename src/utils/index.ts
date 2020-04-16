import BigNumber from 'bignumber.js';
import { Enums } from '../interfaces'
import { ReactText } from 'react'

const toFixedBigNumber = (data: any, places: number) => {
  return new BigNumber(data).toFixed(places)
}

const getChangeValue = (openPrice: number, latestPrice: number) => {
  const change = new BigNumber(latestPrice).div(openPrice).minus(1).times(100).toFixed(2)

  return `${(change.charAt(0) !== '-') ? '+' : ''}${change}%`;
}

export const getPreparedData = (products: any, filters: any, search?: string, favoriteKeys?: ReactText[]) => {
  return Object.keys(products).map((key: string) => {
    let item = products[key]

    return {
      key: key,
      pair: `${item.b}/${item.q}`,
      lastPrice: toFixedBigNumber(item.c, 8),
      change: getChangeValue(item.o, item.c),
      volume: toFixedBigNumber(item.qv, 8),
      parentMarket: item.pm,
      category: item.pn,
      quote: item.q
    }
  }).filter(item => {
    const searchString = (search || '').trim().toLowerCase();
    const isSearch = !searchString || item.pair.toLowerCase().includes(searchString);

    let isPreset;

    if (filters) {
      switch (filters.tab) {
        case Enums.MainTabs.FAVORITE: {
          isPreset = favoriteKeys && favoriteKeys.includes(item.key);
          break;
        }
        case Enums.Currencies.BNB: {
          isPreset = item.parentMarket === Enums.Currencies.BNB && item.category === Enums.Currencies.BNB;
          break;
        }
        case Enums.Currencies.BTC: {
          isPreset = item.parentMarket === Enums.Currencies.BTC && item.category === Enums.Currencies.BTC;
          break;
        }
        case Enums.MainTabs.ALTS: {
          const isPMPreset = item.parentMarket === Enums.MainTabs.ALTS;
          let isPNPreset: boolean = false;

          if (filters.alts === Enums.MainTabs.ALTS) {
            isPNPreset = true;
          } else {
            isPNPreset = item.quote === filters.alts
          }

          isPreset = isPMPreset && isPNPreset;
          break;
        }
        case Enums.MainTabs.FIAT: {
          const isPMPreset = item.parentMarket === Enums.MainTabs.FIAT;
          let isPNPreset: boolean = false;

          if (filters.fiat === Enums.MainTabs.FIAT) {
            isPNPreset = true;
          } else {
            isPNPreset = item.quote === filters.fiat
          }

          isPreset = isPMPreset && isPNPreset;
          break;
        }
        default: {
          isPreset = true;
        }
      }

      return isSearch && isPreset;
    }

    return isSearch
  })
}
