/**
 *
 * Asynchronously loads the component for Charts
 *
 */

import Loadable from 'react-loadable';
import LoadingSpinner from '../../components/LoadingSpinner/index';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingSpinner,
});
