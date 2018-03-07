/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, TICKERS_RECIEVED } from './constants';

const initialState = fromJS({
  tickerSymbols: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TICKERS_RECIEVED:
      return state.set('tickerSymbols', action.tickerSymbols);
    default:
      return state;
  }
}

export default homeReducer;
