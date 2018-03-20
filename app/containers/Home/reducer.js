/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
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
    case TICKERS_RECEIVED: {
      const processedData = [];
      _.forEach(action.tickerSymbols, stock => processedData.push({ title: stock.symbol, description: stock.name }));
      return state.set('tickerSymbols', processedData);
    }
    case MARKERT_DATA_RECEIVED:
      return state.set('marketData', action.marketData);
    case STOCK_DATA_RECEIVED:
      return state.set('stockData', action.stockData);
    case FILTER_SYMBOLS: {
      const tickerSearch = state
        .get('tickerSymbols')
        .filter(stock => stock.title.toLowerCase().search(action.searchText.toLowerCase()) > -1);
      const companySearch = state
        .get('tickerSymbols')
        .filter(stock => stock.description.toLowerCase().search(action.searchText.toLowerCase()) > -1);
      let list = _.concat(companySearch, tickerSearch);
      list = _.uniqBy(list, 'title');
      return state.set('stockSearchResults', list);
    }
    default:
      return state;
  }
}

export default homeReducer;
