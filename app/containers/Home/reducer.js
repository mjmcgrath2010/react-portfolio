/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TICKERS_RECEIVED, MARKERT_DATA_RECEIVED, STOCK_DATA_RECEIVED } from './constants';

const initialState = fromJS({
  tickerSymbols: null,
  marketData: null,
  stockData: null,
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
    default:
      return state;
  }
}

export default homeReducer;
