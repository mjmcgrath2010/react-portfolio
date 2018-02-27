/**
 *
 * Asynchronously loads the component for MapSearch
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
