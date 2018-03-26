import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');

const makeSelectLocation = () => createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectPathName = () => createSelector(selectRoute, routeState => routeState.getIn(['location', 'pathname']));

export { makeSelectLocation, makeSelectPathName };
