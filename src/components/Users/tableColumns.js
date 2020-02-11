import AppConstants from '../../constants/AppConstants';

const tableColumns  = [
    {
      name: AppConstants.lastName,
      selector: 'lastName',
      sortable: true,
    },
    {
      name: AppConstants.firstName,
      selector: 'firstName',
      sortable: true,
    },
    {
      name: AppConstants.deliveryArea,
      selector: 'deliveryArea',
      sortable: true,
    },
    {
      name: AppConstants.deliveryDays,
      selector: 'deliveryDays',
      sortable: true,
    },
    {
      name: AppConstants.phone,
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
