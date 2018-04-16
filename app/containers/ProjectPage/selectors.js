import { createSelector } from 'reselect';

/**
 * Direct selector to the projectPage state domain
 */
const selectProjectPageDomain = state => state.get('projectPage');

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectPage
 */

const makeSelectProjectPage = () => createSelector(selectProjectPageDomain, substate => substate.toJS());

export default makeSelectProjectPage;
export { selectProjectPageDomain };
