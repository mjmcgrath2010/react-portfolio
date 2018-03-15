import { createSelector } from 'reselect';

/**
 * Direct selector to the home state domain
 */
const selectHomeDomain = state => state.get('home');

/**
 * Other specific selectors
 */

const getMarketData = () => createSelector(selectHomeDomain, homeState => homeState.get('marketData'));
const getTickerSymbols = () => createSelector(selectHomeDomain, homeState => homeState.get('tickerSymbols'));

/**
 * Default selector used by Home
 */

const makeSelectHome = () => createSelector(selectHomeDomain, substate => substate.toJS());

export default makeSelectHome;
export { selectHomeDomain, getMarketData, getTickerSymbols };
