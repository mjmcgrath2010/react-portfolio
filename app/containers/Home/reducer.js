/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TICKERS_RECIEVED, MARKERT_DATA_RECIEVED } from './constants';

const initialState = fromJS({
  tickerSymbols: null,
  marketData: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TICKERS_RECIEVED:
      return state.set('tickerSymbols', action.tickerSymbols);
    case MARKERT_DATA_RECIEVED:
      return state.set('marketData', action.marketData);
    default:
      return state;
  }
}

export default homeReducer;
