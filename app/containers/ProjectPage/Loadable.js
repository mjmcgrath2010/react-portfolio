/**
 *
 * Asynchronously loads the component for ProjectPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
