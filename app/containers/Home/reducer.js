/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  TICKERS_RECEIVED,
  MARKERT_DATA_RECEIVED,
  STOCK_DATA_RECEIVED,
  FILTER_SYMBOLS,
} from './constants';

const initialState = fromJS({
  tickerSymbols: null,
  marketData: null,
  stockData: null,
  searchText: null,
  stockSearchResults: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TICKERS_RECEIVED:
      return state.set('tickerSymbols', action.tickerSymbols);
    case MARKERT_DATA_RECEIVED:
      return state.set('marketData', action.marketData);
    case STOCK_DATA_RECEIVED:
      return state.set('stockData', action.stockData);
    case FILTER_SYMBOLS:
      const results = [];
      const combinedResults = {};
      const tickerSearch = state
        .get('tickerSymbols')
        .filter(stock => stock.symbol.toLowerCase().search(action.searchText.toLowerCase()) > -1);
      const companySearch = state
        .get('tickerSymbols')
        .filter(stock => stock.name.toLowerCase().search(action.searchText.toLowerCase()) > -1);
      Object.assign(combinedResults, tickerSearch);
      Object.assign(combinedResults, companySearch);
      results.push(combinedResults);
      return state.set('stockSearchResults', results);
    default:
      return state;
  }
}

export default homeReducer;
