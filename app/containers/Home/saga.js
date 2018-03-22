import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_TICKERS, FETCH_MARKET_DATA, FETCH_STOCK_DATA } from './constants';
import { handleTickers, updateMarketData, handleStockData } from './actions';
import request from '../../utils/request';

export function* getTickerSymbols() {
  const tickers = yield call(request, '/symbols');
  yield put(handleTickers(tickers));
}

export function* getMarketData() {
  const marketData = yield call(request, '/current-market-stats');
  yield put(updateMarketData(marketData));
}

export function* getStockData(action) {
  const stockData = yield call(request, `/stock-data?symbol=${action.ticker}&interval=${action.interval}`);
  yield put(
    handleStockData(stockData.stock_data, stockData.company_info, stockData.company_logo, stockData.company_news)
  );
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_TICKERS, getTickerSymbols);
  yield takeLatest(FETCH_MARKET_DATA, getMarketData);
  yield takeLatest(FETCH_STOCK_DATA, getStockData);
}
