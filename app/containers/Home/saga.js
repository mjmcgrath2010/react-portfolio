import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_TICKERS, FETCH_MARKET_DATA } from './constants';
import { handleTickers, updateMarketData } from './actions';
import request from '../../utils/request';

export function* getTickerSymbols() {
  const tickers = yield call(request, '/symbols');
  yield put(handleTickers(tickers));
}

export function* getMarketData() {
  const marketData = yield call(request, '/current-market-stats');
  yield put(updateMarketData(marketData));
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_TICKERS, getTickerSymbols);
  yield takeLatest(FETCH_MARKET_DATA, getMarketData);
}
