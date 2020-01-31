import AppConstants from '../../constants/AppConstants';

const tableColumns  = [
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

  ]

  export default tableColumns;