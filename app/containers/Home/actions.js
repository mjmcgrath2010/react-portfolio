/*
 *
 * Home actions
 *
 */

import {
  DEFAULT_ACTION,
  TICKERS_RECEIVED,
  MARKERT_DATA_RECEIVED,
  STOCK_DATA_RECEIVED,
  FILTER_SYMBOLS,
  FETCH_STOCK_DATA,
} from './constants';

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

export function handleStockData(stockData, company_info, company_logo, company_news) {
  return {
    type: STOCK_DATA_RECEIVED,
    stockData,
    company_logo,
    company_news,
    company_info,
  };
}

export function filterStockSymbols(searchText) {
  return {
    type: FILTER_SYMBOLS,
    searchText,
  };
}

export function fetchStockData(ticker, interval) {
  return {
    type: FETCH_STOCK_DATA,
    ticker,
    interval,
  };
}
