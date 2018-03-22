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
const getTickerSearchResults = () => createSelector(selectHomeDomain, homeState => homeState.get('stockSearchResults'));
const getStockData = () => createSelector(selectHomeDomain, homeState => homeState.getIn(['stockData', 'stock_data']));
const getCompanyLogo = () =>
  createSelector(selectHomeDomain, homeState => homeState.getIn(['stockData', 'company_logo']));
const getCompanyInfo = () =>
  createSelector(selectHomeDomain, homeState => homeState.getIn(['stockData', 'company_info']));
const getCompanyNews = () =>
  createSelector(selectHomeDomain, homeState => homeState.getIn(['stockData', 'company_news']));

/**
 * Default selector used by Home
 */

const makeSelectHome = () => createSelector(selectHomeDomain, substate => substate.toJS());

export default makeSelectHome;
export {
  selectHomeDomain,
  getMarketData,
  getTickerSymbols,
  getTickerSearchResults,
  getStockData,
  getCompanyLogo,
  getCompanyInfo,
  getCompanyNews,
};
