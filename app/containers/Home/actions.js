/*
 *
 * Home actions
 *
 */

import { DEFAULT_ACTION, TICKERS_RECIEVED } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function handleTickers(tickerSymbols) {
  return {
    type: TICKERS_RECIEVED,
    tickerSymbols,
  };
}
