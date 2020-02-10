import AppConstants from "../../constants/AppConstants";
import React from 'react';
import AssignButton from '../shared/AssignButton/AssignButton';
import memoize from 'memoize-one';

const tableColumns  = memoize(clickHandler =>[
  {
    name: AppConstants.catalogUIName,
    selector: 'id',
  },
  {
   name: AppConstants.identifierUIName,
   selector: 'identity',
   sortable: true,
   },
   {
   name: AppConstants.statusUIName,
   selector: 'parcelTrackingStatus',
   sortable: true,
   cell: row => <span>{row.parcelTrackingStatus}</span>,
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
     cell: row => (row.userName ? row.userName : <AssignButton name='assign' id={row.id} action={clickHandler} />),
     ignoreRowClick: row  =>(row.userName ? false : true),
     button: row  => (row.userName ? false : true),
     allowOverflow: row  => (row.userName ? false : true),
   },
 ]);


  export default tableColumns;