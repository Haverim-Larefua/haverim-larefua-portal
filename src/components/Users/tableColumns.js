import AppConstants from '../../constants/AppConstants';
import memoize from 'memoize-one';

const tableColumns  = memoize(clickHandler => [
    {
      name: AppConstants.lastNameUIName,
      selector: 'lastName',
      sortable: true,
    },
    {
      name: AppConstants.firstNameUIName,
      selector: 'firstName',
      sortable: true,
    },
    {
      name: AppConstants.deliveryAreaUIName,
      selector: 'deliveryArea',
      sortable: true,
    },
    {
      name: AppConstants.delivaryDaysUIName,
      selector: 'deliveryDays',
      sortable: true,
    },
    {
      name: AppConstants.phoneUIName,
      selector: 'phone',
      sortable: true,
    },
    {
      name: AppConstants.commentsUIName,
      selector: 'notes',
      sortable: true,

    },

  ]);

  export default tableColumns;