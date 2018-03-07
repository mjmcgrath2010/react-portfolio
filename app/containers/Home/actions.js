/*
 *
 * Home actions
 *
 */

import { DEFAULT_ACTION, TICKERS_RECIEVED, MARKERT_DATA_RECIEVED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function handleTickers(tickerSymbols) {
  return {
    type: TICKERS_RECIEVED,
    tickerSymbols,
  };
}
export function updateMarketData(marketData) {
  return {
    type: MARKERT_DATA_RECIEVED,
    marketData,
  };
}
