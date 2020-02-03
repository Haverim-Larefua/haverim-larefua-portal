import AppConstants from "../../constants/AppConstants";
import React from 'react';

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
    cell: row => <span>{row.status}</span>,
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
      selector: 'userName',
      sortable: false,
    },
  ]

  export default tableColumns;