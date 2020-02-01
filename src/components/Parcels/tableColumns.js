import AppConstants from "../../constants/AppConstants";

const tableColumns  = [
   {
    name: AppConstants.identifierUIName,
    selector: 'no',
    sortable: true,
    },
    {
    name: AppConstants.statusUIName,
    selector: 'status',
    sortable: true,
    },
    {
      name: AppConstants.nameUIName,
      selector: 'customerName',
      sortable: true,
    },
    {
      name: AppConstants.addressUIName,
      selector: 'address',
      sortable: true,
    },
    {
      name: AppConstants.cityUIName,
      selector: 'city',
      sortable: true,
    },
    {
      name: AppConstants.phoneUIName,
      selector: 'phone',
      sortable: true,
    },
    {
      name: AppConstants.userUIName,
      selector: 'signature',
      sortable: false,
    },
  ]

  export default tableColumns;