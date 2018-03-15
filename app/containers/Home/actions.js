/*
 *
 * Home actions
 *
 */

import { DEFAULT_ACTION, TICKERS_RECEIVED, MARKERT_DATA_RECEIVED, STOCK_DATA_RECEIVED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function handleTickers(tickerSymbols) {
  return {
    type: TICKERS_RECEIVED,
    tickerSymbols,
  };
}
export function updateMarketData(marketData) {
  return {
    type: MARKERT_DATA_RECEIVED,
    marketData,
  };
}

export function handleStockData(stockData) {
  return {
    type: STOCK_DATA_RECEIVED,
    stockData,
  };
}
