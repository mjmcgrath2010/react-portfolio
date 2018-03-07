import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_TICKERS } from './constants';
import { handleTickers } from './actions';
import request from '../../utils/request';

export function* getTickerSymbols() {
  const tickers = yield call(request, '/symbols');
  yield put(handleTickers(tickers));
}

// Individual exports for testing
export default function* defaultSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FETCH_TICKERS, getTickerSymbols);
}
